import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, ChevronLeft,
  Mail, Phone, MapPin, CheckCircle, AlertTriangle,
  PlayCircle, HelpCircle, ClipboardList, MessageSquare,
  ArrowUp, ArrowDown, Star, Send, Eye
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
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", active: true, path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const attendanceWeeks = [
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 1, 1, 1, 0],
];

const quizHistory = [
  { name: "Quiz 1 — Basics", score: 80, total: 100, date: "Jun 2" },
  { name: "Quiz 2 — Technical Analysis", score: 85, total: 100, date: "Jun 8" },
  { name: "Quiz 3 — Chart Patterns", score: 92, total: 100, date: "Jun 14" },
  { name: "Quiz 4 — Risk Management", score: 88, total: 100, date: "Jun 20" },
];

const assignments = [
  { title: "Assignment 1 — Market Identification", status: "graded", grade: "A", date: "Jun 5" },
  { title: "Assignment 2 — Chart Analysis Exercise", status: "graded", grade: "A+", date: "Jun 12" },
  { title: "Assignment 3 — Options Study", status: "submitted", grade: "—", date: "Jun 22" },
  { title: "Assignment 4 — Mock Trade Report", status: "pending", grade: "—", date: "Due Jun 28" },
];

const gradeColor: Record<string, { color: string; bg: string }> = {
  graded: { color: EMERALD, bg: "rgba(16,185,129,0.1)" },
  submitted: { color: PRIMARY, bg: "rgba(37,99,235,0.1)" },
  pending: { color: AMBER, bg: "rgba(245,158,11,0.1)" },
};

