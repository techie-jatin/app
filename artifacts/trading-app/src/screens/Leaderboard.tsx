import {
  TrendingUp, BookOpen, Calendar, BarChart2, Award,
  ChevronDown, Trophy, Zap, Star,
  Target, CheckCircle, Flame
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
const BORDER = "#E2E8F0";
const PURPLE = "#8B5CF6";
const GOLD = "#F59E0B";
const SILVER = "#94A3B8";
const BRONZE = "#B45309";

const tabs = ["Weekly", "Monthly", "All Time"];

const topThree = [
  { rank: 2, name: "Priya M.", avatar: "PM", color: PURPLE, score: 2840, badge: "🥈", ring: SILVER, quizAvg: 88, attendance: 95, assignments: "4/4", streak: 12 },
  { rank: 1, name: "Arjun K.", avatar: "AK", color: EMERALD, score: 3120, badge: "🥇", ring: GOLD, quizAvg: 94, attendance: 98, assignments: "4/4", streak: 18, crown: true },
  { rank: 3, name: "Rahul S.", avatar: "RS", color: PRIMARY, score: 2670, badge: "🥉", ring: BRONZE, quizAvg: 82, attendance: 90, assignments: "3/4", streak: 9 },
];

const rest = [
  { rank: 4, name: "Sneha J.", avatar: "SJ", color: "#EC4899", score: 2490, change: +2, quizAvg: 80, attendance: 87, assignments: "4/4", streak: 7 },
  { rank: 5, name: "Vikram P.", avatar: "VP", color: "#8B5CF6", score: 2310, change: -1, quizAvg: 77, attendance: 82, assignments: "3/4", streak: 5 },
  { rank: 6, name: "Mohit S.", avatar: "MS", color: AMBER, score: 2180, change: 0, quizAvg: 74, attendance: 79, assignments: "3/4", streak: 4 },
  { rank: 7, name: "Riya V.", avatar: "RV", color: "#EF4444", score: 2050, change: +3, quizAvg: 71, attendance: 76, assignments: "2/4", streak: 3 },
  { rank: 8, name: "Dev K.", avatar: "DK", color: "#06B6D4", score: 1920, change: -2, quizAvg: 68, attendance: 72, assignments: "2/4", streak: 6 },
];

// "You" entry — rank 12
const myEntry = { rank: 12, name: "You", avatar: "RS", color: PRIMARY, score: 1640, change: +4, quizAvg: 62, attendance: 68, assignments: "2/4", streak: 3 };

const myBadges = [
  { label: "Quiz Ace", icon: "🎯", earned: true, desc: "90%+ avg quiz" },
  { label: "On Fire", icon: "🔥", earned: true, desc: "7-day streak" },
  { label: "Top 30%", icon: "⭐", earned: true, desc: "Batch rank" },
  { label: "Perfect", icon: "💎", earned: false, desc: "100% attend." },
  { label: "Finisher", icon: "🏅", earned: false, desc: "All tasks done" },
  { label: "Scholar", icon: "📚", earned: false, desc: "90%+ quiz 3×" },
];

export function Leaderboard() {
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
      <div className="px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-bold text-base">Leaderboard</p>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.08)", color: TEXT2 }}>
            Advanced Batch A <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          {tabs.map((t, i) => (
            <button key={t} className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
              style={i === 0 ? { background: PRIMARY, color: "#fff" } : { color: MUTED }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="flex-shrink-0 px-4 py-5 relative" style={{ background: "linear-gradient(180deg,#0F172A 0%,#1E293B 100%)" }}>
        {/* Decorative glow */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-20 rounded-full opacity-20 blur-2xl pointer-events-none" style={{ background: GOLD }} />

        <div className="flex items-end justify-center gap-3 relative z-10">
          {/* 2nd place */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base"
                style={{ background: topThree[0].color, border: `3px solid ${SILVER}` }}>{topThree[0].avatar}</div>
              <span className="absolute -top-2 -right-2 text-base">{topThree[0].badge}</span>
            </div>
            <p className="text-white text-xs font-semibold">{topThree[0].name}</p>
            <div className="h-16 w-24 rounded-t-2xl flex flex-col items-center justify-center gap-0.5"
              style={{ background: "rgba(148,163,184,0.12)", border: "1px solid rgba(148,163,184,0.2)" }}>
              <span className="text-sm font-black text-white">{topThree[0].score.toLocaleString()}</span>
              <span className="text-[9px]" style={{ color: MUTED }}>pts</span>
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center gap-2">
            <Trophy className="w-5 h-5" style={{ color: GOLD }} />
            <div className="relative">
              <div className="rounded-2xl flex items-center justify-center text-white font-black text-xl"
                style={{ width: 72, height: 72, background: topThree[1].color, border: `3px solid ${GOLD}`, boxShadow: `0 0 20px ${GOLD}40` }}>{topThree[1].avatar}</div>
              <span className="absolute -top-2 -right-2 text-xl">{topThree[1].badge}</span>
            </div>
            <p className="text-white text-sm font-bold">{topThree[1].name}</p>
            <div className="h-24 w-24 rounded-t-2xl flex flex-col items-center justify-center gap-0.5"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
              <span className="text-base font-black text-white">{topThree[1].score.toLocaleString()}</span>
              <span className="text-[9px]" style={{ color: AMBER }}>pts</span>
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base"
                style={{ background: topThree[2].color, border: `3px solid ${BRONZE}` }}>{topThree[2].avatar}</div>
              <span className="absolute -top-2 -right-2 text-base">{topThree[2].badge}</span>
            </div>
            <p className="text-white text-xs font-semibold">{topThree[2].name}</p>
            <div className="h-10 w-24 rounded-t-2xl flex flex-col items-center justify-center gap-0.5"
              style={{ background: "rgba(180,83,9,0.12)", border: "1px solid rgba(180,83,9,0.25)" }}>
              <span className="text-sm font-black text-white">{topThree[2].score.toLocaleString()}</span>
              <span className="text-[9px]" style={{ color: "#B45309" }}>pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score pillars legend */}
      <div className="flex gap-3 px-4 py-2.5 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {[
          { icon: Target, label: "Quiz", color: PRIMARY },
          { icon: CheckCircle, label: "Attend.", color: EMERALD },
          { icon: BookOpen, label: "Tasks", color: PURPLE },
          { icon: Flame, label: "Streak", color: RED },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <item.icon className="w-3 h-3" style={{ color: item.color }} />
            <span className="text-[10px] font-medium" style={{ color: MUTED }}>{item.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <Zap className="w-3 h-3" style={{ color: AMBER }} />
          <span className="text-[10px] font-medium" style={{ color: MUTED }}>1pt = 10 score</span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 pb-20">
        {rest.map((s) => (
          <div key={s.rank} className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <span className="w-6 text-sm font-black text-center flex-shrink-0" style={{ color: MUTED }}>{s.rank}</span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: s.color }}>{s.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: TEXT }}>{s.name}</p>
              <div className="flex items-center gap-2.5 mt-0.5">
                <span className="text-[10px]" style={{ color: MUTED }}>Quiz {s.quizAvg}%</span>
                <span className="text-[10px]" style={{ color: EMERALD }}>Att. {s.attendance}%</span>
                <span className="text-[10px]" style={{ color: PURPLE }}>📋 {s.assignments}</span>
                <span className="flex items-center gap-0.5 text-[10px]" style={{ color: RED }}>
                  <Flame className="w-3 h-3" />{s.streak}d
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-black" style={{ color: TEXT }}>{s.score.toLocaleString()}</p>
              <p className="text-[10px] font-semibold"
                style={{ color: s.change > 0 ? EMERALD : s.change < 0 ? RED : MUTED }}>
                {s.change > 0 ? `▲ +${s.change}` : s.change < 0 ? `▼ ${s.change}` : "—"}
              </p>
            </div>
          </div>
        ))}

        {/* Ellipsis */}
        <div className="flex items-center justify-center py-1">
          <span className="text-xl font-bold" style={{ color: MUTED }}>• • •</span>
        </div>

        {/* My position — sticky-style highlight */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(37,99,235,0.07)", border: `2px solid ${PRIMARY}` }}>
          <span className="w-6 text-sm font-black text-center flex-shrink-0" style={{ color: PRIMARY }}>{myEntry.rank}</span>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>RS</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold" style={{ color: PRIMARY }}>You</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>MY RANK</span>
            </div>
            <div className="flex items-center gap-2.5 mt-0.5">
              <span className="text-[10px]" style={{ color: MUTED }}>Quiz {myEntry.quizAvg}%</span>
              <span className="text-[10px]" style={{ color: EMERALD }}>Att. {myEntry.attendance}%</span>
              <span className="text-[10px]" style={{ color: PURPLE }}>📋 {myEntry.assignments}</span>
              <span className="flex items-center gap-0.5 text-[10px]" style={{ color: RED }}>
                <Flame className="w-3 h-3" />{myEntry.streak}d
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-black" style={{ color: PRIMARY }}>{myEntry.score.toLocaleString()}</p>
            <p className="text-[10px] font-semibold" style={{ color: EMERALD }}>▲ +{myEntry.change}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: TEXT }}>
            <Star className="w-3.5 h-3.5" style={{ color: AMBER }} /> Your Badges
          </p>
          <div className="grid grid-cols-3 gap-2">
            {myBadges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1 py-3 rounded-xl"
                style={{
                  background: b.earned ? "rgba(37,99,235,0.06)" : "#F8FAFC",
                  border: `1px solid ${b.earned ? "rgba(37,99,235,0.15)" : BORDER}`,
                  opacity: b.earned ? 1 : 0.4,
                }}>
                <span className="text-2xl">{b.icon}</span>
                <p className="text-[9px] font-semibold text-center leading-tight" style={{ color: b.earned ? TEXT : MUTED }}>{b.label}</p>
                <p className="text-[8px] text-center" style={{ color: MUTED }}>{b.desc}</p>
                {b.earned && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: EMERALD }}>Earned</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How to climb */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E293B 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#fff" }}>
            <Zap className="w-3.5 h-3.5" style={{ color: AMBER }} /> How to Climb Faster
          </p>
          <p className="text-[10px] mb-3" style={{ color: "#475569" }}>Personalised tips for you — currently #12</p>
          <div className="space-y-2.5">
            {[
              { tip: "Score 90%+ on next quiz to earn +50 pts and unlock 'Quiz Ace' badge", icon: Target, color: PRIMARY, bg: "rgba(37,99,235,0.12)" },
              { tip: "Attend 5 consecutive classes this week for a +30 streak bonus", icon: Flame, color: RED, bg: "rgba(239,68,68,0.12)" },
              { tip: "Submit pending Assignment 3 — it's worth +30 pts and closes rank gap", icon: CheckCircle, color: EMERALD, bg: "rgba(16,185,129,0.12)" },
            ].map((t) => (
              <div key={t.tip} className="flex items-start gap-2.5 rounded-xl p-2.5" style={{ background: t.bg }}>
                <t.icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: t.color }} />
                <p className="text-[10px] leading-snug" style={{ color: "#CBD5E1" }}>{t.tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-[10px]" style={{ color: "#334155" }}>8 spots to reach <span style={{ color: AMBER }}>#4</span> · You've got this 🚀</p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
