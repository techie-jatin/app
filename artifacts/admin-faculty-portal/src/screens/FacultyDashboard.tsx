
import { AlertCircle, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronRight, Clock, FileText, GraduationCap, HelpCircle, LayoutDashboard, Menu, PlayCircle, Plus, Star, TrendingUp, Upload, Users, Video, X } from "lucide-react";
import { useState } from "react";
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
  { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/faculty/dashboard" },
  { icon: BookOpen, label: "My Batches", path: "/faculty/dashboard" },
  { icon: Upload, label: "Upload Lecture", path: "/faculty/upload" },
  { icon: HelpCircle, label: "Create Quiz", path: "/faculty/quiz" },
  { icon: FileText, label: "Assignments", path: "/faculty/assignment" },
  { icon: Video, label: "Live Session", path: "/faculty/live" },
  { icon: Users, label: "Attendance", path: "/faculty/attendance" },
  { icon: BarChart2, label: "Progress", path: "/faculty/progress" },
  { icon: Bell, label: "Notifications", path: "/faculty/dashboard" },
];

const stats = [
  { label: "My Batches", value: "3", sub: "Active", icon: GraduationCap, color: TEAL2, bg: "rgba(20,184,166,0.1)" },
  { label: "Total Students", value: "84", sub: "+6 new this week", icon: Users, color: PRIMARY, bg: "rgba(37,99,235,0.1)" },
  { label: "Lectures Uploaded", value: "47", sub: "This course", icon: PlayCircle, color: PURPLE, bg: "rgba(139,92,246,0.1)" },
  { label: "Avg. Quiz Score", value: "78%", sub: "Across all batches", icon: Star, color: AMBER, bg: "rgba(245,158,11,0.1)" },
];

const pendingTasks = [
  { task: "Review 8 submissions for Assignment 3", batch: "Advanced Trading A", type: "assignment", urgent: true },
  { task: "Upload Lecture 6 — Volume Profile", batch: "Advanced Trading A", type: "lecture", urgent: true },
  { task: "Create Quiz 5 — Risk Management", batch: "Fundamentals B", type: "quiz", urgent: false },
  { task: "Schedule live class for next week", batch: "Options Trading C", type: "live", urgent: false },
  { task: "Grade Quiz 4 manual review (3 flagged)", batch: "Options Trading C", type: "quiz", urgent: true },
];

const batches = [
  { name: "Advanced Trading Batch A", students: 42, progress: 68, lectures: "5/8", nextClass: "Today 6:00 PM", color: TEAL2 },
  { name: "Fundamentals Batch B", students: 24, progress: 45, lectures: "3/7", nextClass: "Thu 5:30 PM", color: PRIMARY },
  { name: "Options Trading Batch C", students: 18, progress: 30, lectures: "2/6", nextClass: "Fri 7:00 PM", color: PURPLE },
];

const recentActivity = [
  { text: "Rahul Sharma submitted Assignment 3", time: "10 min ago", color: TEAL2 },
  { text: "Quiz 4 completed by 39/42 students in Batch A", time: "2 hr ago", color: EMERALD },
  { text: "Priya Mehta asked a doubt in Batch B", time: "3 hr ago", color: AMBER },
  { text: "Live class recording saved — Lecture 5", time: "Yesterday", color: PURPLE },
  { text: "Assignment 2 deadline passed — 4 pending", time: "Yesterday", color: RED },
];

const taskIcons: Record<string, { icon: any; color: string }> = {
  assignment: { icon: FileText, color: AMBER },
  lecture: { icon: Upload, color: TEAL2 },
  quiz: { icon: HelpCircle, color: PURPLE },
  live: { icon: Video, color: RED },
};

export function FacultyDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div className="w-full min-h-screen flex overflow-hidden font-['Inter']" style={{ background: BG }}>
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
              style={item.active
                ? { background: "rgba(13,148,136,0.15)", color: TEAL2, borderLeft: `3px solid ${TEAL2}` }
                : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Good evening, Dr. Anand 👋</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>You have <span style={{ color: AMBER }}>3 urgent tasks</span> pending today</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: TEAL }}>
              <Plus className="w-3.5 h-3.5" /> Quick Add
            </button>
            <div className="relative">
              <Bell className="w-5 h-5" style={{ color: MUTED }} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[8px] font-bold" style={{ background: RED }}>5</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs font-semibold" style={{ color: TEXT2 }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* My Batches */}
            <div className="col-span-1 md:col-span-2 rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold" style={{ color: TEXT }}>My Batches</p>
                <button className="text-xs" style={{ color: TEAL2 }}>View All</button>
              </div>
              <div className="space-y-3">
                {batches.map((b) => (
                  <div key={b.name} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: SURFACE }}>
                    <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: b.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: TEXT }}>{b.name}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>{b.students} students · Lectures {b.lectures}</p>
                      <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: BORDER2 }}>
                        <div className="h-full rounded-full" style={{ width: `${b.progress}%`, background: b.color }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-black" style={{ color: b.color }}>{b.progress}%</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>Next: {b.nextClass}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Recent Activity</p>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: a.color }} />
                    <div>
                      <p className="text-xs leading-snug" style={{ color: TEXT2 }}>{a.text}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold" style={{ color: TEXT }}>Pending Tasks</p>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: RED }}>{pendingTasks.filter(t => t.urgent).length} urgent</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pendingTasks.map((t, i) => {
                const meta = taskIcons[t.type];
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: SURFACE, border: t.urgent ? `1px solid rgba(239,68,68,0.2)` : `1px solid ${BORDER2}` }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${meta.color}18` }}>
                      <meta.icon className="w-4 h-4" style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug" style={{ color: TEXT }}>{t.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px]" style={{ color: MUTED }}>{t.batch}</span>
                        {t.urgent && <span className="text-[9px] font-bold px-1.5 rounded" style={{ background: "rgba(239,68,68,0.12)", color: RED }}>URGENT</span>}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
