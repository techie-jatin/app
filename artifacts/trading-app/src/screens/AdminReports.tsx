import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, ChevronRight,
  Download, ChevronDown, AlertTriangle, CheckCircle,
  Target, Zap, ArrowUp, ArrowDown
} from "lucide-react";
import { useLocation } from "wouter";

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
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", active: true, path: "/admin/reports" },
];

const batchStats = [
  { name: "Advanced Trading A", students: 42, attendance: 87, quizAvg: 84, completion: 68, color: PURPLE },
  { name: "Fundamentals B", students: 38, attendance: 82, quizAvg: 78, completion: 45, color: PRIMARY },
  { name: "Options Trading C", students: 31, attendance: 79, quizAvg: 81, completion: 30, color: EMERALD },
  { name: "Forex & Derivatives", students: 0, attendance: 0, quizAvg: 0, completion: 0, color: AMBER },
];

const topStudents = [
  { name: "Vikram Patel", batch: "Advanced Trading A", score: 94, avatar: "VP", delta: "+3%" },
  { name: "Arjun Kapoor", batch: "Fundamentals B", score: 91, avatar: "AK", delta: "+1%" },
  { name: "Sneha Joshi", batch: "Options Trading C", score: 90, avatar: "SJ", delta: "+5%" },
  { name: "Rahul Sharma", batch: "Advanced Trading A", score: 88, avatar: "RS", delta: "-2%" },
  { name: "Kavya Nair", batch: "Fundamentals B", score: 85, avatar: "KN", delta: "+4%" },
];

const attendanceHeatmap = [
  [1,1,0,1,1,null,null],
  [1,0,1,1,1,null,null],
  [1,1,1,0,1,1,null],
  [null,1,1,1,1,1,null],
  [null,null,1,1,0,1,1],
];

const weeks = ["W1","W2","W3","W4","W5"];
const days2 = ["M","T","W","T","F","S","S"];

const quizData = [
  { label: "Quiz 1", avg: 76 }, { label: "Quiz 2", avg: 80 }, { label: "Quiz 3", avg: 84 },
  { label: "Quiz 4", avg: 82 }, { label: "Quiz 5", avg: 88 },
];

function Bar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="text-xs w-8 text-right font-medium" style={{ color: TEXT2 }}>{value}%</span>
    </div>
  );
}

