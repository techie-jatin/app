import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  Users, BarChart2, Bell, GraduationCap,
  Upload, Video, TrendingUp, ChevronDown, Star, Target, CheckCircle, Search
} from "lucide-react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const TEAL = "#0D9488";
const TEAL2 = "#14B8A6";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";
const PRIMARY = "#2563EB";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/dashboard" },
  { icon: BookOpen, label: "My Batches", path: "/faculty/dashboard" },
  { icon: Upload, label: "Upload Lecture", path: "/faculty/upload" },
  { icon: HelpCircle, label: "Create Quiz", path: "/faculty/quiz" },
  { icon: FileText, label: "Assignments", path: "/faculty/assignment" },
  { icon: Video, label: "Live Session", path: "/faculty/live" },
  { icon: Users, label: "Attendance", path: "/faculty/attendance" },
  { icon: BarChart2, label: "Progress", active: true, path: "/faculty/progress" },
  { icon: Bell, label: "Notifications", path: "/faculty/dashboard" },
];

const students = [
  { name: "Arjun Kapoor", avatar: "AK", attendance: 99, quizAvg: 94, assignments: "4/4", completion: 90, rank: 1, trend: "up" },
  { name: "Priya Mehta", avatar: "PM", attendance: 91, quizAvg: 88, assignments: "4/4", completion: 82, rank: 2, trend: "up" },
  { name: "Rahul Sharma", avatar: "RS", attendance: 91, quizAvg: 88, assignments: "4/4", completion: 78, rank: 3, trend: "stable" },
  { name: "Sneha Joshi", avatar: "SJ", attendance: 85, quizAvg: 80, assignments: "3/4", completion: 68, rank: 4, trend: "up" },
  { name: "Kavya Reddy", avatar: "KR", attendance: 92, quizAvg: 76, assignments: "3/4", completion: 62, rank: 5, trend: "stable" },
  { name: "Vikram Patel", avatar: "VP", attendance: 70, quizAvg: 68, assignments: "2/4", completion: 45, rank: 6, trend: "down" },
  { name: "Mohit Singh", avatar: "MS", attendance: 52, quizAvg: 55, assignments: "1/4", completion: 30, rank: 7, trend: "down" },
];

const quizData = [
  { quiz: "Q1", scores: [80, 88, 84, 78, 76, 65, 58] },
  { quiz: "Q2", scores: [85, 90, 88, 80, 78, 68, 55] },
  { quiz: "Q3", scores: [88, 94, 90, 82, 80, 70, 60] },
  { quiz: "Q4", scores: [92, 96, 92, 86, 82, 72, 58] },
];

function trendColor(t: string) {
  return t === "up" ? EMERALD : t === "down" ? RED : AMBER;
}
function trendIcon(t: string) {
  return t === "up" ? "▲" : t === "down" ? "▼" : "—";
}

export function FacultyStudentProgress() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: TEAL }}>
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: TEAL2 }}>Faculty Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-4" style={{ background: SURFACE }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: TEAL }}>AK</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: TEXT }}>Dr. Anand Kumar</p>
            <p className="text-[10px] truncate" style={{ color: TEAL2 }}>Senior Mentor</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(13,148,136,0.15)", color: TEAL2, borderLeft: `3px solid ${TEAL2}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Student Progress</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Batch-level and per-student performance overview — read only</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
              <span className="text-xs" style={{ color: TEXT }}>Advanced Trading A</span>
              <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Batch summary */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Batch Avg. Score", value: "78%", color: TEAL2, icon: Target },
              { label: "Avg. Attendance", value: "83%", color: EMERALD, icon: Users },
              { label: "Assignments Done", value: "75%", color: AMBER, icon: CheckCircle },
              { label: "At-Risk Students", value: "2", color: RED, icon: TrendingUp },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Student table */}
            <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>All Students</p>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: SURFACE }}>
                  <Search className="w-3.5 h-3.5" style={{ color: MUTED }} />
                  <span className="text-xs" style={{ color: MUTED }}>Search student...</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SURFACE, borderBottom: `1px solid ${BORDER2}` }}>
                      {["#", "Student", "Attend.", "Quiz Avg", "Tasks", "Progress", "Trend"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left font-semibold" style={{ color: MUTED }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BORDER2}` }}>
                        <td className="px-4 py-3 font-black" style={{ color: i < 3 ? AMBER : MUTED }}>#{s.rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                              style={{ background: s.completion >= 70 ? TEAL : s.completion >= 50 ? AMBER : RED }}>
                              {s.avatar}
                            </div>
                            <span style={{ color: TEXT }}>{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold" style={{ color: s.attendance >= 80 ? EMERALD : s.attendance >= 60 ? AMBER : RED }}>{s.attendance}%</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: s.quizAvg >= 80 ? TEAL2 : s.quizAvg >= 65 ? AMBER : RED }}>{s.quizAvg}%</td>
                        <td className="px-4 py-3" style={{ color: s.assignments === "4/4" ? EMERALD : AMBER }}>{s.assignments}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: BORDER2 }}>
                              <div className="h-full rounded-full" style={{ width: `${s.completion}%`, background: s.completion >= 70 ? TEAL2 : s.completion >= 50 ? AMBER : RED }} />
                            </div>
                            <span style={{ color: MUTED }}>{s.completion}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold" style={{ color: trendColor(s.trend) }}>{trendIcon(s.trend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quiz performance chart */}
            <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <p className="text-sm font-bold mb-1" style={{ color: TEXT }}>Quiz Score Trend</p>
              <p className="text-[10px] mb-4" style={{ color: MUTED }}>Top 3 students · Q1–Q4</p>
              {quizData.map((q, qi) => (
                <div key={qi} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold" style={{ color: MUTED }}>{q.quiz}</span>
                    <span className="text-[10px] font-bold" style={{ color: TEAL2 }}>Avg {Math.round(q.scores.reduce((a, b) => a + b) / q.scores.length)}%</span>
                  </div>
                  <div className="flex gap-1 h-6">
                    {q.scores.map((s, si) => (
                      <div key={si} className="flex-1 rounded-sm"
                        style={{
                          height: `${(s / 100) * 24}px`,
                          alignSelf: "flex-end",
                          background: si === 0 ? AMBER : si === 1 ? TEAL2 : si === 2 ? PURPLE : BORDER2,
                          opacity: si > 2 ? 0.4 : 1,
                        }} />
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-4 space-y-1.5">
                {[
                  { name: "Arjun K.", color: AMBER },
                  { name: "Priya M.", color: TEAL2 },
                  { name: "Rahul S.", color: PURPLE },
                ].map((l) => (
                  <div key={l.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                    <span className="text-[10px]" style={{ color: MUTED }}>{l.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-[10px] font-bold" style={{ color: RED }}>⚠️ At-risk students</p>
                <p className="text-[10px] mt-1" style={{ color: MUTED }}>Vikram Patel and Mohit Singh are below 60% in attendance and quizzes. Consider sending them a direct message.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
