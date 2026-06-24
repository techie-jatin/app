import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  Users, BarChart2, Bell, GraduationCap,
  Upload, Video, Calendar, Clock, Link2, ChevronDown,
  Radio, CheckCircle, AlertCircle, PlayCircle
} from "lucide-react";

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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "My Batches" },
  { icon: Upload, label: "Upload Lecture" },
  { icon: HelpCircle, label: "Create Quiz" },
  { icon: FileText, label: "Assignments" },
  { icon: Video, label: "Live Session", active: true },
  { icon: Users, label: "Attendance" },
  { icon: BarChart2, label: "Progress" },
  { icon: Bell, label: "Notifications" },
];

const upcoming = [
  { title: "Options Chain Deep Dive — Part 2", batch: "Advanced Trading A", date: "Today", time: "6:00 PM", status: "Starting Soon" },
  { title: "Risk Management Fundamentals", batch: "Fundamentals B", date: "Thu Jun 26", time: "5:30 PM", status: "Scheduled" },
  { title: "Derivatives & F&O Basics", batch: "Options Trading C", date: "Fri Jun 27", time: "7:00 PM", status: "Scheduled" },
];

const past = [
  { title: "Support & Resistance Mastery", batch: "Advanced Trading A", date: "Jun 22", duration: "1h 18m", attended: "39/42" },
  { title: "Candlestick Pattern Analysis", batch: "Options Trading C", date: "Jun 20", duration: "55m", attended: "16/18" },
  { title: "Fundamental Valuation Methods", batch: "Fundamentals B", date: "Jun 19", duration: "1h 02m", attended: "22/24" },
];

export function FacultyScheduleLive() {
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
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
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
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Schedule Live Session</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Create a YouTube Live session and notify your batch students</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: RED }}>
            <Radio className="w-3.5 h-3.5" /> Go Live Now
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Schedule form */}
            <div className="col-span-3 space-y-5">
              {/* Active class banner */}
              <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "rgba(239,68,68,0.08)", border: `1px solid rgba(239,68,68,0.25)` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.15)" }}>
                  <Radio className="w-5 h-5" style={{ color: RED }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: TEXT }}>Options Chain Deep Dive — Part 2</p>
                  <p className="text-xs" style={{ color: MUTED }}>Starts in <span style={{ color: AMBER }}>45 minutes</span> · Advanced Trading A</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: RED }}>Start Now</button>
              </div>

              <div className="rounded-2xl p-6 space-y-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Schedule New Session</p>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Session Title *</label>
                  <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}` }}>
                    <span className="text-sm" style={{ color: MUTED }}>e.g. Volume Profile — Live Q&A Session</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Batch *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Date & Time *</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Calendar className="w-4 h-4" style={{ color: AMBER }} />
                      <span className="text-sm" style={{ color: MUTED }}>Pick date & time</span>
                    </div>
                  </div>
                </div>

                {/* YouTube link */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>YouTube Live Link</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                    <span className="text-sm flex-1" style={{ color: MUTED }}>Paste your YouTube Live unlisted URL here</span>
                  </div>
                  <p className="text-[10px] mt-1.5 flex items-start gap-1" style={{ color: MUTED }}>
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    Go to YouTube Studio → Create → Go Live → copy the stream URL. Paste it here before or right when you start.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Session Description (Optional)</label>
                  <div className="px-4 py-3 h-20 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm" style={{ color: MUTED }}>What topics will you cover in this session?</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: SURFACE }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: TEXT2 }}>Send push notification to batch</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>Students will be notified 30 min before class</p>
                  </div>
                  <div className="w-10 h-5 rounded-full relative" style={{ background: TEAL }}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: TEAL }}>
                  Schedule Session
                </button>
              </div>
            </div>

            {/* Right panel */}
            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Upcoming Sessions</p>
                <div className="space-y-3">
                  {upcoming.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: SURFACE, border: s.status === "Starting Soon" ? `1px solid rgba(239,68,68,0.3)` : `1px solid ${BORDER2}` }}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold leading-snug" style={{ color: TEXT }}>{s.title}</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ background: s.status === "Starting Soon" ? "rgba(239,68,68,0.12)" : "rgba(13,148,136,0.1)", color: s.status === "Starting Soon" ? RED : TEAL2 }}>
                          {s.status}
                        </span>
                      </div>
                      <p className="text-[10px] mt-1" style={{ color: MUTED }}>{s.batch} · {s.date} · {s.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Past Sessions</p>
                <div className="space-y-3">
                  {past.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: SURFACE }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,148,136,0.1)" }}>
                        <PlayCircle className="w-4 h-4" style={{ color: TEAL2 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: TEXT }}>{s.title}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>{s.batch} · {s.date} · {s.duration}</p>
                        <p className="text-[10px]" style={{ color: EMERALD }}>{s.attended} attended</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
