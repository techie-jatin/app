import {
  Layers, BookOpen, Users, Plus, TrendingUp, BarChart2,
  GraduationCap, Bell, Calendar, Award, Search, ChevronRight,
  PlayCircle, FileText, ClipboardList, HelpCircle, Edit2,
  MoreVertical, Upload, Settings, Clock, Link2, Trash2, ChevronDown
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

const batches = [
  { id: "B-001", name: "Advanced Trading A", students: 42, faculty: "Dr. Anand Kumar", start: "Jan 2026", end: "Jun 2026", status: "Active", progress: 68, accent: "#8B5CF6", accentBg: "rgba(139,92,246,0.12)" },
  { id: "B-002", name: "Fundamentals B", students: 38, faculty: "Prof. R. Gupta", start: "Feb 2026", end: "Jul 2026", status: "Active", progress: 45, accent: "#3B82F6", accentBg: "rgba(59,130,246,0.12)" },
  { id: "B-003", name: "Options Trading C", students: 31, faculty: "Dr. Anand Kumar", start: "Mar 2026", end: "Aug 2026", status: "Active", progress: 30, accent: EMERALD, accentBg: "rgba(16,185,129,0.12)" },
  { id: "B-004", name: "Forex & Derivatives", students: 0, faculty: "Unassigned", start: "Aug 2026", end: "Dec 2026", status: "Upcoming", progress: 0, accent: AMBER, accentBg: "rgba(245,158,11,0.12)" },
];

const courseContent = [
  { type: "lecture", icon: PlayCircle, label: "Lecture 1 — Market Structure Overview", duration: "1h 24m", date: "15 Jan 2026", status: "published", iconStyle: { background: "rgba(59,130,246,0.12)", color: "#3B82F6" } },
  { type: "lecture", icon: PlayCircle, label: "Lecture 2 — Candlestick Patterns", duration: "58m", date: "20 Jan 2026", status: "published", iconStyle: { background: "rgba(59,130,246,0.12)", color: "#3B82F6" } },
  { type: "notes", icon: FileText, label: "Module 1 Notes — PDF", duration: "2.4 MB", date: "21 Jan 2026", status: "published", iconStyle: { background: "rgba(245,158,11,0.12)", color: AMBER } },
  { type: "assignment", icon: ClipboardList, label: "Assignment 1 — Chart Reading Exercise", duration: "Due: 5 Feb", date: "25 Jan 2026", status: "active", iconStyle: { background: "rgba(139,92,246,0.12)", color: "#8B5CF6" } },
  { type: "quiz", icon: HelpCircle, label: "Quiz 1 — Technical Analysis Basics", duration: "20 min · 15 MCQ", date: "28 Jan 2026", status: "active", iconStyle: { background: "rgba(16,185,129,0.12)", color: EMERALD } },
  { type: "lecture", icon: PlayCircle, label: "Lecture 3 — Support & Resistance", duration: "1h 10m", date: "3 Feb 2026", status: "published", iconStyle: { background: "rgba(59,130,246,0.12)", color: "#3B82F6" } },
];

const navItems = [
  { icon: BarChart2, label: "Dashboard" }, { icon: Users, label: "Students" }, { icon: GraduationCap, label: "Faculty" },
  { icon: Layers, label: "Batches", active: true }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" }, { icon: Award, label: "Certificates" }, { icon: BarChart2, label: "Reports" },
];

export function BatchCourseManagement() {
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Batch & Course Management</h1>
            <p className="text-xs" style={{ color: MUTED }}>4 batches · 111 enrolled students</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
              <Upload className="w-4 h-4" /> Upload Content
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
              <Plus className="w-4 h-4" /> New Batch
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6" style={{ background: "#0D1526" }}>
          {/* Batch Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color: TEXT2 }}>Active Batches</h2>
              <button className="text-xs flex items-center gap-1" style={{ color: "#3B82F6" }}>View All <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {batches.map((b) => (
                <div key={b.id} className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="h-1.5" style={{ background: b.accent }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm leading-snug" style={{ color: TEXT }}>{b.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: MUTED }}>{b.id}</p>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: b.accentBg, color: b.accent }}>{b.status}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {[{ Icon: Users, text: `${b.students} students` }, { Icon: GraduationCap, text: b.faculty }, { Icon: Calendar, text: `${b.start} → ${b.end}` }].map(({ Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
                          <Icon className="w-3.5 h-3.5" /><span className="truncate">{text}</span>
                        </div>
                      ))}
                    </div>
                    {b.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px]" style={{ color: MUTED }}>Progress</span>
                          <span className="text-[10px]" style={{ color: TEXT2 }}>{b.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                          <div className="h-full rounded-full" style={{ width: `${b.progress}%`, background: b.accent }} />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 text-xs py-1.5 rounded-xl font-medium" style={{ background: SURFACE, color: TEXT2 }}>Manage</button>
                      <button className="p-1.5 rounded-xl" style={{ background: SURFACE, color: MUTED }}><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Table */}
          <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Course Content</h2>
                <div className="flex items-center gap-1 rounded-xl p-0.5" style={{ background: SURFACE }}>
                  {["All", "Lectures", "Notes", "Assignments", "Quizzes"].map((tab, i) => (
                    <button key={tab} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={i === 0 ? { background: PRIMARY, color: "#fff" } : { color: MUTED }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: MUTED }} />
                  <input className="pl-8 pr-3 py-1.5 text-xs rounded-xl focus:outline-none w-44" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }} placeholder="Search content..." readOnly />
                </div>
                <div className="flex items-center gap-1.5 text-xs rounded-xl px-3 py-1.5 cursor-pointer" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: MUTED }}>
                  Adv. Trading A <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {courseContent.map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4" style={{ borderBottom: i < courseContent.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={item.iconStyle}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: TEXT2 }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>Uploaded {item.date}</p>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
                  <Clock className="w-3.5 h-3.5" />{item.duration}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={item.status === "published" ? { background: "rgba(16,185,129,0.12)", color: EMERALD } : { background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}>
                  {item.status}
                </span>
                <div className="flex items-center gap-1.5">
                  {item.type === "lecture" && <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Link2 className="w-3.5 h-3.5" /></button>}
                  <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}

            <div className="px-5 py-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              <button className="flex items-center gap-2 text-sm font-medium" style={{ color: "#3B82F6" }}>
                <Plus className="w-4 h-4" /> Add content to this batch
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
