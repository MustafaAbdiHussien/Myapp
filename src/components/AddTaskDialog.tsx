import { useState, useEffect } from "react";
import { Plus, Calendar as CalendarIcon, Target, Info } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTask } from "@/context/TaskContext";

interface AddTaskDialogProps {
    children?: React.ReactNode;
    defaultDate?: Date;
    defaultCategory?: "All" | "Today" | "Upcoming" | "Completed";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showCategory?: boolean;
    showDate?: boolean;
}

export function AddTaskDialog({
    children,
    defaultDate,
    defaultCategory,
    showCategory = true,
    showDate = true
}: AddTaskDialogProps) {
    const { addTask, tasks } = useTask();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<"All" | "Today" | "Upcoming" | "Completed">(defaultCategory || "Today");
    const [date, setDate] = useState<Date | undefined>(defaultDate || new Date());

    useEffect(() => {
        if (defaultCategory) setCategory(defaultCategory);
        if (defaultDate) setDate(defaultDate);
    }, [defaultCategory, defaultDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const taskDate = date || new Date();

        // Duplicate check
        const isDuplicate = tasks.some(
            (t) => t.title.toLowerCase() === title.toLowerCase() && isSameDay(new Date(t.date), taskDate)
        );

        if (isDuplicate) {
            toast.error("Security alert: Duplicate task objective detected.");
            return;
        }

        addTask({
            title,
            description,
            category,
            date: taskDate,
        });
        setOpen(false);
        setTitle("");
        setDescription("");
        setCategory(defaultCategory || "Today");
        setDate(defaultDate || new Date());
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button size="icon" className="h-12 w-12 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                        <Plus className="h-6 w-6" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px] bg-card border-border rounded-[2.5rem] shadow-2xl p-8">
                <DialogHeader className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Command Center</span>
                    </div>
                    <DialogTitle className="text-2xl font-black">New Objective</DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium">
                        Specify the parameters of your next task.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            required
                            className="h-14 bg-background border-border rounded-2xl focus:ring-primary/20 text-sm font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {showCategory && (
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Sector</Label>
                                <Select
                                    value={category}
                                    onValueChange={(value: any) => setCategory(value)}
                                >
                                    <SelectTrigger className="h-14 bg-background border-border rounded-2xl">
                                        <SelectValue placeholder="Focus" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border">
                                        <SelectItem value="Today">Immediate</SelectItem>
                                        <SelectItem value="Upcoming">Planned</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {showDate && (
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Deadline</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "h-14 w-full justify-start text-left font-medium rounded-2xl bg-background border-border",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                            {date ? format(date, "MMM d") : <span>Target</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 border-border bg-card">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            className="rounded-2xl"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 ml-1">
                            <Info className="h-3 w-3 text-muted-foreground" />
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operational Details</Label>
                        </div>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Strategic notes..."
                            className="min-h-[100px] bg-background border-border rounded-2xl focus:ring-primary/20 text-sm font-medium pt-4"
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" className="h-14 w-full bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-2xl active:scale-95 transition-all">
                            Commit Objective
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
