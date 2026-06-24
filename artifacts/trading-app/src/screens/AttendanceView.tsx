import { ChevronLeft, CheckCircle, XCircle, Clock, TrendingUp, BookOpen, Calendar, BarChart2, Award, AlertCircle, ChevronRight } from "lucide-react";

import { useLocation } from "wouter";
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#EF4444";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const attendanceData = [72, 78, 85, 88, 90, 91];

const calendarDays = [
  { day: 1, s: null }, { day: 2, s: null }, { day: 3, s: "p" }, { day: 4, s: "p" }, { day: 5, s: "p" },
  { day: 6, s: null }, { day: 7, s: null }, { day: 8, s: "p" }, { day: 9, s: "a" }, { day: 10, s: "p" },
  { day: 11, s: "p" }, { day: 12, s: "p" }, { day: 13, s: null }, { day: 14, s: null }, { day: 15, s: "p" },
  { day: 16, s: "p" }, { day: 17, s: "a" }, { day: 18, s: "p" }, { day: 19, s: "p" }, { day: 20, s: null },
  { day: 21, s: null }, { day: 22, s: "p" }, { day: 23, s: "today" }, { day: 24, s: null }, { day: 25, s: null },
  { day: 26, s: null }, { day: 27, s: null }, { day: 28, s: null }, { day: 29, s: null }, { day: 30, s: null },
];

const lectures = [
  { title: "Lecture 5 — Volume Profile", date: "Jun 22", watched: 100, status: "p" },
  { title: "Lecture 4 — Support & Resistance", date: "Jun 17", watched: 65, status: "a" },
  { title: "Lecture 3 — Candlestick Patterns", date: "Jun 12", watched: 95, status: "p" },
  { title: "Lecture 2 — Market Structure", date: "Jun 10", watched: 100, status: "p" },
  { title: "Lecture 1 — Introduction", date: "Jun 8", watched: 100, status: "p" },
];

export function AttendanceView() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status + header navy */}
      <div style={{ background: NAVY }}>
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[11px] text-white opacity-60">9:41</span>
          <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
            <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <p className="text-white font-semibold text-base">My Attendance</p>
            <p className="text-xs" style={{ color: "#64748B" }}>Advanced Trading Batch A</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {/* Big stat card */}
        <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs mb-1" style={{ color: MUTED }}>Overall Attendance</p>
              <p className="text-5xl font-black" style={{ color: EMERALD }}>91%</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                <p className="text-xs font-medium" style={{ color: EMERALD }}>Above minimum (80%)</p>
              </div>
            </div>
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                <circle cx="40" cy="40" r="32" stroke={EMERALD} strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.91)}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: EMERALD }}>91%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ label: "Present", value: "20", color: EMERALD, bg: "rgba(16,185,129,0.08)" }, { label: "Absent", value: "2", color: RED, bg: "rgba(239,68,68,0.08)" }, { label: "Total", value: "22", color: TEXT2, bg: "#F8FAFC" }].map(s => (
              <div key={s.label} className="text-center rounded-xl py-2.5" style={{ background: s.bg, border: `1px solid ${BORDER}` }}>
                <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>Monthly Trend</p>
          <div className="flex items-end gap-2 h-20">
            {attendanceData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg"
                  style={{ height: `${(val / 100) * 64}px`, background: i === months.length - 1 ? PRIMARY : i === months.length - 2 ? EMERALD : "#E2E8F0" }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {months.map((m, i) => (
              <p key={i} className="flex-1 text-center text-[9px]" style={{ color: i === months.length - 1 ? PRIMARY : MUTED, fontWeight: i === months.length - 1 ? 700 : 400 }}>{m}</p>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm" style={{ color: TEXT }}>June 2026</p>
            <div className="flex items-center gap-1">
              {[ChevronLeft, ChevronRight].map((Icon, i) => (
                <button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                  <Icon className="w-4 h-4" style={{ color: MUTED }} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <p key={d} className="text-[10px] font-medium text-center" style={{ color: MUTED }}>{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            <div />
            {calendarDays.map((d) => (
              <div key={d.day} className="aspect-square flex items-center justify-center rounded-lg text-xs font-medium"
                style={d.s === "today" ? { background: PRIMARY, color: "#fff" } :
                  d.s === "p" ? { background: "rgba(16,185,129,0.12)", color: EMERALD } :
                  d.s === "a" ? { background: "rgba(239,68,68,0.12)", color: RED } :
                  { color: MUTED }}>
                {d.day}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 justify-center">
            {[{ label: "Present", style: { background: "rgba(16,185,129,0.2)", borderRadius: "3px" } }, { label: "Absent", style: { background: "rgba(239,68,68,0.2)", borderRadius: "3px" } }, { label: "Today", style: { background: PRIMARY, borderRadius: "3px" } }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3" style={l.style} />
                <span className="text-[10px]" style={{ color: MUTED }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lecture log */}
        <div>
          <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>Lecture History</p>
          <div className="space-y-2">
            {lectures.map((l, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                {l.status === "p" ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} /> : <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: TEXT }}>{l.title}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{l.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold" style={{ color: l.watched >= 80 ? EMERALD : RED }}>{l.watched}% watched</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>Min: 80%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: PRIMARY }} />
          <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
            Attendance is auto-marked <strong>Present</strong> when you watch ≥ 80% of a lecture.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[390px] px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", path: "/home" }, { icon: BookOpen, label: "Courses", path: "/course" }, { icon: Calendar, label: "Schedule", path: "/schedule" }, { icon: BarChart2, label: "Progress", path: "/progress", active: true }, { icon: Award, label: "Profile", path: "/profile" }].map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
