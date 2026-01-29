import { useState } from "react";
import { Plus, ListTodo, Trash2, Pencil, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const PlanPage = () => {
  const { tasks, toggleTask, deleteTask, editTask } = useTask();
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Completed">("All");

  const filteredTasks = tasks.filter((task) => {
    // Exclude Today tasks from Plan section
    if (task.category === "Today") return false;

    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    return task.category === "Upcoming";
  });

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
      <header className="mb-8 p-1 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Strategy</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Design your roadmap</p>
        </div>
        <AddTaskDialog
          defaultDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
          defaultCategory="Upcoming"
        >
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-card border border-border text-primary hover:bg-muted group">
            <Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
          </Button>
        </AddTaskDialog>
      </header>

      {/* Filter Tabs */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 px-1">
        {["All", "Upcoming", "Completed"].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            className={`shrink-0 rounded-full px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
            onClick={() => setFilter(cat as any)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Tasks Grid/List */}
      {filteredTasks.length === 0 ? (
        <Card className="border border-dashed border-border bg-card/30 rounded-[2.5rem] mt-4">
          <CardContent className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-muted/40">
              <Calendar className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-black text-foreground">
              {filter === "Completed" ? "Nothing finished yet" : "Blank Canvas"}
            </h3>
            <p className="mt-2 mb-10 max-w-[240px] text-sm font-medium text-muted-foreground leading-relaxed">
              {filter === "Completed"
                ? "Your future completions will appear here once you crush them."
                : "Your upcoming plans define your future self. Add one now."}
            </p>
            {filter !== "Completed" && (
              <AddTaskDialog
                defaultDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                defaultCategory="Upcoming"
              >
                <Button className="h-14 rounded-2xl px-10 bg-primary font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Create First Plan
                </Button>
              </AddTaskDialog>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 px-1">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="border-0 bg-card hover:bg-card/80 transition-all rounded-[1.5rem] group shadow-lg shadow-black/5 overflow-hidden active:scale-[0.99]">
              <CardContent className="flex flex-col p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1 h-6 w-6 rounded-lg border-2 border-border data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <div className="flex-1 min-w-0" onClick={() => startEdit(task)}>
                    <h3 className={`text-base font-bold leading-tight ${task.completed ? "text-muted-foreground line-through italic" : "text-foreground"}`}>
                      {task.title}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2 flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3" />
                      {new Date(task.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted" onClick={() => startEdit(task)}>
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {task.description && (
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed pl-10 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Refine Plan</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              Every detail matters in your strategy.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="grid gap-6 py-6">
            <div className="space-y-2 px-1">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Objective</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="h-12 bg-background border-border rounded-xl focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2 px-1">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Context</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="min-h-[120px] bg-background border-border rounded-xl focus:ring-primary/20"
              />
            </div>
            <DialogFooter className="pt-2 px-1">
              <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20">Sync Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanPage;
