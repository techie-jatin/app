import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  Users, BarChart2, Bell, GraduationCap,
  Upload, Video, CheckCircle, XCircle, Clock, Download, Filter, ChevronDown, Search
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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/dashboard" },
  { icon: BookOpen, label: "My Batches", path: "/faculty/dashboard" },
  { icon: Upload, label: "Upload Lecture", path: "/faculty/upload" },
  { icon: HelpCircle, label: "Create Quiz", path: "/faculty/quiz" },
  { icon: FileText, label: "Assignments", path: "/faculty/assignment" },
  { icon: Video, label: "Live Session", path: "/faculty/live" },
  { icon: Users, label: "Attendance", active: true, path: "/faculty/attendance" },
  { icon: BarChart2, label: "Progress", path: "/faculty/progress" },
  { icon: Bell, label: "Notifications", path: "/faculty/dashboard" },
];

const lectures = [
  "Market Structure Basics", "Technical Analysis Intro", "Support & Resistance", "Volume Profile", "Options Chain", "Risk Management",
];

const students = [
  { name: "Rahul Sharma", avatar: "RS", attendance: [100, 95, 80, 92, 88, 100], overall: 93 },
  { name: "Arjun Kapoor", avatar: "AK", attendance: [100, 100, 100, 98, 95, 100], overall: 99 },
  { name: "Sneha Joshi", avatar: "SJ", attendance: [80, 88, 90, 75, 82, 95], overall: 85 },
  { name: "Priya Mehta", avatar: "PM", attendance: [100, 92, 85, 100, 78, 88], overall: 91 },
  { name: "Vikram Patel", avatar: "VP", attendance: [60, 75, 70, 65, 80, 72], overall: 70 },
  { name: "Kavya Reddy", avatar: "KR", attendance: [95, 100, 98, 90, 92, 88], overall: 94 },
  { name: "Mohit Singh", avatar: "MS", attendance: [40, 55, 60, 50, 45, 65], overall: 52 },
];

function statusColor(pct: number) {
  if (pct >= 80) return EMERALD;
  if (pct >= 60) return AMBER;
  return RED;
}

export function FacultyAttendance() {
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
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Attendance</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Lecture-by-lecture watch log — auto-tracked (≥80% watch = Present)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
              <span className="text-xs" style={{ color: TEXT }}>Advanced Trading A</span>
              <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEAL2, border: `1px solid ${BORDER2}` }}>
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col p-6 gap-4">
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 flex-shrink-0">
            {[
              { label: "Avg. Attendance", value: "83%", color: EMERALD, sub: "Batch average" },
              { label: "Above 80%", value: "5", color: TEAL2, sub: "Students on track" },
              { label: "Below 80%", value: "2", color: RED, sub: "At risk" },
              { label: "Total Lectures", value: "6", color: AMBER, sub: "Tracked so far" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                <div>
                  <p className="text-xs font-semibold" style={{ color: TEXT2 }}>{s.label}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance table */}
          <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
            {/* Table header */}
            <div className="flex items-center px-4 py-3 text-[10px] font-bold uppercase tracking-wide" style={{ background: SURFACE, borderBottom: `1px solid ${BORDER2}` }}>
              <div className="w-48 flex-shrink-0" style={{ color: MUTED }}>Student</div>
              {lectures.map((l, i) => (
                <div key={i} className="flex-1 text-center truncate px-1" style={{ color: MUTED }} title={l}>L{i + 1}</div>
              ))}
              <div className="w-24 text-right flex-shrink-0" style={{ color: MUTED }}>Overall</div>
              <div className="w-20 text-right flex-shrink-0" style={{ color: MUTED }}>Action</div>
            </div>

            {students.map((s, si) => (
              <div key={si} className="flex items-center px-4 py-3" style={{ borderBottom: `1px solid ${BORDER2}`, background: si % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <div className="w-48 flex-shrink-0 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                    style={{ background: s.overall >= 80 ? TEAL : s.overall >= 60 ? AMBER : RED }}>{s.avatar}</div>
                  <span className="text-xs font-medium truncate" style={{ color: TEXT }}>{s.name}</span>
                </div>
                {s.attendance.map((pct, li) => (
                  <div key={li} className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-0.5">
                      {pct >= 80
                        ? <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
                        : pct >= 60
                        ? <Clock className="w-4 h-4" style={{ color: AMBER }} />
                        : <XCircle className="w-4 h-4" style={{ color: RED }} />}
                      <span className="text-[8px]" style={{ color: MUTED }}>{pct}%</span>
                    </div>
                  </div>
                ))}
                <div className="w-24 flex-shrink-0 flex items-center justify-end gap-2">
                  <div className="h-1.5 w-12 rounded-full overflow-hidden" style={{ background: BORDER2 }}>
                    <div className="h-full rounded-full" style={{ width: `${s.overall}%`, background: statusColor(s.overall) }} />
                  </div>
                  <span className="text-xs font-black w-8 text-right" style={{ color: statusColor(s.overall) }}>{s.overall}%</span>
                </div>
                <div className="w-20 flex-shrink-0 flex justify-end">
                  <button className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "rgba(13,148,136,0.08)", color: TEAL2 }}>Override</button>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 flex-shrink-0">
            {[{ icon: CheckCircle, color: EMERALD, label: "Present (≥80%)" }, { icon: Clock, color: AMBER, label: "Partial (60–79%)" }, { icon: XCircle, color: RED, label: "Absent (<60%)" }].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <l.icon className="w-3.5 h-3.5" style={{ color: l.color }} />
                <span className="text-xs" style={{ color: MUTED }}>{l.label}</span>
              </div>
            ))}
            <span className="ml-auto text-[10px]" style={{ color: MUTED }}>L1–L6 = Lecture 1 through 6 · Auto-tracked from video watch %</span>
          </div>
        </div>
      </div>
    </div>
  );
}
