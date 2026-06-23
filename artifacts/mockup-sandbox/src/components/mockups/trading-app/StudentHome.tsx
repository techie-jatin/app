import {
  TrendingUp, Bell, BookOpen, PlayCircle, Calendar, Award,
  ChevronRight, Clock, CheckCircle, Lock, BarChart2, Zap, FileText, HelpCircle, ClipboardList
} from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#DC2626";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const lectures = [
  { title: "Options Chain Analysis", duration: "1h 24m", progress: 100, thumb: "L3", locked: false },
  { title: "Support & Resistance", duration: "58m", progress: 62, thumb: "L4", locked: false },
  { title: "Volume Profile Trading", duration: "1h 10m", progress: 0, thumb: "L5", locked: false },
  { title: "Advanced Derivatives", duration: "1h 35m", progress: 0, thumb: "L6", locked: true },
];

const quickStats = [
  { label: "Attendance", value: "91%", color: EMERALD, bg: "rgba(16,185,129,0.08)" },
  { label: "Quiz Avg", value: "88%", color: PRIMARY, bg: "rgba(37,99,235,0.08)" },
  { label: "Rank", value: "#4", color: AMBER, bg: "rgba(245,158,11,0.08)" },
];

const upcoming = [
  { title: "Live: Options Chain Deep Dive", time: "Today, 6:00 PM", live: true },
  { title: "Quiz 4 — Risk Management", time: "Due: Jun 26", live: false },
  { title: "Assignment 2 — Chart Analysis", time: "Due: Jun 28", live: false },
];

export function StudentHome() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] font-medium text-white opacity-60">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Navy header */}
      <div className="px-5 pt-4 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs opacity-50 text-white">Good evening,</p>
            <p className="text-white font-bold text-lg leading-tight">Rahul Sharma 👋</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: PRIMARY }}>RS</div>
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: RED }}>
              <span className="text-white text-[8px] font-bold">3</span>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3B82F6" }} />
          <span className="text-xs font-medium" style={{ color: "#93C5FD" }}>Advanced Trading Batch A</span>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4 pb-20">
        {/* Live class banner */}
        <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: RED }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white/80 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live Today
              </span>
            </div>
            <p className="text-white font-semibold text-sm">Options Chain Deep Dive</p>
            <p className="text-white/70 text-xs mt-0.5">6:00 PM · Dr. Anand Kumar</p>
          </div>
          <button className="bg-white text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0" style={{ color: RED }}>Join</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Continue learning */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Continue Learning</p>
            <button className="text-xs flex items-center gap-1 font-medium" style={{ color: PRIMARY }}>All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-2.5">
            {lectures.map((l, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER}`, opacity: l.locked ? 0.55 : 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={l.progress === 100 ? { background: "rgba(16,185,129,0.1)", color: EMERALD } : l.progress > 0 ? { background: "rgba(37,99,235,0.1)", color: PRIMARY } : { background: "#F1F5F9", color: MUTED }}>
                  {l.locked ? <Lock className="w-4 h-4" /> : l.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{l.title}</p>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: MUTED }}>
                    <Clock className="w-2.5 h-2.5" /> {l.duration}
                  </p>
                  {l.progress > 0 && l.progress < 100 && (
                    <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                      <div className="h-full rounded-full" style={{ width: `${l.progress}%`, background: PRIMARY }} />
                    </div>
                  )}
                </div>
                {l.progress === 100 ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} /> :
                  !l.locked ? <PlayCircle className="w-5 h-5 flex-shrink-0" style={{ color: PRIMARY }} /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>Upcoming</p>
          <div className="space-y-2">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: u.live ? RED : "#CBD5E1" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: TEXT }}>{u.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>{u.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-[390px] px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", active: true }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
