import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, TrendingUp, LogOut, Trash2, Pencil, Plus, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTask, Task } from "@/context/TaskContext";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const HomePage = () => {
  const navigate = useNavigate();
  const { tasks, toggleTask, deleteTask, editTask } = useTask();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Stats calculation
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  // Edit State
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      editTask(editingTask.id, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTask(null);
    }
  };

  return (
    <div className="animate-fade-in px-6 pt-12 pb-32 bg-background min-h-screen">
      {/* Premium Header */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-3 w-3 text-primary fill-current" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{today}</p>
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Hello! 👋
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Ready to crush your goals?
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-2xl bg-card border border-border hover:bg-muted group transition-all"
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
        </Button>
      </header>

      {/* Stats Dashboard */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        {[
          { label: "Done", val: completedTasks, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pending", val: pendingTasks, icon: Clock, color: "text-orange-400", bg: "bg-orange-400/10" },
          { label: "Progress", val: `${progress}%`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" }
        ].map((stat, i) => (
          <Card key={i} className="border-0 bg-card shadow-xl shadow-black/10 rounded-[1.5rem] overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-xl font-black text-foreground">{stat.val}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Today's Focus</h2>
          {tasks.filter(t => t.category === "Today").length > 0 && (
            <span className="text-[10px] font-black text-primary uppercase">{tasks.filter(t => t.category === "Today").length} ACTIVE</span>
          )}
        </div>

        {tasks.filter(t => t.category === "Today").length === 0 ? (
          <Card className="border border-dashed border-border bg-card/30 rounded-[2rem]">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted/50">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-bold text-foreground">All clear!</h3>
              <p className="max-w-[200px] mt-2 text-sm text-muted-foreground leading-relaxed">
                No tasks for today. Take a breather or plan ahead.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 px-1">
            {tasks.filter(t => t.category === "Today").map((task) => (
              <Card key={task.id} className="border-0 bg-card hover:bg-card/80 transition-all cursor-pointer rounded-[1.5rem] shadow-lg shadow-black/5 group">
                <CardContent className="flex items-center gap-4 p-5">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="h-6 w-6 rounded-lg border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
                    />
                  </div>
                  <div className="flex-1 min-w-0" onClick={() => startEdit(task)}>
                    <h3 className={`text-sm font-bold truncate ${task.completed ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                        Today
                      </span>
                      {task.description && (
                        <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted" onClick={() => startEdit(task)}>
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Edit Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Task</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update your task details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="h-12 bg-background border-border rounded-xl focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="min-h-[100px] bg-background border-border rounded-xl focus:ring-primary/20"
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-bold">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-6 z-40">
        <AddTaskDialog showCategory={false} showDate={false} defaultCategory="Today">
          <Button size="icon" className="h-16 w-16 rounded-[2rem] shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-105 active:scale-95 group">
            <Plus className="h-8 w-8 transition-transform group-hover:rotate-90" />
          </Button>
        </AddTaskDialog>
      </div>
    </div>
  );
};

export default HomePage;
