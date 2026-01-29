import { Home, Calendar, StickyNote, User, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Plan", path: "/plan" },
    { icon: BarChart, label: "Analytics", path: "/analytics" },
    { icon: StickyNote, label: "Notes", path: "/daily-notes" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/90 px-4 py-4 backdrop-blur-2xl safe-area-bottom">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300 relative group py-1 px-3",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-all duration-500",
                isActive ? "scale-110 stroke-[2.5px]" : "stroke-[1.5px]"
              )}
            />
            <span className={cn(
              "text-[9px] font-black uppercase tracking-tighter transition-all",
              isActive ? "opacity-100" : "opacity-60"
            )}>
              {item.label}
            </span>
            {isActive && (
              <div className="absolute -top-1 h-1 w-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(91,108,255,1)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
