import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, Plus, Search,
  Star, ChevronRight, Edit2, MoreVertical, Mail, Phone,
  CheckCircle, Clock, PlayCircle, Filter, Download, Shield
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
  { icon: GraduationCap, label: "Faculty", active: true, path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const faculty = [
  {
    name: "Dr. Anand Kumar", role: "Senior Trading Mentor", avatar: "AK",
    email: "anand@tradecoach.in", phone: "+91 98765 00001",
    batches: ["Advanced Trading A", "Options Trading C"],
    batchColors: [PURPLE, EMERALD],
    lectures: 42, students: 73, rating: 4.9, status: "Active",
    speciality: "Technical Analysis, Options",
    joined: "Jan 2025",
  },
  {
    name: "Prof. R. Gupta", role: "Trading Fundamentals Mentor", avatar: "RG",
    email: "rgupta@tradecoach.in", phone: "+91 98765 00002",
    batches: ["Fundamentals B"],
    batchColors: [PRIMARY],
    lectures: 28, students: 38, rating: 4.7, status: "Active",
    speciality: "Fundamental Analysis, Equity",
    joined: "Mar 2025",
  },
  {
    name: "Ms. Divya Shah", role: "Forex & Derivatives Mentor", avatar: "DS",
    email: "divya@tradecoach.in", phone: "+91 98765 00003",
    batches: ["Forex & Derivatives"],
    batchColors: [AMBER],
    lectures: 12, students: 0, rating: 4.8, status: "Upcoming",
    speciality: "Forex, Derivatives, Futures",
    joined: "Jun 2026",
  },
  {
    name: "Mr. Karan Mehta", role: "Guest Mentor — Algo Trading", avatar: "KM",
    email: "karan@external.in", phone: "+91 98765 00004",
    batches: [],
    batchColors: [],
    lectures: 3, students: 0, rating: 4.6, status: "Guest",
    speciality: "Algorithmic Trading, Python",
    joined: "Jun 2026",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "rgba(16,185,129,0.12)", color: EMERALD },
    Upcoming: { bg: "rgba(245,158,11,0.12)", color: AMBER },
    Guest: { bg: "rgba(139,92,246,0.12)", color: PURPLE },
  };
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={map[status]}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: map[status].color }} />
      {status}
    </span>
  );
}

