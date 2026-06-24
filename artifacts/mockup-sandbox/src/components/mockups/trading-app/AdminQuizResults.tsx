import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, ChevronDown,
  Search, Filter, CheckCircle, AlertCircle, Download,
  Target, Clock, ArrowUp, ArrowDown, Minus, Eye,
  RotateCcw, Trophy, Zap
} from "lucide-react";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: BarChart2, label: "Dashboard" }, { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Faculty" }, { icon: Layers, label: "Batches" },
  { icon: BookOpen, label: "Courses", active: true }, { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" }, { icon: Award, label: "Certificates" },
  { icon: TrendingUp, label: "Reports" },
];

const quizStats = [
  { label: "Attempted", val: "41 / 45", icon: Users, color: PRIMARY },
  { label: "Avg Score", val: "72%", icon: Target, color: EMERALD },
  { label: "Pass Rate", val: "78%", icon: CheckCircle, color: EMERALD },
  { label: "Avg Time", val: "18 min", icon: Clock, color: AMBER },
  { label: "Top Score", val: "97%", icon: Trophy, color: AMBER },
  { label: "Failed", val: "9", icon: AlertCircle, color: RED },
];

const students = [
  { name: "Arjun Kapoor", avatar: "AK", color: AMBER, score: 97, time: "14m", status: "pass", change: +8, q1: true, q2: true, q3: true, q4: true, q5: false },
  { name: "Priya Mehta", avatar: "PM", color: PURPLE, score: 91, time: "17m", status: "pass", change: +5, q1: true, q2: true, q3: true, q4: true, q5: true },
  { name: "Rahul Sharma", avatar: "RS", color: PRIMARY, score: 84, time: "22m", status: "pass", change: -3, q1: true, q2: true, q3: false, q4: true, q5: true },
  { name: "Sneha Joshi", avatar: "SJ", color: "#EC4899", score: 78, time: "19m", status: "pass", change: +12, q1: true, q2: false, q3: true, q4: true, q5: false },
  { name: "Vikram P.", avatar: "VP", color: "#8B5CF6", score: 72, time: "24m", status: "pass", change: 0, q1: true, q2: true, q3: false, q4: false, q5: true },
  { name: "Mohit Singh", avatar: "MS", color: RED, score: 55, time: "28m", status: "fail", change: -7, q1: false, q2: true, q3: false, q4: false, q5: false },
  { name: "Dev Kumar", avatar: "DK", color: "#06B6D4", score: 48, time: "30m", status: "fail", change: -2, q1: false, q2: false, q3: false, q4: true, q5: false },
];

const questions = [
  { no: 1, topic: "Iron Condor — Strike Selection", correct: 38, total: 41, pct: 93 },
  { no: 2, topic: "IV Rank Interpretation", correct: 31, total: 41, pct: 76 },
  { no: 3, topic: "Break-even Calculation", correct: 24, total: 41, pct: 59 },
  { no: 4, topic: "Greeks — Theta Decay", correct: 29, total: 41, pct: 71 },
  { no: 5, topic: "Adjustment Strategies", correct: 19, total: 41, pct: 46 },
];

export function AdminQuizResults() {
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
        <div className="px-5 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-3.5 flex items-center gap-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: TEXT }}>Quiz Results</p>
            <p className="text-xs" style={{ color: MUTED }}>Options Chain Quiz 3 · Advanced Batch A · Conducted Jun 21, 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
              <RotateCcw className="w-3.5 h-3.5" /> Reattempt
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-bold rounded-xl" style={{ background: PRIMARY }}>
              <Bell className="w-3.5 h-3.5" /> Notify Failed
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ background: "#0D1526" }}>
          {/* Stats row */}
          <div className="grid grid-cols-6 gap-3">
            {quizStats.map((s) => (
              <div key={s.label} className="rounded-2xl px-4 py-3" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
                </div>
                <p className="text-xl font-black" style={{ color: s.color === RED && s.label === "Failed" ? RED : TEXT }}>{s.val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Student results table */}
            <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                <p className="font-semibold text-sm" style={{ color: TEXT }}>Student Results</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: SURFACE }}>
                    <Search className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    <span className="text-xs" style={{ color: MUTED }}>Search…</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs" style={{ background: SURFACE, color: MUTED }}>
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                </div>
              </div>

              {/* Table header */}
              <div className="grid px-5 py-2.5" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr", borderBottom: `1px solid ${BORDER2}`, background: SURFACE }}>
                {["Student", "Score", "Time", "Status", "Q1", "Q2", "Q3", "Q4", "Q5"].map((h) => (
                  <span key={h} className="text-[9px] font-bold uppercase" style={{ color: MUTED }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y" style={{ borderColor: BORDER2 }}>
                {students.map((s, i) => {
                  const answers = [s.q1, s.q2, s.q3, s.q4, s.q5];
                  return (
                    <div key={s.name} className="grid items-center px-5 py-3 hover:bg-opacity-50 transition-all"
                      style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                      {/* Student */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                          style={{ background: s.color }}>{s.avatar}</div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: TEXT }}>{s.name}</p>
                          <p className="text-[9px]" style={{ color: MUTED }}>Batch A</p>
                        </div>
                      </div>
                      {/* Score */}
                      <div>
                        <p className="text-sm font-black" style={{ color: s.score >= 60 ? EMERALD : RED }}>{s.score}%</p>
                      </div>
                      {/* Time */}
                      <p className="text-xs" style={{ color: TEXT2 }}>{s.time}</p>
                      {/* Status */}
                      <span className="text-[9px] font-bold px-2 py-1 rounded-full w-fit"
                        style={{ background: s.status === "pass" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: s.status === "pass" ? EMERALD : RED }}>
                        {s.status === "pass" ? "PASS" : "FAIL"}
                      </span>
                      {/* Per-question */}
                      {answers.map((correct, qi) => (
                        <div key={qi} className="flex items-center justify-center">
                          {correct
                            ? <CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                            : <AlertCircle className="w-3.5 h-3.5" style={{ color: RED }} />}
                        </div>
                      ))}
                      {/* View */}
                      <button style={{ color: MUTED }}><Eye className="w-3.5 h-3.5" /></button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right col: question analysis + score distribution */}
            <div className="space-y-4">
              {/* Question analysis */}
              <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="px-4 py-3" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                  <p className="font-semibold text-sm" style={{ color: TEXT }}>Question Analysis</p>
                  <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>% of students answered correctly</p>
                </div>
                <div className="p-4 space-y-3">
                  {questions.map((q) => (
                    <div key={q.no}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium leading-tight" style={{ color: TEXT2 }}>Q{q.no}. {q.topic}</span>
                        <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: q.pct >= 70 ? EMERALD : q.pct >= 50 ? AMBER : RED }}>{q.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                        <div className="h-full rounded-full" style={{ width: `${q.pct}%`, background: q.pct >= 70 ? EMERALD : q.pct >= 50 ? AMBER : RED }} />
                      </div>
                      {q.pct < 55 && (
                        <p className="text-[9px] mt-1 flex items-center gap-1" style={{ color: AMBER }}>
                          <Zap className="w-2.5 h-2.5" /> Suggest revisiting this topic in next class
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Score distribution */}
              <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="font-semibold text-sm mb-4" style={{ color: TEXT }}>Score Distribution</p>
                <div className="flex items-end gap-2 h-24">
                  {[
                    { range: "0-40", count: 2, color: RED },
                    { range: "41-60", count: 7, color: AMBER },
                    { range: "61-75", count: 14, color: PRIMARY },
                    { range: "76-90", count: 12, color: EMERALD },
                    { range: "91-100", count: 6, color: "#10B981" },
                  ].map((bar) => {
                    const maxCount = 14;
                    const h = (bar.count / maxCount) * 80;
                    return (
                      <div key={bar.range} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] font-bold" style={{ color: bar.color }}>{bar.count}</span>
                        <div className="w-full rounded-t-lg" style={{ height: h, background: bar.color, opacity: 0.7 }} />
                        <span className="text-[8px]" style={{ color: MUTED }}>{bar.range}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span style={{ color: MUTED }}>Pass mark: 60%</span>
                  <span style={{ color: EMERALD }}>32 passed · 9 failed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