export function AdminReports() {
  const [, navigate] = useLocation();
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
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
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
        <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Reports & Analytics</h1>
            <p className="text-xs" style={{ color: MUTED }}>Batch performance overview · Jun 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
              June 2026 <ChevronDown className="w-4 h-4" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-5" style={{ background: "#0D1526" }}>
          {/* KPI strip */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Total Enrolled", value: "248", delta: "+12", up: true, color: PRIMARY },
              { label: "Avg Attendance", value: "84%", delta: "+2.4%", up: true, color: EMERALD },
              { label: "Avg Quiz Score", value: "82%", delta: "+4%", up: true, color: PURPLE },
              { label: "Assignments Due", value: "18", delta: "-5", up: false, color: AMBER },
              { label: "Certs Issued", value: "34", delta: "+8", up: true, color: EMERALD },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{k.label}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {k.up ? <ArrowUp className="w-3 h-3" style={{ color: EMERALD }} /> : <ArrowDown className="w-3 h-3" style={{ color: RED }} />}
                  <span className="text-xs font-medium" style={{ color: k.up ? EMERALD : RED }}>{k.delta} vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-3 gap-5">
            {/* Batch comparison */}
            <div className="col-span-2 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Batch Performance Comparison</h2>
                <button className="text-xs font-medium flex items-center gap-1" style={{ color: "#3B82F6" }}>Full Report <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-2 mb-4 text-[10px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
                  <span>Batch</span><span>Attendance</span><span>Quiz Avg</span><span>Completion</span>
                </div>
                <div className="space-y-5">
                  {batchStats.map((b) => (
                    <div key={b.name}>
                      <div className="grid grid-cols-4 gap-2 items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: b.color }} />
                          <span className="text-xs font-medium truncate" style={{ color: b.students === 0 ? MUTED : TEXT2 }}>{b.name.split(" ").slice(0, 2).join(" ")}</span>
                        </div>
                        <Bar value={b.attendance} color={b.attendance >= 80 ? EMERALD : b.attendance > 0 ? AMBER : MUTED} />
                        <Bar value={b.quizAvg} color={b.quizAvg >= 80 ? PRIMARY : b.quizAvg > 0 ? AMBER : MUTED} />
                        <Bar value={b.completion} color={b.color} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz trend */}
            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Quiz Score Trend</h2>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>All batches combined avg</p>
              </div>
              <div className="p-5">
                <div className="flex items-end gap-3 h-28 mb-3">
                  {quizData.map((q, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold" style={{ color: q.avg >= 85 ? EMERALD : q.avg >= 80 ? PRIMARY : AMBER }}>{q.avg}</span>
                      <div className="w-full rounded-t-lg" style={{ height: `${(q.avg / 100) * 88}px`, background: i === quizData.length - 1 ? EMERALD : i === quizData.length - 2 ? PRIMARY : SURFACE }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {quizData.map((q, i) => (
                    <p key={i} className="flex-1 text-center text-[9px]" style={{ color: MUTED }}>{q.label}</p>
                  ))}
                </div>
                <div className="mt-4 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
                  <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />
                  <p className="text-xs" style={{ color: TEXT2 }}>Up <strong style={{ color: EMERALD }}>+12%</strong> since Quiz 1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-3 gap-5">
            {/* Attendance heatmap */}
            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Attendance Heatmap</h2>
                <p className="text-xs" style={{ color: MUTED }}>Advanced Batch A · Jun 2026</p>
              </div>
              <div className="p-5">
                <div className="flex gap-1 mb-2">
                  {days2.map((d) => (
                    <div key={d} className="flex-1 text-center text-[9px] font-medium" style={{ color: MUTED }}>{d}</div>
                  ))}
                </div>
                {attendanceHeatmap.map((week, wi) => (
                  <div key={wi} className="flex gap-1 mb-1 items-center">
                    {week.map((day, di) => (
                      <div key={di} className="flex-1 aspect-square rounded-sm"
                        style={{ background: day === null ? "transparent" : day === 1 ? EMERALD : day === 0 ? RED : SURFACE, opacity: day === null ? 0 : 0.8 }} />
                    ))}
                  </div>
                ))}
                <div className="flex items-center gap-4 mt-4">
                  {[{ label: "Present", color: EMERALD }, { label: "Absent", color: RED }, { label: "No class", color: SURFACE }].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                      <span className="text-[10px]" style={{ color: MUTED }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top students */}
            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Top Performers</h2>
                <button className="text-xs" style={{ color: "#3B82F6" }}>All →</button>
              </div>
              <div className="divide-y" style={{ borderColor: BORDER }}>
                {topStudents.map((s, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-3">
                    <span className="text-base w-5 text-center flex-shrink-0">{["🥇","🥈","🥉","4️⃣","5️⃣"][i]}</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: PRIMARY }}>{s.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: TEXT2 }}>{s.name}</p>
                      <p className="text-[10px] truncate" style={{ color: MUTED }}>{s.batch}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold" style={{ color: i < 3 ? EMERALD : TEXT2 }}>{s.score}%</p>
                      <p className="text-[10px]" style={{ color: s.delta.startsWith("+") ? EMERALD : RED }}>{s.delta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* At-risk students */}
            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm flex items-center gap-2" style={{ color: TEXT }}>
                  <AlertTriangle className="w-4 h-4" style={{ color: AMBER }} /> At-Risk Students
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(245,158,11,0.12)", color: AMBER }}>6</span>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  { name: "Kavya Nair", issue: "Attendance 55% — below 80%", avatar: "KN", severity: RED },
                  { name: "Mohit Singh", issue: "2 assignments pending", avatar: "MS", severity: AMBER },
                  { name: "Riya Verma", issue: "Quiz avg 58% — low", avatar: "RV", severity: AMBER },
                  { name: "Deepak Rao", issue: "Not logged in 14 days", avatar: "DR", severity: RED },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl p-2.5" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ background: s.severity }}>
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: TEXT2 }}>{s.name}</p>
                      <p className="text-[10px] leading-snug mt-0.5" style={{ color: MUTED }}>{s.issue}</p>
                    </div>
                    <button className="text-[10px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0" style={{ background: "rgba(37,99,235,0.15)", color: "#3B82F6" }}>
                      Notify
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
