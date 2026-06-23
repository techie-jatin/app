import {
  ChevronLeft, CheckCircle, XCircle, Clock, TrendingUp,
  BookOpen, Calendar, BarChart2, Award, AlertCircle, ChevronRight
} from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const attendanceData = [72, 78, 85, 88, 90, 91];

const calendarDays = [
  { day: 1, status: null }, { day: 2, status: null }, { day: 3, status: "present" },
  { day: 4, status: "present" }, { day: 5, status: "present" }, { day: 6, status: null },
  { day: 7, status: null }, { day: 8, status: "present" }, { day: 9, status: "absent" },
  { day: 10, status: "present" }, { day: 11, status: "present" }, { day: 12, status: "present" },
  { day: 13, status: null }, { day: 14, status: null }, { day: 15, status: "present" },
  { day: 16, status: "present" }, { day: 17, status: "absent" }, { day: 18, status: "present" },
  { day: 19, status: "present" }, { day: 20, status: null }, { day: 21, status: null },
  { day: 22, status: "present" }, { day: 23, status: "present" }, { day: 24, status: null },
  { day: 25, status: null }, { day: 26, status: null }, { day: 27, status: null },
  { day: 28, status: null }, { day: 29, status: null }, { day: 30, status: null },
];

const recentLectures = [
  { title: "Lecture 5 — Volume Profile", date: "Jun 22", watched: 100, status: "present" },
  { title: "Lecture 4 — Support & Resistance", date: "Jun 17", watched: 65, status: "absent" },
  { title: "Lecture 3 — Candlestick Patterns", date: "Jun 12", watched: 95, status: "present" },
  { title: "Lecture 2 — Market Structure", date: "Jun 10", watched: 100, status: "present" },
  { title: "Lecture 1 — Introduction", date: "Jun 8", watched: 100, status: "present" },
];

export function AttendanceView() {
  return (
    <div className="w-[390px] h-[844px] bg-slate-950 font-['Inter'] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-slate-400 text-[11px] font-medium">9:41</span>
        <div className="w-4 h-2 border border-slate-500 rounded-[2px] relative"><div className="absolute inset-0.5 left-0.5 bg-slate-400 rounded-[1px] w-2/3" /></div>
      </div>

      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0 border-b border-slate-800">
        <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <p className="text-white font-semibold text-base">My Attendance</p>
          <p className="text-slate-500 text-xs">Advanced Trading Batch A</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-20">
        {/* Big stat */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs mb-1">Overall Attendance</p>
              <p className="text-5xl font-black text-emerald-400">91%</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <p className="text-emerald-400 text-xs font-medium">Above minimum (80%)</p>
              </div>
            </div>
            {/* Circular progress (CSS-based) */}
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="8" fill="none" />
                <circle cx="40" cy="40" r="32" stroke="#10b981" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.91)}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-emerald-400 text-sm font-bold">91%</span>
              </div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Present", value: "20", color: "text-emerald-400" },
              { label: "Absent", value: "2", color: "text-red-400" },
              { label: "Total", value: "22", color: "text-slate-400" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-slate-800/60 rounded-xl py-2.5">
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-slate-500 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-white font-semibold text-sm mb-3">Monthly Trend</p>
          <div className="flex items-end gap-2 h-20">
            {attendanceData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${(val / 100) * 64}px`,
                    background: i === months.length - 1
                      ? "linear-gradient(to top, #f59e0b, #fb923c)"
                      : i === months.length - 2
                      ? "#10b981"
                      : "#334155",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {months.map((m, i) => (
              <p key={i} className={`flex-1 text-center text-[9px] ${i === months.length - 1 ? "text-amber-400 font-bold" : "text-slate-600"}`}>{m}</p>
            ))}
          </div>
        </div>

        {/* June calendar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold text-sm">June 2026</p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <p key={d} className="text-slate-600 text-[10px] font-medium text-center">{d}</p>
            ))}
          </div>

          {/* Days grid — June 1 2026 is a Monday, so 1 offset */}
          <div className="grid grid-cols-7 gap-1">
            <div /> {/* Sunday offset */}
            {calendarDays.map((d) => (
              <div
                key={d.day}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium ${
                  d.day === 23
                    ? "bg-amber-500 text-white"
                    : d.status === "present"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : d.status === "absent"
                    ? "bg-red-500/20 text-red-400"
                    : "text-slate-600"
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            {[
              { label: "Present", color: "bg-emerald-500/30" },
              { label: "Absent", color: "bg-red-500/30" },
              { label: "Today", color: "bg-amber-500" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${l.color}`} />
                <span className="text-slate-500 text-[10px]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lecture log */}
        <div>
          <p className="text-white font-semibold text-sm mb-3">Lecture History</p>
          <div className="space-y-2">
            {recentLectures.map((l, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
                {l.status === "present" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm truncate">{l.title}</p>
                  <p className="text-slate-600 text-xs">{l.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-semibold ${l.watched >= 80 ? "text-emerald-400" : "text-red-400"}`}>
                    {l.watched}% watched
                  </p>
                  <p className="text-slate-600 text-[10px]">Min: 80%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rule note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed">
            Attendance is auto-marked <span className="font-semibold">Present</span> when you watch ≥ 80% of a lecture. Watching less than 80% marks you <span className="font-semibold">Absent</span>.
          </p>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-[390px] bg-slate-900/95 backdrop-blur border-t border-slate-800 px-2 pb-4 pt-2">
        <div className="flex items-center justify-around">
          {[
            { icon: TrendingUp, label: "Home" },
            { icon: BookOpen, label: "Courses" },
            { icon: Calendar, label: "Schedule" },
            { icon: BarChart2, label: "Progress", active: true },
            { icon: Award, label: "Profile" },
          ].map((item) => (
            <button key={item.label} className={`flex flex-col items-center gap-1 px-3 py-1 ${item.active ? "text-amber-400" : "text-slate-600"}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
