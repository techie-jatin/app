import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2,
  Award, CheckCircle, Target, Zap, Trophy, Star
} from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";
const BORDER = "#E2E8F0";

const quizScores = [
  { label: "Q1", score: 80 },
  { label: "Q2", score: 85 },
  { label: "Q3", score: 92 },
  { label: "Q4", score: 88 },
  { label: "Q5", score: 95 },
];
const maxScore = 100;

const modules = [
  { title: "Market Structure & Basics", progress: 100, lectures: 4, score: 84, color: EMERALD },
  { title: "Technical Analysis", progress: 100, lectures: 5, score: 90, color: EMERALD },
  { title: "Support & Resistance", progress: 75, lectures: 4, score: 88, color: PRIMARY },
  { title: "Volume Profile", progress: 40, lectures: 3, score: 0, color: AMBER },
  { title: "Options & Derivatives", progress: 0, lectures: 6, score: 0, color: MUTED },
];

const stats = [
  { label: "Lectures Watched", value: "18", sub: "of 22 total", icon: BookOpen, color: PRIMARY, bg: "rgba(37,99,235,0.08)" },
  { label: "Quiz Average", value: "88%", sub: "5 quizzes taken", icon: Target, color: EMERALD, bg: "rgba(16,185,129,0.08)" },
  { label: "Assignments", value: "4/4", sub: "All submitted", icon: CheckCircle, color: EMERALD, bg: "rgba(16,185,129,0.08)" },
  { label: "Rank in Batch", value: "#4", sub: "of 42 students", icon: Trophy, color: AMBER, bg: "rgba(245,158,11,0.08)" },
];

export function ProgressAnalytics() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-3 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <p className="text-white font-semibold text-base">Progress & Analytics</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Advanced Trading Batch A</p>
          </div>
        </div>

        {/* Overall progress ring */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="38" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
              <circle cx="48" cy="48" r="38" stroke={EMERALD} strokeWidth="8" fill="none"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - 0.68)}`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">68%</span>
              <span className="text-[9px]" style={{ color: "#64748B" }}>Complete</span>
            </div>
          </div>
          <div className="flex-1 space-y-2.5">
            {[
              { label: "Course Progress", value: 68, color: EMERALD },
              { label: "Attendance", value: 91, color: PRIMARY },
              { label: "Quiz Average", value: 88, color: PURPLE },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium" style={{ color: "#9CA3AF" }}>{item.label}</span>
                  <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] leading-tight mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                <p className="text-[10px]" style={{ color: s.color }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz scores chart */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Quiz Performance</p>
            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>Avg 88%</span>
          </div>
          <div className="flex items-end gap-3 h-24 mb-2">
            {quizScores.map((q, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold" style={{ color: q.score >= 90 ? EMERALD : q.score >= 80 ? PRIMARY : AMBER }}>
                  {q.score}
                </span>
                <div className="w-full rounded-t-lg transition-all"
                  style={{ height: `${(q.score / maxScore) * 72}px`, background: q.score >= 90 ? EMERALD : q.score >= 80 ? PRIMARY : AMBER }} />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {quizScores.map((q, i) => (
              <p key={i} className="flex-1 text-center text-[10px] font-medium" style={{ color: MUTED }}>{q.label}</p>
            ))}
          </div>
          {/* Trend */}
          <div className="mt-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "rgba(16,185,129,0.06)", border: `1px solid rgba(16,185,129,0.12)` }}>
            <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />
            <p className="text-xs" style={{ color: TEXT2 }}>Scores improving steadily — up <strong style={{ color: EMERALD }}>+15%</strong> since Quiz 1</p>
          </div>
        </div>

        {/* Module progress */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-4" style={{ color: TEXT }}>Module Progress</p>
          <div className="space-y-4">
            {modules.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {m.progress === 100
                      ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0" style={{ borderColor: m.progress > 0 ? m.color : BORDER }} />}
                    <span className="text-xs font-medium truncate" style={{ color: m.progress === 0 ? MUTED : TEXT }}>{m.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {m.score > 0 && (
                      <span className="text-[10px] font-bold" style={{ color: m.score >= 88 ? EMERALD : PRIMARY }}>{m.score}%</span>
                    )}
                    <span className="text-[10px]" style={{ color: MUTED }}>{m.progress}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#EEF2FF" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${m.progress}%`, background: m.color }} />
                </div>
                <p className="text-[10px] mt-1" style={{ color: MUTED }}>{m.lectures} lectures</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard preview */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Batch Leaderboard</p>
            <span className="text-xs font-medium" style={{ color: PRIMARY }}>Your rank: #4</span>
          </div>
          <div className="space-y-2">
            {[
              { rank: 1, name: "Vikram Patel", score: "94%", avatar: "VP", isYou: false, color: "#D4AF37" },
              { rank: 2, name: "Arjun Kapoor", score: "91%", avatar: "AK", isYou: false, color: "#94A3B8" },
              { rank: 3, name: "Sneha Joshi", score: "90%", avatar: "SJ", isYou: false, color: "#CD7F32" },
              { rank: 4, name: "Rahul Sharma", score: "88%", avatar: "RS", isYou: true, color: PRIMARY },
              { rank: 5, name: "Priya Mehta", score: "85%", avatar: "PM", isYou: false, color: TEXT2 },
            ].map((entry) => (
              <div key={entry.rank} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{ background: entry.isYou ? "rgba(37,99,235,0.06)" : BG, border: `1px solid ${entry.isYou ? "rgba(37,99,235,0.2)" : BORDER}` }}>
                <span className="w-5 text-sm font-black text-center flex-shrink-0" style={{ color: entry.color }}>
                  {entry.rank <= 3 ? ["🥇","🥈","🥉"][entry.rank - 1] : `#${entry.rank}`}
                </span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: entry.isYou ? PRIMARY : MUTED }}>{entry.avatar}</div>
                <p className="flex-1 text-sm font-medium" style={{ color: entry.isYou ? PRIMARY : TEXT }}>
                  {entry.name}{entry.isYou && <span className="text-[10px] ml-1" style={{ color: PRIMARY }}>(You)</span>}
                </p>
                <span className="text-sm font-bold" style={{ color: entry.isYou ? PRIMARY : TEXT2 }}>{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress", active: true }, { icon: Award, label: "Profile" }].map((item) => (
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
