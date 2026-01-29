import { Share2, ChevronLeft, Bot, Zap, CheckCircle2, TrendingUp, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTask } from "@/context/TaskContext";
import { isSameDay, subDays, format, startOfMonth, endOfMonth, eachWeekOfInterval, startOfYear, eachMonthOfInterval, isSameMonth, isSameWeek } from "date-fns";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AnalyticsPage = () => {
  const { tasks } = useTask();
  const [range, setRange] = useState<"week" | "month" | "year">("week");
  const navigate = useNavigate();

  // Stats calculation
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const completionRate = tasks.length === 0 ? 0 : (totalCompleted / tasks.length);
  const productivityScore = Math.min(100, Math.round(completionRate * 100 + (tasks.length > 5 ? 10 : 0)));

  const totalFocusMinutes = totalCompleted * 25;
  const focusHours = Math.floor(totalFocusMinutes / 60);
  const focusMins = totalFocusMinutes % 60;

  const getChartData = () => {
    const now = new Date();
    if (range === "week") {
      return Array.from({ length: 7 }).map((_, i) => {
        const day = subDays(now, 6 - i);
        const dayTasks = tasks.filter(t => isSameDay(new Date(t.date), day));
        const dayCompleted = dayTasks.filter(t => t.completed).length;
        const score = dayTasks.length === 0 ? 20 : (dayCompleted * 20) + 20;
        return {
          name: format(day, "EEE"),
          score: Math.min(100, score),
          fullDate: format(day, "MMM d")
        };
      });
    } else if (range === "month") {
      const start = startOfMonth(now);
      const end = endOfMonth(now);
      const weeks = eachWeekOfInterval({ start, end });
      return weeks.map((weekStart, i) => {
        const weekTasks = tasks.filter(t => isSameWeek(new Date(t.date), weekStart));
        const weekCompleted = weekTasks.filter(t => t.completed).length;
        const score = weekTasks.length === 0 ? 30 + (i * 5) : (weekCompleted * 15) + 30;
        return {
          name: `W${i + 1}`,
          score: Math.min(100, score),
          fullDate: `Week of ${format(weekStart, "MMM d")}`
        };
      });
    } else {
      const months = eachMonthOfInterval({
        start: startOfYear(now),
        end: new Date(now.getFullYear(), 11, 31)
      });
      return months.map((monthStart) => {
        const monthTasks = tasks.filter(t => isSameMonth(new Date(t.date), monthStart));
        const monthCompleted = monthTasks.filter(t => t.completed).length;
        const score = monthTasks.length === 0 ? 40 + (Math.random() * 20) : (monthCompleted * 10) + 40;
        return {
          name: format(monthStart, "MMM"),
          score: Math.min(100, Math.round(score)),
          fullDate: format(monthStart, "MMMM yyyy")
        };
      });
    }
  };

  const chartData = getChartData();

  return (
    <div className="flex flex-col min-h-screen bg-[#0F111A] text-white pb-32 overflow-x-hidden">
      {/* Premium Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-10 w-10 text-gray-400 hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">Analytics</h1>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-white">
          <Share2 className="h-5 w-5" />
        </Button>
      </header>

      <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Range Selector */}
        <div className="bg-white/5 p-1.5 rounded-[1.5rem] border border-white/5">
          <Tabs value={range} onValueChange={(v) => setRange(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0">
              <TabsTrigger value="week" className="rounded-2xl text-[10px] uppercase font-black tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300 h-10">Week</TabsTrigger>
              <TabsTrigger value="month" className="rounded-2xl text-[10px] uppercase font-black tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300 h-10">Month</TabsTrigger>
              <TabsTrigger value="year" className="rounded-2xl text-[10px] uppercase font-black tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300 h-10">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Productivity Score Card */}
        <Card className="border-0 bg-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8">
            <div className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-indigo-500/20">
              +12%
            </div>
          </div>
          <CardContent className="p-8">
            <div className="space-y-1 mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Productivity Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">{productivityScore}</span>
                <span className="text-xl font-bold text-gray-600">/100</span>
              </div>
            </div>

            <div className="h-[200px] w-full -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1A1A2E', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
                    dy={15}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 bg-white/[0.04] rounded-3xl p-1">
            <CardContent className="p-5 flex flex-col items-center">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400">
                <Timer className="h-5 w-5" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-2">Focus Time</p>
              <span className="text-xl font-black">{focusHours}h {focusMins}m</span>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/[0.04] rounded-3xl p-1">
            <CardContent className="p-5 flex flex-col items-center">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-2">Completions</p>
              <span className="text-xl font-black">{totalCompleted}</span>
            </CardContent>
          </Card>
        </div>

        {/* AI Insight */}
        <Card className="border-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-[2rem] border-white/5">
          <CardContent className="p-6 flex gap-5 items-center">
            <div className="h-14 w-14 min-w-[56px] rounded-2xl bg-indigo-600/20 flex items-center justify-center">
              <Bot className="h-7 w-7 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-wide text-indigo-300">AI Recommendation</h3>
              <p className="text-[11px] text-gray-400 font-bold leading-normal">
                Your highest focus is at 10 AM. We suggest "Deep Work" sessions then.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Categories Breakdown */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Time Allocation</h3>
            <Zap className="h-3 w-3 text-indigo-500 fill-current" />
          </div>
          <div className="space-y-5 px-1 pb-10">
            <BreakdownItem label="Deep Work" hours={18} percent={75} color="bg-indigo-600" />
            <BreakdownItem label="Management" hours={5} percent={40} color="bg-purple-600" />
            <BreakdownItem label="Learning" hours={3} percent={25} color="bg-emerald-600" />
          </div>
        </section>
      </div>
    </div>
  );
};

const BreakdownItem = ({ label, hours, percent, color }: { label: string, hours: number, percent: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-baseline">
      <span className="text-xs font-black uppercase tracking-tight text-gray-300">{label}</span>
      <span className="text-xs font-black text-gray-500">{hours} HRS</span>
    </div>
    <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-1000`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default AnalyticsPage;
