import {
  BarChart2, Users, GraduationCap, Layers, BookOpen, Calendar,
  Bell, Award, TrendingUp, CheckCircle, XCircle, Clock,
  Download, ChevronDown, ChevronLeft, Search, Filter
} from "lucide-react";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
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
  { icon: BarChart2, label: "Dashboard" }, { icon: Users, label: "Students", active: true },
  { icon: GraduationCap, label: "Faculty" }, { icon: Layers, label: "Batches" },
  { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" }, { icon: Award, label: "Certificates" },
  { icon: TrendingUp, label: "Reports" },
];

const lectures = [
  { title: "Market Structure Basics", date: "Jun 4", watched: 100, status: "Present" },
  { title: "Technical Analysis Intro", date: "Jun 7", watched: 95, status: "Present" },
  { title: "Support & Resistance", date: "Jun 10", watched: 80, status: "Present" },
  { title: "Volume Profile — Part 1", date: "Jun 13", watched: 72, status: "Partial" },
  { title: "Volume Profile — Part 2", date: "Jun 16", watched: 55, status: "Absent" },
  { title: "Options Chain Analysis", date: "Jun 20", watched: 92, status: "Present" },
];

const liveClasses = [
  { title: "Live Q&A — Market Structure", date: "Jun 8", attended: true },
  { title: "Practical Session — S&R Zones", date: "Jun 12", attended: true },
  { title: "Live Q&A — Volume Profile", date: "Jun 17", attended: false },
  { title: "Options Chain Live Demo", date: "Jun 22", attended: true },
];

function statusStyle(s: string) {
  if (s === "Present") return { bg: "rgba(16,185,129,0.08)", color: EMERALD, icon: CheckCircle };
  if (s === "Absent") return { bg: "rgba(239,68,68,0.08)", color: RED, icon: XCircle };
  return { bg: "rgba(245,158,11,0.08)", color: AMBER, icon: Clock };
}

export function AdminAttendanceDetail() {
  const overallPct = Math.round(
    lectures.reduce((sum, l) => sum + l.watched, 0) / lectures.length
  );
  const presentCount = lectures.filter(l => l.status === "Present").length;

  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PRIMARY }}>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#60A5FA", borderLeft: `3px solid ${PRIMARY}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: SURFACE }}>
              <ChevronLeft className="w-4 h-4" style={{ color: TEXT2 }} />
            </button>
            <div>
              <h1 className="text-xl font-black" style={{ color: TEXT }}>Attendance Detail — Rahul Sharma</h1>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Advanced Trading Batch A · Student ID #RS-2025-001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
              <span className="text-xs" style={{ color: TEXT }}>June 2025</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: "#60A5FA", border: `1px solid ${BORDER2}` }}>
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Summary row */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Overall Attendance", value: `${overallPct}%`, color: overallPct >= 80 ? EMERALD : overallPct >= 60 ? AMBER : RED, big: true },
              { label: "Lectures Present", value: `${presentCount}/${lectures.length}`, color: EMERALD },
              { label: "Live Classes", value: `${liveClasses.filter(l => l.attended).length}/${liveClasses.length}`, color: PRIMARY },
              { label: "Avg Watch %", value: `${overallPct}%`, color: AMBER },
              { label: "Status", value: overallPct >= 80 ? "On Track" : "At Risk", color: overallPct >= 80 ? EMERALD : RED },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${s.big ? s.color + "40" : BORDER2}` }}>
                <p className={`font-black ${s.big ? "text-3xl" : "text-2xl"}`} style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] mt-1" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Lecture attendance */}
            <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Lecture-by-Lecture Attendance</p>
                <p className="text-[10px]" style={{ color: MUTED }}>Auto-tracked · ≥80% watch = Present</p>
              </div>
              {lectures.map((l, i) => {
                const style = statusStyle(l.status);
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: style.bg }}>
                      <style.icon className="w-4 h-4" style={{ color: style.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: TEXT }}>{l.title}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>{l.date} · Watched {l.watched}% of video</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: BORDER2 }}>
                        <div className="h-full rounded-full" style={{ width: `${l.watched}%`, background: style.color }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right" style={{ color: style.color }}>{l.watched}%</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg w-16 text-center"
                      style={{ background: style.bg, color: style.color }}>
                      {l.status}
                    </span>
                    <button className="text-[10px] px-2 py-1 rounded-lg flex-shrink-0" style={{ background: SURFACE, color: "#60A5FA" }}>
                      Override
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              {/* Live class attendance */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Live Class Attendance</p>
                <div className="space-y-2.5">
                  {liveClasses.map((l, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: SURFACE }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: l.attended ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)" }}>
                        {l.attended
                          ? <CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                          : <XCircle className="w-3.5 h-3.5" style={{ color: RED }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: TEXT }}>{l.title}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>{l.date}</p>
                      </div>
                      <span className="text-[9px] font-bold" style={{ color: l.attended ? EMERALD : RED }}>
                        {l.attended ? "Attended" : "Absent"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin override note */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Admin Override</p>
                <p className="text-xs mb-3" style={{ color: MUTED }}>
                  Manually adjust a lecture's attendance status if the student faced technical issues (with justification).
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Select Lecture</label>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: MUTED }}>Volume Profile — Part 2</span>
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Override Status</label>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: MUTED }}>Mark as Present</span>
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Reason (required)</label>
                    <div className="px-3 py-2.5 h-14 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: MUTED }}>e.g. Student reported internet outage — verified</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl font-bold text-sm text-white text-xs" style={{ background: PRIMARY }}>
                    Apply Override
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