export function AdminStudentDetail() {
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
      <div className="flex-1 flex overflow-hidden">
        {/* Detail area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="px-6 py-3.5 flex items-center gap-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
            <button onClick={() => navigate("/admin/dashboard")} style={{ cursor: "pointer" }}><ChevronLeft className="w-4 h-4" /> Students
            </button>
            <div className="w-px h-4" style={{ background: BORDER2 }} />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>RS</div>
              <div>
                <p className="font-semibold text-base" style={{ color: TEXT }}>Rahul Sharma</p>
                <p className="text-xs" style={{ color: MUTED }}>Advanced Trading Batch A · TC-STU-001</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                <MessageSquare className="w-4 h-4" /> Message
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                <Send className="w-4 h-4" /> Notify
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
                <Eye className="w-4 h-4" /> View Full Report
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-5" style={{ background: "#0D1526" }}>
            {/* KPI strip */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Attendance", value: "91%", delta: "+3%", up: true, color: EMERALD },
                { label: "Quiz Avg", value: "86%", delta: "+8%", up: true, color: PRIMARY },
                { label: "Assignments", value: "4/4", delta: "All done", up: true, color: EMERALD },
                { label: "Batch Rank", value: "#4", delta: "of 42", up: false, color: AMBER },
                { label: "Last Login", value: "Today", delta: "Active", up: true, color: EMERALD },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>{k.label}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {k.up ? <ArrowUp className="w-3 h-3" style={{ color: EMERALD }} /> : <ArrowDown className="w-3 h-3" style={{ color: RED }} />}
                    <span className="text-xs" style={{ color: k.up ? EMERALD : RED }}>{k.delta}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-3 gap-5">
              {/* Attendance heatmap */}
              <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Attendance — Jun 2026</h2>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>20 present / 22 classes</p>
                </div>
                <div className="p-5">
                  <div className="flex gap-1 mb-2">
                    {["M","T","W","T","F"].map((d, i) => (
                      <div key={i} className="flex-1 text-center text-[9px]" style={{ color: MUTED }}>{d}</div>
                    ))}
                  </div>
                  {attendanceWeeks.map((week, wi) => (
                    <div key={wi} className="flex gap-1 mb-1.5">
                      {week.map((day, di) => (
                        <div key={di} className="flex-1 aspect-square rounded-md"
                          style={{ background: day === 1 ? EMERALD : RED, opacity: 0.85 }} />
                      ))}
                    </div>
                  ))}
                  <div className="flex items-center gap-4 mt-4">
                    {[{ label: "Present", color: EMERALD }, { label: "Absent", color: RED }].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                        <span className="text-[10px]" style={{ color: MUTED }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Alert */}
                  <div className="mt-4 flex items-start gap-2 rounded-xl p-2.5" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                    <p className="text-[10px] leading-snug" style={{ color: MUTED }}>Above 80% threshold — good standing</p>
                  </div>
                </div>
              </div>

              {/* Quiz performance */}
              <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Quiz Scores</h2>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>Avg 86%</span>
                </div>
                <div className="p-5">
                  <div className="flex items-end gap-3 h-24 mb-3">
                    {quizHistory.map((q, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold" style={{ color: q.score >= 90 ? EMERALD : q.score >= 80 ? PRIMARY : AMBER }}>{q.score}</span>
                        <div className="w-full rounded-t-lg" style={{ height: `${(q.score / 100) * 72}px`, background: q.score >= 90 ? EMERALD : q.score >= 80 ? PRIMARY : AMBER }} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mt-2">
                    {quizHistory.map((q, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs truncate flex-1" style={{ color: TEXT2 }}>{q.name}</span>
                        <span className="text-xs font-bold ml-3 flex-shrink-0" style={{ color: q.score >= 90 ? EMERALD : q.score >= 80 ? PRIMARY : AMBER }}>{q.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignments */}
              <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Assignments</h2>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>3 graded · 1 pending</p>
                </div>
                <div className="divide-y" style={{ borderColor: BORDER }}>
                  {assignments.map((a, i) => (
                    <div key={i} className="px-5 py-3 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: gradeColor[a.status].bg }}>
                        <ClipboardList className="w-3.5 h-3.5" style={{ color: gradeColor[a.status].color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: TEXT2 }}>{a.title}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>{a.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: gradeColor[a.status].bg, color: gradeColor[a.status].color }}>
                          {a.status === "graded" ? a.grade : a.status === "submitted" ? "Review" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar row */}
            <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Course Module Progress</h2>
                <span className="text-xs font-bold" style={{ color: EMERALD }}>68% complete</span>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {[
                  { title: "Market Structure & Basics", progress: 100, color: EMERALD },
                  { title: "Technical Analysis", progress: 100, color: EMERALD },
                  { title: "Support & Resistance", progress: 75, color: PRIMARY },
                  { title: "Options & Derivatives", progress: 20, color: AMBER },
                ].map((m, i) => (
                  <div key={i}>
                    <p className="text-xs font-medium mb-2 leading-snug" style={{ color: m.progress === 0 ? MUTED : TEXT2 }}>{m.title}</p>
                    <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: SURFACE }}>
                      <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: m.color }} />
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: m.color }}>{m.progress}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Student info panel */}
        <div className="w-72 flex flex-col flex-shrink-0" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
          <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Student Info</p>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-3"
                style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>RS</div>
              <p className="font-bold text-base" style={{ color: TEXT }}>Rahul Sharma</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>TC-STU-001</p>
              <div className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: EMERALD }} />
                <span className="text-[10px] font-medium" style={{ color: EMERALD }}>Active</span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail, value: "rahul.sharma@gmail.com" },
                { icon: Phone, value: "+91 98765 43210" },
                { icon: MapPin, value: "Mumbai, Maharashtra" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: SURFACE }}>
                  <f.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                  <p className="text-xs truncate" style={{ color: TEXT2 }}>{f.value}</p>
                </div>
              ))}
            </div>

            {/* Batch & enrollment */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Enrollment</p>
              <div className="space-y-2">
                {[
                  { label: "Batch", value: "Adv. Trading A", color: PURPLE },
                  { label: "Enrolled", value: "Jan 12, 2026", color: TEXT2 },
                  { label: "Expires", value: "Apr 12, 2026", color: AMBER },
                  { label: "Fee Status", value: "₹23,600 Paid", color: EMERALD },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: SURFACE }}>
                    <span className="text-[10px]" style={{ color: MUTED }}>{r.label}</span>
                    <span className="text-xs font-semibold" style={{ color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Achievements</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Quiz Champion", color: AMBER },
                  { label: "Full Attendance", color: EMERALD },
                  { label: "Fast Learner", color: PRIMARY },
                ].map((b) => (
                  <span key={b.label} className="flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${b.color}15`, color: b.color }}>
                    <Star className="w-2.5 h-2.5" fill={b.color} style={{ color: b.color }} /> {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="space-y-2 pt-2">
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: "rgba(239,68,68,0.08)", color: RED, border: "1px solid rgba(239,68,68,0.15)" }}>
                Suspend Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
