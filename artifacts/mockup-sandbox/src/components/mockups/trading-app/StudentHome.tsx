import {
  TrendingUp, Bell, BookOpen, PlayCircle, Calendar, Award,
  ChevronRight, Clock, CheckCircle, Lock, BarChart2,
  Zap, Users, FileText, HelpCircle, ClipboardList
} from "lucide-react";

const lectures = [
  { title: "Options Chain Analysis", duration: "1h 24m", progress: 100, thumb: "L3", locked: false },
  { title: "Support & Resistance", duration: "58m", progress: 62, thumb: "L4", locked: false },
  { title: "Volume Profile Trading", duration: "1h 10m", progress: 0, thumb: "L5", locked: false },
  { title: "Advanced Derivatives", duration: "1h 35m", progress: 0, thumb: "L6", locked: true },
];

const quickStats = [
  { label: "Attendance", value: "91%", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Quiz Avg", value: "88%", icon: BarChart2, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Rank", value: "#4", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const upcoming = [
  { title: "Live: Options Chain Deep Dive", time: "Today, 6:00 PM", live: true },
  { title: "Quiz 4 — Risk Management", time: "Due: Jun 26" , live: false },
  { title: "Assignment 2 — Chart Analysis", time: "Due: Jun 28", live: false },
];

export function StudentHome() {
  return (
    <div className="w-[390px] h-[844px] bg-slate-950 font-['Inter'] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-slate-400 text-[11px] font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 border border-slate-500 rounded-[2px] relative"><div className="absolute inset-0.5 left-0.5 bg-slate-400 rounded-[1px] w-2/3" /></div>
          <div className="w-3.5 h-3 text-slate-400"><svg viewBox="0 0 14 12" fill="currentColor"><path d="M7 2C9.8 2 12.3 3.1 14 5L12.6 6.4C11.3 5.2 9.2 4.3 7 4.3S2.7 5.2 1.4 6.4L0 5C1.7 3.1 4.2 2 7 2zm0 4c1.7 0 3.2.7 4.3 1.7L9.9 9.1A3 3 0 007 8a3 3 0 00-2.9 1.1L2.7 7.7C3.8 6.7 5.3 6 7 6zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/></svg></div>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-slate-400 text-xs">Good evening,</p>
          <p className="text-white font-bold text-lg leading-tight">Rahul Sharma 👋</p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">RS</div>
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Batch chip */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/20 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span className="text-violet-300 text-xs font-medium">Advanced Trading Batch A</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-20">
        {/* Live class banner */}
        <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <PlayCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" /> Live Today
                </span>
              </div>
              <p className="text-white font-semibold text-sm">Options Chain Deep Dive</p>
              <p className="text-slate-400 text-xs mt-0.5">6:00 PM · Dr. Anand Kumar</p>
            </div>
            <button className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0">
              Join
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((s) => (
            <div key={s.label} className={`rounded-2xl p-3 ${s.bg} border border-white/5 text-center`}>
              <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1.5`} />
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Continue watching */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">Continue Learning</p>
            <button className="text-amber-400 text-xs flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-2.5">
            {lectures.map((l, i) => (
              <div key={i} className={`flex items-center gap-3 bg-slate-900 rounded-2xl p-3 border ${l.locked ? "border-slate-800 opacity-60" : "border-slate-800"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  l.progress === 100 ? "bg-emerald-500/20 text-emerald-400" :
                  l.progress > 0 ? "bg-amber-500/20 text-amber-400" :
                  "bg-slate-800 text-slate-400"
                }`}>
                  {l.locked ? <Lock className="w-4 h-4" /> : l.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium truncate">{l.title}</p>
                  <p className="text-slate-600 text-xs mt-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {l.duration}
                  </p>
                  {l.progress > 0 && l.progress < 100 && (
                    <div className="mt-1.5 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${l.progress}%` }} />
                    </div>
                  )}
                </div>
                {l.progress === 100 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : l.locked ? null : (
                  <PlayCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <p className="text-white font-semibold text-sm mb-3">Upcoming</p>
          <div className="space-y-2">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${u.live ? "bg-red-400 animate-pulse" : "bg-slate-600"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm truncate">{u.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{u.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-[390px] bg-slate-900/95 backdrop-blur border-t border-slate-800 px-2 pb-4 pt-2">
        <div className="flex items-center justify-around">
          {[
            { icon: TrendingUp, label: "Home", active: true },
            { icon: BookOpen, label: "Courses" },
            { icon: Calendar, label: "Schedule" },
            { icon: BarChart2, label: "Progress" },
            { icon: Award, label: "Profile" },
          ].map((item) => (
            <button key={item.label} className={`flex flex-col items-center gap-1 px-3 py-1 ${item.active ? "text-amber-400" : "text-slate-600"}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
