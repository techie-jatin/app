import {
  Layers, BookOpen, Users, Plus, TrendingUp, BarChart2,
  GraduationCap, Bell, Calendar, Award, Search, ChevronRight,
  PlayCircle, FileText, ClipboardList, HelpCircle, Edit2,
  MoreVertical, Upload, Settings, Clock, CheckCircle,
  Link2, Video, Paperclip, ChevronDown, Trash2
} from "lucide-react";

const batches = [
  { id: "B-001", name: "Advanced Trading A", students: 42, faculty: "Dr. Anand Kumar", start: "Jan 2026", end: "Jun 2026", status: "Active", progress: 68, color: "from-violet-500 to-purple-600", light: "bg-violet-500/15 text-violet-400" },
  { id: "B-002", name: "Fundamentals B", students: 38, faculty: "Prof. R. Gupta", start: "Feb 2026", end: "Jul 2026", status: "Active", progress: 45, color: "from-blue-500 to-cyan-600", light: "bg-blue-500/15 text-blue-400" },
  { id: "B-003", name: "Options Trading C", students: 31, faculty: "Dr. Anand Kumar", start: "Mar 2026", end: "Aug 2026", status: "Active", progress: 30, color: "from-emerald-500 to-teal-600", light: "bg-emerald-500/15 text-emerald-400" },
  { id: "B-004", name: "Forex & Derivatives", students: 0, faculty: "Unassigned", start: "Aug 2026", end: "Dec 2026", status: "Upcoming", progress: 0, color: "from-amber-500 to-orange-600", light: "bg-amber-500/15 text-amber-400" },
];

const courseContent = [
  { type: "lecture", icon: Video, label: "Lecture 1 — Market Structure Overview", duration: "1h 24m", date: "15 Jan 2026", batch: "Adv. Trading A", status: "published", color: "text-blue-400 bg-blue-500/10" },
  { type: "lecture", icon: Video, label: "Lecture 2 — Candlestick Patterns", duration: "58m", date: "20 Jan 2026", batch: "Adv. Trading A", status: "published", color: "text-blue-400 bg-blue-500/10" },
  { type: "notes", icon: FileText, label: "Module 1 Notes — PDF", duration: "2.4 MB", date: "21 Jan 2026", batch: "Adv. Trading A", status: "published", color: "text-amber-400 bg-amber-500/10" },
  { type: "assignment", icon: ClipboardList, label: "Assignment 1 — Chart Reading Exercise", duration: "Due: 5 Feb", date: "25 Jan 2026", batch: "Adv. Trading A", status: "active", color: "text-violet-400 bg-violet-500/10" },
  { type: "quiz", icon: HelpCircle, label: "Quiz 1 — Technical Analysis Basics", duration: "20 min · 15 MCQ", date: "28 Jan 2026", batch: "Adv. Trading A", status: "active", color: "text-emerald-400 bg-emerald-500/10" },
  { type: "lecture", icon: Video, label: "Lecture 3 — Support & Resistance", duration: "1h 10m", date: "3 Feb 2026", batch: "Adv. Trading A", status: "published", color: "text-blue-400 bg-blue-500/10" },
];

const navItems = [
  { icon: BarChart2, label: "Dashboard" },
  { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Faculty" },
  { icon: Layers, label: "Batches", active: true },
  { icon: BookOpen, label: "Courses" },
  { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" },
  { icon: Award, label: "Certificates" },
  { icon: BarChart2, label: "Reports" },
];

export function BatchCourseManagement() {
  return (
    <div className="flex h-screen bg-slate-950 font-['Inter'] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
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
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                item.active
                  ? "bg-amber-500/15 text-amber-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">Admin</p>
              <p className="text-slate-500 text-xs truncate">admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-semibold text-lg">Batch & Course Management</h1>
            <p className="text-slate-500 text-xs">4 batches · 111 enrolled students</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700">
              <Upload className="w-4 h-4" /> Upload Content
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-lg">
              <Plus className="w-4 h-4" /> New Batch
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Batch Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-200 font-semibold text-sm">Active Batches</h2>
              <button className="text-amber-400 text-xs flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {batches.map((b) => (
                <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors cursor-pointer">
                  {/* Color top strip */}
                  <div className={`h-1.5 bg-gradient-to-r ${b.color}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-slate-200 font-semibold text-sm leading-snug">{b.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{b.id}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${b.light}`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Users className="w-3.5 h-3.5" />
                        <span>{b.students} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span className="truncate">{b.faculty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{b.start} → {b.end}</span>
                      </div>
                    </div>

                    {b.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-slate-600 text-[10px]">Course Progress</span>
                          <span className="text-slate-400 text-[10px]">{b.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${b.color} rounded-full`} style={{ width: `${b.progress}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button className="flex-1 text-xs py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 font-medium">
                        Manage
                      </button>
                      <button className="p-1.5 rounded-lg bg-slate-800 text-slate-500 hover:text-slate-300">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-white font-semibold text-sm">Course Content</h2>
                <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5">
                  {["All", "Lectures", "Notes", "Assignments", "Quizzes"].map((tab, i) => (
                    <button key={tab} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      i === 0 ? "bg-amber-500 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                  <input className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none w-44" placeholder="Search content..." readOnly />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 cursor-pointer">
                  Adv. Trading A <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {courseContent.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-800/20 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-sm font-medium truncate">{item.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.batch} · Uploaded {item.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {item.duration}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.status === "published"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-blue-500/15 text-blue-400"
                  }`}>
                    {item.status}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.type === "lecture" && (
                      <button className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10">
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Content Row */}
            <div className="px-5 py-3 border-t border-slate-800">
              <button className="flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300">
                <Plus className="w-4 h-4" /> Add content to this batch
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
