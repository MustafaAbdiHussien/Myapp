import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, StickyNote, Save, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTask } from "@/context/TaskContext";
import { toast } from "sonner";

const DailyNotesPage = () => {
    const { notes, saveNote } = useTask();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const dateKey = format(selectedDate, "yyyy-MM-dd");

    useEffect(() => {
        const existingNote = notes.find((n) => n.date === dateKey);
        setContent(existingNote?.content || "");
    }, [dateKey, notes]);

    const handleSave = () => {
        setIsSaving(true);
        saveNote(dateKey, content);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Reflection synchronized");
        }, 800);
    };

    const nextDay = () => setSelectedDate(addDays(selectedDate, 1));
    const prevDay = () => setSelectedDate(subDays(selectedDate, 1));

    // Show all saved notes in the history boxes
    const allSavedNotes = notes
        .filter(n => n.content.trim() !== "")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="animate-fade-in px-6 pt-12 pb-32 bg-background min-h-screen text-foreground">
            {/* Premium Header */}
            <header className="mb-10 px-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <Zap className="h-3.5 w-3.5 text-primary fill-current" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Internal Journal</p>
                </div>
                <h1 className="text-3xl font-black tracking-tight">Reflections</h1>
            </header>

            {/* Premium Date Control */}
            <div className="mb-8 flex items-center justify-between bg-card p-2 rounded-[2rem] border border-border shadow-2xl shadow-black/10">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-muted" onClick={prevDay}>
                    <ChevronLeft className="h-6 w-6 text-muted-foreground" />
                </Button>
                <div className="text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">
                        {format(selectedDate, "EEEE")}
                    </p>
                    <p className="text-sm font-black tracking-tight underline decoration-primary/30 underline-offset-4">
                        {format(selectedDate, "MMMM d, yyyy")}
                    </p>
                </div>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-muted" onClick={nextDay}>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </Button>
            </div>

            {/* Reflection Main Canvas */}
            <Card className="mb-12 border-0 bg-card shadow-2xl shadow-black/20 rounded-[2.5rem] overflow-hidden group focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-500">
                <CardContent className="p-0">
                    <div className="flex items-center justify-between px-8 pt-8 mb-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-primary" />
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Mind Dump</span>
                        </div>
                        {content.length > 0 && (
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{content.split(' ').length} WORDS</span>
                        )}
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's taking up your mental space today?"
                        className="min-h-[300px] w-full resize-none border-0 bg-transparent px-8 py-6 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/30 focus:outline-none font-medium"
                    />
                    <div className="flex justify-center pb-8 px-8">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                        >
                            {isSaving ? "Syncing..." : (
                                <span className="flex items-center gap-3">
                                    <Save className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                    Commit to History
                                </span>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* History Grid - BOXES */}
            {allSavedNotes.length > 0 && (
                <section className="space-y-8 px-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <StickyNote className="h-4 w-4 text-primary" />
                            </div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Reflections</h2>
                        </div>
                        <span className="text-[9px] font-black text-muted-foreground/50">{allSavedNotes.length} ENTRIES</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {allSavedNotes.map((note) => (
                            <Card
                                key={note.date}
                                className={`group border-0 transition-all cursor-pointer relative overflow-hidden rounded-[2rem] ${note.date === dateKey
                                        ? "ring-2 ring-primary/40 bg-card shadow-2xl shadow-primary/5"
                                        : "bg-card/40 hover:bg-card hover:shadow-xl shadow-sm border border-white/5"
                                    }`}
                                onClick={() => {
                                    setSelectedDate(new Date(note.date));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="px-3 py-1 rounded-lg bg-background border border-white/5 text-[9px] font-black text-primary uppercase tracking-wider">
                                            {format(new Date(note.date), "MMM d, yyyy")}
                                        </div>
                                        {note.date === dateKey && (
                                            <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors">
                                        {note.content}
                                    </p>

                                    {/* Hover Indicator */}
                                    <div className="mt-4 flex items-center text-[8px] font-black text-primary opacity-0 group-hover:opacity-100 transition-all">
                                        RESTORE REFLECTION <ChevronRight className="ml-1 h-3 w-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {allSavedNotes.length === 0 && !isSaving && (
                <div className="mt-20 flex flex-col items-center justify-center text-center opacity-30">
                    <div className="mb-6 rounded-[2.5rem] bg-muted p-10">
                        <StickyNote className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">A clean slate</h3>
                    <p className="max-w-[200px] mt-2 text-sm text-muted-foreground leading-relaxed">
                        Every day is a new beginning. Save your first reflection to start your journey.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DailyNotesPage;
