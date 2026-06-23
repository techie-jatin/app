import {
  Users, BookOpen, Activity, Bell, TrendingUp, Award,
  ChevronRight, Calendar, LogOut, Settings, BarChart2,
  UserCheck, AlertTriangle, Clock, CheckCircle, PlayCircle,
  GraduationCap, Layers, FileText
} from "lucide-react";

const stats = [
  { label: "Total Students", value: "248", delta: "+12 this week", icon: Users, color: "bg-blue-500", light: "bg-blue-50 text-blue-600" },
  { label: "Total Faculty", value: "14", delta: "+2 this month", icon: GraduationCap, color: "bg-violet-500", light: "bg-violet-50 text-violet-600" },
  { label: "Active Batches", value: "6", delta: "3 in progress", icon: Layers, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
  { label: "Avg Attendance", value: "84%", delta: "+2.4% vs last week", icon: UserCheck, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
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
  { text: "Quiz submitted by Rahul Sharma", time: "2 min ago", icon: FileText, color: "text-blue-500" },
  { text: "New assignment uploaded in Batch A", time: "1 hr ago", icon: BookOpen, color: "text-violet-500" },
  { text: "Certificate issued to Priya Mehta", time: "3 hr ago", icon: Award, color: "text-amber-500" },
  { text: "Suspicious login from new device", time: "5 hr ago", icon: AlertTriangle, color: "text-red-500" },
  { text: "Batch C live class ended", time: "Yesterday", icon: PlayCircle, color: "text-emerald-500" },
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
    <div className="flex h-screen bg-slate-950 font-['Inter'] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">TradeCoach</p>
              <p className="text-slate-500 text-[10px] mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                item.active
                  ? "bg-amber-500/15 text-amber-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">Admin</p>
              <p className="text-slate-500 text-xs truncate">admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-semibold text-lg">Dashboard</h1>
            <p className="text-slate-500 text-xs">Monday, June 23, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-lg transition-colors">
              + Add Student
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.light}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                  <p className="text-emerald-400 text-xs mt-0.5">{s.delta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Recent Students */}
            <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm">Recent Registrations</h2>
                <button className="text-amber-400 text-xs font-medium flex items-center gap-1 hover:text-amber-300">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y divide-slate-800">
                {recentStudents.map((s) => (
                  <div key={s.name} className="px-5 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold flex-shrink-0">
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-sm font-medium truncate">{s.name}</p>
                      <p className="text-slate-500 text-xs truncate">{s.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}>
                        {s.batch === "Pending" ? "Unassigned" : s.batch}
                      </span>
                    </div>
                    <button className={`text-xs px-3 py-1 rounded-lg font-medium ${
                      s.status === "Pending"
                        ? "bg-amber-500 text-white hover:bg-amber-400"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    }`}>
                      {s.status === "Pending" ? "Assign" : "View"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl">
              <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-white font-semibold text-sm">Recent Activity</h2>
              </div>
              <div className="p-4 space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 ${a.color}`}>
                      <a.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-xs leading-snug">{a.text}</p>
                      <p className="text-slate-600 text-[10px] mt-0.5 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm">Upcoming Live Classes</h2>
              <button className="text-amber-400 text-xs font-medium flex items-center gap-1">
                View Schedule <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {upcomingClasses.map((c, i) => (
                <div key={i} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      c.live ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-slate-400"
                    }`}>
                      <PlayCircle className="w-4 h-4" />
                    </div>
                    {c.live && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/15 text-red-400 text-[10px] font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                        LIVE TODAY
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 text-sm font-medium leading-snug">{c.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{c.batch}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-amber-400 text-xs">{c.time}</p>
                    <p className="text-slate-500 text-xs">{c.faculty}</p>
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
