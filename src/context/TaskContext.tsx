import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: "All" | "Today" | "Upcoming" | "Completed";
    completed: boolean;
    date: Date;
}

export interface DailyNote {
    date: string; // YYYY-MM-DD
    content: string;
}

interface TaskContextType {
    tasks: Task[];
    notes: DailyNote[];
    addTask: (task: Omit<Task, "id" | "completed">) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    editTask: (id: string, updates: Partial<Task>) => void;
    saveNote: (date: string, content: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_URL = import.meta.env.PROD
    ? "/api"
    : "http://localhost:5000/api";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [notes, setNotes] = useState<DailyNote[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem("token");
        return token ? { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } : null;
    }, []);

    // Initial load from localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks).map((t: any) => ({ ...t, date: new Date(t.date) })));
            } catch (e) {
                console.error("Failed to parse local tasks");
            }
        }
        const savedNotes = localStorage.getItem("daily_notes");
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to parse local notes");
            }
        }
        setIsInitialLoad(false);
    }, []);

    // Fetch from Backend and sync
    useEffect(() => {
        const syncWithBackend = async () => {
            const headers = getAuthHeaders();
            if (!headers) {
                return;
            }

            try {
                // Fetch tasks
                const tasksRes = await fetch(`${API_URL}/tasks`, { headers });
                if (tasksRes.ok) {
                    const tasksData = await tasksRes.json();
                    const formattedTasks = tasksData.map((t: any) => ({ ...t, date: new Date(t.date) }));

                    if (formattedTasks.length > 0) {
                        setTasks(formattedTasks);
                    } else if (tasks.length > 0) {
                        console.log("Migrating local tasks to database...");
                        for (const task of tasks) {
                            await fetch(`${API_URL}/tasks`, {
                                method: "POST",
                                headers,
                                body: JSON.stringify(task),
                            });
                        }
                    }
                }

                // Fetch notes
                const notesRes = await fetch(`${API_URL}/notes`, { headers });
                if (notesRes.ok) {
                    const notesData = await notesRes.json();
                    if (notesData.length > 0) {
                        setNotes(notesData);
                    } else if (notes.length > 0) {
                        console.log("Migrating local notes to database...");
                        for (const note of notes) {
                            await fetch(`${API_URL}/notes`, {
                                method: "POST",
                                headers,
                                body: JSON.stringify(note),
                            });
                        }
                    }
                }
            } catch (e) {
                console.error("Backend offline or auth error");
            }
        };

        if (!isInitialLoad) {
            syncWithBackend();
        }
    }, [isInitialLoad, getAuthHeaders]);

    // Handle logout / storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            if (!localStorage.getItem("token")) {
                setTasks([]);
                setNotes([]);
                localStorage.removeItem("tasks");
                localStorage.removeItem("daily_notes");
            }
        };
        window.addEventListener("storage", handleStorageChange);

        // Check if token was removed since last render
        if (!localStorage.getItem("token") && tasks.length > 0 && !isInitialLoad) {
            setTasks([]);
            setNotes([]);
        }

        return () => window.removeEventListener("storage", handleStorageChange);
    }, [tasks.length, isInitialLoad]);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, isInitialLoad]);

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem("daily_notes", JSON.stringify(notes));
        }
    }, [notes, isInitialLoad]);

    const addTask = async (newTask: Omit<Task, "id" | "completed">) => {
        const headers = getAuthHeaders();
        const tempId = crypto.randomUUID();
        const task: Task = {
            ...newTask,
            id: tempId,
            completed: false,
            date: newTask.date || new Date(),
        };

        // Optimistic update
        setTasks((prev) => [task, ...prev]);

        if (headers) {
            try {
                const res = await fetch(`${API_URL}/tasks`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(newTask),
                });
                if (res.ok) {
                    const savedTask = await res.json();
                    setTasks((prev) =>
                        prev.map(t => t.id === tempId ? { ...savedTask, date: new Date(savedTask.date) } : t)
                    );
                    toast.success("Task saved to database");
                } else {
                    throw new Error("Failed to save to database");
                }
            } catch (e) {
                toast.error("Database sync failed, saved locally");
            }
        } else {
            toast.info("Saved locally (Log in to sync)");
        }
    };

    const deleteTask = async (id: string) => {
        const headers = getAuthHeaders();
        setTasks((prev) => prev.filter((task) => task.id !== id));

        if (headers) {
            try {
                const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE", headers });
                if (res.ok) {
                    toast.success("Task deleted");
                } else {
                    throw new Error("Delete failed");
                }
            } catch (e) {
                toast.error("Sync failed, deleted locally");
            }
        }
    };

    const toggleTask = async (id: string) => {
        const headers = getAuthHeaders();
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );

        if (headers) {
            try {
                const res = await fetch(`${API_URL}/tasks/${id}`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({ completed: !task.completed }),
                });
                if (!res.ok) throw new Error("Update failed");
            } catch (e) {
                toast.error("Failed to sync status");
            }
        }
    };

    const editTask = async (id: string, updates: Partial<Task>) => {
        const headers = getAuthHeaders();
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
        );

        if (headers) {
            try {
                const res = await fetch(`${API_URL}/tasks/${id}`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify(updates),
                });
                if (!res.ok) throw new Error("Update failed");
                toast.success("Changes synced");
            } catch (e) {
                toast.error("Changes saved locally only");
            }
        }
    };

    const saveNote = async (date: string, content: string) => {
        const headers = getAuthHeaders();
        setNotes((prev) => {
            const existingNoteIndex = prev.findIndex((n) => n.date === date);
            if (existingNoteIndex >= 0) {
                const updatedNotes = [...prev];
                updatedNotes[existingNoteIndex] = { date, content };
                return updatedNotes;
            }
            return [...prev, { date, content }];
        });

        if (headers) {
            try {
                const res = await fetch(`${API_URL}/notes`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ date, content }),
                });
                if (res.ok) {
                    toast.success("Note synced to database");
                } else {
                    throw new Error("Sync failed");
                }
            } catch (e) {
                toast.info("Note saved locally (Sync pending)");
            }
        } else {
            toast.info("Note saved locally (Log in to sync)");
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, notes, addTask, deleteTask, toggleTask, editTask, saveNote }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
};
