import {
  Users, BookOpen, Activity, Bell, TrendingUp, Award,
  ChevronRight, Calendar, Settings, BarChart2,
  UserCheck, AlertTriangle, Clock, CheckCircle, PlayCircle,
  GraduationCap, Layers, FileText
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

const stats = [
  { label: "Total Students", value: "248", delta: "+12 this week", icon: Users, iconBg: "rgba(37,99,235,0.12)", iconColor: "#3B82F6" },
  { label: "Total Faculty", value: "14", delta: "+2 this month", icon: GraduationCap, iconBg: "rgba(139,92,246,0.12)", iconColor: "#8B5CF6" },
  { label: "Active Batches", value: "6", delta: "3 in progress", icon: Layers, iconBg: "rgba(245,158,11,0.12)", iconColor: "#F59E0B" },
  { label: "Avg Attendance", value: "84%", delta: "+2.4% vs last week", icon: UserCheck, iconBg: "rgba(16,185,129,0.12)", iconColor: "#10B981" },
];

const recentStudents = [
  { name: "Rahul Sharma", email: "rahul@email.com", batch: "Advanced Trading A", status: "Active", avatar: "RS" },
  { name: "Priya Mehta", email: "priya@email.com", batch: "Pending", status: "Pending", avatar: "PM" },
  { name: "Arjun Kapoor", email: "arjun@email.com", batch: "Fundamentals B", status: "Active", avatar: "AK" },
  { name: "Sneha Joshi", email: "sneha@email.com", batch: "Pending", status: "Pending", avatar: "SJ" },
  { name: "Vikram Patel", email: "vikram@email.com", batch: "Options Trading C", status: "Active", avatar: "VP" },
];

const upcomingClasses = [
  { title: "Options Chain Analysis", batch: "Advanced Trading A", time: "Today, 6:00 PM", faculty: "Dr. Anand", live: true },
  { title: "Risk Management Fundamentals", batch: "Fundamentals B", time: "Tomorrow, 5:30 PM", faculty: "Prof. Gupta", live: false },
  { title: "Technical Analysis Deep Dive", batch: "Options Trading C", time: "Jun 25, 7:00 PM", faculty: "Dr. Anand", live: false },
];

const recentActivity = [
  { text: "Quiz submitted by Rahul Sharma", time: "2 min ago", icon: FileText, color: "#3B82F6" },
  { text: "New assignment uploaded in Batch A", time: "1 hr ago", icon: BookOpen, color: "#8B5CF6" },
  { text: "Certificate issued to Priya Mehta", time: "3 hr ago", icon: Award, color: AMBER },
  { text: "Suspicious login from new device", time: "5 hr ago", icon: AlertTriangle, color: RED },
  { text: "Batch C live class ended", time: "Yesterday", icon: PlayCircle, color: EMERALD },
];

const navItems = [
  { icon: BarChart2, label: "Dashboard", active: true },
  { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Faculty" },
  { icon: Layers, label: "Batches" },
  { icon: BookOpen, label: "Courses" },
  { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" },
  { icon: Award, label: "Certificates" },
  { icon: TrendingUp, label: "Reports" },
];

export function AdminDashboard() {
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
        <div className="px-5 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all" style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Dashboard</h1>
            <p className="text-xs" style={{ color: MUTED }}>Monday, June 23, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ background: SURFACE, color: MUTED }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
              + Add Student
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6" style={{ background: "#0D1526" }}>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex items-start gap-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.iconBg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.iconColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: EMERALD }}>{s.delta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Recent Registrations</h2>
                <button className="text-xs font-medium flex items-center gap-1" style={{ color: "#3B82F6" }}>View All <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div style={{ borderTop: "none" }}>
                {recentStudents.map((s) => (
                  <div key={s.name} className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: SURFACE, color: TEXT2 }}>{s.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: TEXT2 }}>{s.name}</p>
                      <p className="text-xs truncate" style={{ color: MUTED }}>{s.email}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={s.status === "Active" ? { background: "rgba(16,185,129,0.12)", color: EMERALD } : { background: "rgba(245,158,11,0.12)", color: AMBER }}>
                      {s.batch === "Pending" ? "Unassigned" : s.batch}
                    </span>
                    <button className="text-xs px-3 py-1 rounded-lg font-medium" style={s.status === "Pending" ? { background: PRIMARY, color: "#fff" } : { background: SURFACE, color: TEXT2 }}>
                      {s.status === "Pending" ? "Assign" : "View"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Recent Activity</h2>
              </div>
              <div className="p-4 space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: SURFACE, color: a.color }}>
                      <a.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs leading-snug" style={{ color: TEXT2 }}>{a.text}</p>
                      <p className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: MUTED }}>
                        <Clock className="w-2.5 h-2.5" /> {a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Upcoming Live Classes</h2>
              <button className="text-xs font-medium flex items-center gap-1" style={{ color: "#3B82F6" }}>View Schedule <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {upcomingClasses.map((c, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={c.live ? { background: "rgba(220,38,38,0.2)", color: RED } : { background: CARD, color: MUTED }}>
                      <PlayCircle className="w-4 h-4" />
                    </div>
                    {c.live && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(220,38,38,0.15)", color: RED }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: RED }} /> LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-snug" style={{ color: TEXT }}>{c.title}</p>
                  <p className="text-xs mt-1" style={{ color: MUTED }}>{c.batch}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs" style={{ color: "#3B82F6" }}>{c.time}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{c.faculty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