export function AdminFaculty() {
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
        {/* Faculty list */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Faculty Management</h1>
              <p className="text-xs" style={{ color: MUTED }}>4 mentors · 3 active batches</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: MUTED }} />
                <input className="pl-9 pr-4 py-2 text-sm rounded-xl focus:outline-none w-52"
                  style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}
                  placeholder="Search faculty..." readOnly />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
                <Plus className="w-4 h-4" /> Add Faculty
              </button>
            </div>
          </header>

          {/* KPIs */}
          <div className="px-6 py-4 grid grid-cols-4 gap-4 flex-shrink-0" style={{ background: "#0D1526" }}>
            {[
              { label: "Total Faculty", value: "4", color: PRIMARY, bg: "rgba(37,99,235,0.08)" },
              { label: "Active Batches", value: "3", color: EMERALD, bg: "rgba(16,185,129,0.08)" },
              { label: "Total Lectures", value: "85", color: PURPLE, bg: "rgba(139,92,246,0.08)" },
              { label: "Avg Rating", value: "4.8★", color: AMBER, bg: "rgba(245,158,11,0.08)" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex-1">
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ background: "#0D1526" }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              {faculty.map((f, i) => (
                <div key={i} className="p-5 flex items-start gap-5"
                  style={{ borderBottom: i < faculty.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: i === 0 ? "linear-gradient(135deg, #2563EB, #8B5CF6)" : i === 1 ? "linear-gradient(135deg, #2563EB, #10B981)" : i === 2 ? "linear-gradient(135deg, #F59E0B, #EF4444)" : SURFACE }}>
                    {f.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-base" style={{ color: TEXT }}>{f.name}</p>
                          <StatusBadge status={f.status} />
                        </div>
                        <p className="text-xs" style={{ color: MUTED }}>{f.role}</p>
                        <p className="text-xs mt-0.5" style={{ color: MUTED }}>Speciality: <span style={{ color: TEXT2 }}>{f.speciality}</span></p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Shield className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-6">
                      {/* Contact */}
                      <div className="flex items-center gap-4">
                        <span className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                          <Mail className="w-3 h-3" /> {f.email}
                        </span>
                        <span className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                          <Phone className="w-3 h-3" /> {f.phone}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 flex-wrap">
                      {/* Batches */}
                      <div className="flex items-center gap-2">
                        {f.batches.length > 0 ? f.batches.map((b, bi) => (
                          <span key={bi} className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: `${f.batchColors[bi]}18`, color: f.batchColors[bi] }}>{b}</span>
                        )) : (
                          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: SURFACE, color: MUTED }}>No batch assigned</span>
                        )}
                        <button className="text-xs font-medium flex items-center gap-1" style={{ color: "#3B82F6" }}>
                          <Plus className="w-3 h-3" /> Assign
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 ml-auto">
                        <span className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                          <PlayCircle className="w-3.5 h-3.5" style={{ color: PRIMARY }} /> {f.lectures} lectures
                        </span>
                        <span className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                          <Users className="w-3.5 h-3.5" style={{ color: EMERALD }} /> {f.students} students
                        </span>
                        <span className="text-xs flex items-center gap-1.5" style={{ color: AMBER }}>
                          <Star className="w-3.5 h-3.5" fill={AMBER} /> {f.rating}
                        </span>
                        <span className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                          <Clock className="w-3.5 h-3.5" /> Since {f.joined}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: selected faculty detail */}
        <div className="w-72 flex flex-col flex-shrink-0" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
          <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Faculty Detail</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Dr. Anand Kumar</p>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Avatar + rating */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-3"
                style={{ background: "linear-gradient(135deg, #2563EB, #8B5CF6)" }}>AK</div>
              <p className="font-bold text-base" style={{ color: TEXT }}>Dr. Anand Kumar</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Senior Trading Mentor</p>
              <div className="flex items-center gap-1 mt-2">
                {[0,1,2,3,4].map(i => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ color: AMBER }} fill={AMBER} />
                ))}
                <span className="text-xs font-bold ml-1" style={{ color: AMBER }}>4.9</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Lectures", value: "42", color: PRIMARY },
                { label: "Students", value: "73", color: EMERALD },
                { label: "Batches", value: "2", color: PURPLE },
                { label: "Joined", value: "Jan '25", color: MUTED },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: SURFACE }}>
                  <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Assigned batches */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Assigned Batches</p>
              <div className="space-y-2">
                {[{ name: "Advanced Trading A", count: 42, color: PURPLE }, { name: "Options Trading C", count: 31, color: EMERALD }].map(b => (
                  <div key={b.name} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: SURFACE }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                    <p className="text-xs flex-1 font-medium" style={{ color: TEXT2 }}>{b.name}</p>
                    <span className="text-[10px]" style={{ color: MUTED }}>{b.count} students</span>
                  </div>
                ))}
                <button className="w-full text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1.5"
                  style={{ background: "rgba(37,99,235,0.1)", color: "#3B82F6", border: "1px dashed rgba(37,99,235,0.3)" }}>
                  <Plus className="w-3.5 h-3.5" /> Assign New Batch
                </button>
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Recent Activity</p>
              <div className="space-y-2.5">
                {[
                  { text: "Uploaded Lecture 6", time: "Today", color: PRIMARY },
                  { text: "Graded Assignment 2", time: "Jun 20", color: EMERALD },
                  { text: "Live class — 1h 30m", time: "Jun 23", color: RED },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                    <div>
                      <p className="text-xs" style={{ color: TEXT2 }}>{a.text}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: PRIMARY }}>
                Edit Faculty Profile
              </button>
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: SURFACE, color: TEXT2 }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
