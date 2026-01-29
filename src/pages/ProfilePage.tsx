import {
  User as UserIcon,
  Bell,
  Moon,
  Shield,
  Settings,
  Target,
  Zap,
  CheckCircle2,
  Crown,
  ChevronRight,
  LogOut,
  Palette,
  Sun,
  Layout
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTask } from "@/context/TaskContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const { tasks } = useTask();
  const navigate = useNavigate();
  const [showAppearance, setShowAppearance] = useState(false);

  const completedTasks = tasks.filter((t) => t.completed).length;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Safe logout complete");
    navigate("/login");
  };

  const currentTheme = localStorage.getItem("selected-theme") || "";

  const setTheme = (theme: string) => {
    localStorage.setItem("selected-theme", theme);
    document.body.className = theme;
    setShowAppearance(false);
    toast.success(`${theme.replace("theme-", "").replace("-", " ") || "Default"} theme applied`);
  };

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const themes = [
    { id: "", label: "Default Dark", icon: Moon, color: "bg-[#0B1020]" },
    { id: "theme-light", label: "Pure Light", icon: Sun, color: "bg-[#F8FAFC]" },
    { id: "theme-black", label: "Absolute Black", icon: Layout, color: "bg-black" },
    { id: "theme-blue-light", label: "Blue Light", icon: Palette, color: "bg-[#F0F4FF]" },
  ];

  const menuItems = [
    { icon: UserIcon, label: "Identity", desc: "Manage your credentials", action: () => toast.info("Profile settings encrypted.") },
    { icon: Bell, label: "Signals", desc: "Configure notifications", action: () => toast.info("Signal logic active.") },
    { icon: Shield, label: "Vault", desc: "Privacy & security keys", action: () => toast.info("Vault locked.") },
    { icon: Palette, label: "Appearance", desc: "Custom themes", action: () => setShowAppearance(true) },
  ];

  return (
    <div className="animate-fade-in bg-background min-h-screen text-foreground px-6 pt-12 pb-32 transition-colors duration-300">
      <header className="flex items-center justify-between mb-10 px-1">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Intelligence</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Personal system stats</p>
        </div>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-card border border-border group">
          <Settings className="h-5 w-5 text-muted-foreground group-hover:rotate-90 transition-transform" />
        </Button>
      </header>

      {/* Hero Profile Card */}
      <Card className="border-0 bg-card shadow-2xl shadow-black/20 rounded-[2.5rem] mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6">
          <Zap className="h-5 w-5 text-primary fill-current" />
        </div>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full border-4 border-primary/20 p-1.5">
                <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary border-4 border-card flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-black tracking-tight underline decoration-primary/30 underline-offset-4 decoration-4">
              {isAuthenticated && user ? user.name : "Guest Terminal"}
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-primary/20 tracking-wider">
                <Crown className="h-3 w-3 inline mr-1.5 -mt-0.5" />
                Pro Active
              </span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">ID: 8829-X</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pulse Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <Card className="border-0 bg-card/50 backdrop-blur-md rounded-3xl p-1 shadow-lg shadow-black/5">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Target className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Efficiency</p>
            <p className="text-2xl font-black">{completedTasks}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-card/50 backdrop-blur-md rounded-3xl p-1 shadow-lg shadow-black/5">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Rank</p>
            <p className="text-2xl font-black">Elite</p>
          </CardContent>
        </Card>
      </div>

      {/* Intelligence Settings */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">System Controls</h3>
        <Card className="border-0 bg-card shadow-xl shadow-black/10 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-0">
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-6 transition-all hover:bg-muted active:scale-[0.98] ${idx !== menuItems.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-foreground">{item.label}</span>
                    <span className="text-[10px] font-medium text-muted-foreground">{item.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.label === "Appearance" && (
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary mr-2">
                      {themes.find(t => t.id === currentTheme)?.label || "Default"}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {isAuthenticated && (
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full h-16 rounded-[2rem] border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 mt-4"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Terminate Session
          </Button>
        )}
      </div>

      {/* Appearance Dialog */}
      <Dialog open={showAppearance} onOpenChange={setShowAppearance}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border rounded-[2.5rem] p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Skin Selector</span>
            </div>
            <DialogTitle className="text-2xl font-black">App Appearance</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              Synchronize the visual interface with your current workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${currentTheme === theme.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-background hover:border-primary/50"
                  }`}
              >
                <div className={`h-10 w-10 rounded-xl ${theme.color} border border-white/10 flex items-center justify-center`}>
                  <theme.icon className={`h-5 w-5 ${theme.id === "theme-light" || theme.id === "theme-blue-light" ? "text-indigo-600" : "text-white"}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black tracking-tight">{theme.label}</p>
                </div>
                {currentTheme === theme.id && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-12 text-center opacity-20">
        <p className="text-[8px] font-black uppercase tracking-[0.5em]">System Version 4.0.2</p>
      </div>
    </div>
  );
};

export default ProfilePage;
