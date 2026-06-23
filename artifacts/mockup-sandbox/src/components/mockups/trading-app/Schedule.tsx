import {
  ChevronLeft, ChevronRight, PlayCircle, HelpCircle,
  ClipboardList, Clock, Users, TrendingUp, BookOpen,
  Calendar, BarChart2, Award, Bell
} from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#DC2626";
const AMBER = "#F59E0B";
const PURPLE = "#8B5CF6";
const BORDER = "#E2E8F0";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [23, 24, 25, 26, 27, 28, 29];
const todayIdx = 0;

type Event = {
  time: string;
  title: string;
  sub: string;
  type: "live" | "lecture" | "quiz" | "assignment";
  duration: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  live?: boolean;
};

const schedule: Record<number, Event[]> = {
  0: [
    { time: "06:00 PM", title: "Live: Options Chain Deep Dive", sub: "Dr. Anand Kumar · Adv. Batch A", type: "live", duration: "90 min", color: RED, bg: "rgba(220,38,38,0.08)", icon: PlayCircle, live: true },
    { time: "08:00 PM", title: "Lecture 6 — Advanced Strategies", sub: "Watch anytime · Uploaded today", type: "lecture", duration: "1h 35m", color: PRIMARY, bg: "rgba(37,99,235,0.07)", icon: PlayCircle },
  ],
  1: [
    { time: "10:00 AM", title: "Quiz 4 — Risk Management", sub: "Attempt before Jun 28", type: "quiz", duration: "20 min", color: EMERALD, bg: "rgba(16,185,129,0.07)", icon: HelpCircle },
    { time: "07:00 PM", title: "Live: Technical Review Session", sub: "Prof. Gupta · Fundamentals B", type: "live", duration: "60 min", color: RED, bg: "rgba(220,38,38,0.08)", icon: PlayCircle },
  ],
  2: [
    { time: "All day", title: "Assignment 3 Submission", sub: "Chart Analysis · Due midnight", type: "assignment", duration: "Due today", color: AMBER, bg: "rgba(245,158,11,0.07)", icon: ClipboardList },
  ],
  3: [
    { time: "05:30 PM", title: "Live: Derivatives Workshop", sub: "Dr. Anand Kumar · Adv. Batch A", type: "live", duration: "120 min", color: RED, bg: "rgba(220,38,38,0.08)", icon: PlayCircle },
  ],
  4: [
    { time: "06:00 PM", title: "Live: Weekly Q&A Session", sub: "All faculty · Open for all batches", type: "live", duration: "60 min", color: RED, bg: "rgba(220,38,38,0.08)", icon: PlayCircle },
  ],
  5: [
    { time: "11:00 AM", title: "Mock Trading Review", sub: "Dr. Anand Kumar · Adv. Batch A", type: "live", duration: "90 min", color: PURPLE, bg: "rgba(139,92,246,0.07)", icon: Users },
    { time: "03:00 PM", title: "Quiz 5 — Options Greeks", sub: "Available from today", type: "quiz", duration: "25 min", color: EMERALD, bg: "rgba(16,185,129,0.07)", icon: HelpCircle },
  ],
  6: [],
};

const typeLabel: Record<string, string> = {
  live: "LIVE CLASS",
  lecture: "LECTURE",
  quiz: "QUIZ",
  assignment: "DEADLINE",
};

export function Schedule() {
  const todayEvents = schedule[todayIdx];

  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-3 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-semibold text-base">Schedule</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Week of Jun 23 – 29</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Day picker */}
        <div className="flex gap-1">
          {days.map((d, i) => (
            <button key={d} className="flex-1 flex flex-col items-center py-2 rounded-xl gap-1"
              style={i === todayIdx
                ? { background: PRIMARY }
                : schedule[i].length > 0
                ? { background: "rgba(255,255,255,0.06)" }
                : { background: "transparent" }}>
              <span className="text-[9px] font-semibold"
                style={{ color: i === todayIdx ? "rgba(255,255,255,0.7)" : MUTED }}>{d}</span>
              <span className="text-sm font-bold"
                style={{ color: i === todayIdx ? "#fff" : schedule[i].length > 0 ? "#E2E8F0" : "#374151" }}>
                {dates[i]}
              </span>
              {schedule[i].length > 0 && i !== todayIdx && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: schedule[i][0].color }} />
              )}
              {i === todayIdx && <span className="w-1.5 h-1.5 rounded-full bg-white/50" />}
            </button>
          ))}
        </div>
      </div>

      {/* Today label */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
        <p className="text-sm font-semibold" style={{ color: TEXT }}>
          Monday, Jun 23 <span className="ml-1 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>Today</span>
        </p>
        <p className="text-xs" style={{ color: MUTED }}>{todayEvents.length} event{todayEvents.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3">
        {todayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <Calendar className="w-10 h-10" style={{ color: BORDER }} />
            <p className="text-sm" style={{ color: MUTED }}>No events scheduled</p>
          </div>
        ) : (
          todayEvents.map((ev, i) => (
            <div key={i} className="rounded-2xl p-4 flex gap-3" style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${ev.color}` }}>
              {/* Time col */}
              <div className="flex-shrink-0 w-16 text-right">
                <p className="text-xs font-bold" style={{ color: ev.color }}>{ev.time}</p>
                <div className="mt-2 flex items-center gap-1 justify-end">
                  <Clock className="w-2.5 h-2.5" style={{ color: MUTED }} />
                  <p className="text-[10px]" style={{ color: MUTED }}>{ev.duration}</p>
                </div>
              </div>

              <div className="w-px self-stretch" style={{ background: BORDER }} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ev.bg }}>
                    <ev.icon className="w-3.5 h-3.5" style={{ color: ev.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      {ev.live && (
                        <span className="flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(220,38,38,0.12)", color: RED }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: RED }} />
                          LIVE
                        </span>
                      )}
                      {!ev.live && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: ev.bg, color: ev.color }}>{typeLabel[ev.type]}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold leading-snug" style={{ color: TEXT }}>{ev.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{ev.sub}</p>
                  </div>
                </div>
                {ev.type === "live" && (
                  <button className="mt-2 text-xs font-bold px-4 py-1.5 rounded-xl text-white" style={{ background: ev.live ? RED : PRIMARY }}>
                    {ev.live ? "Join Now" : "Set Reminder"}
                  </button>
                )}
                {ev.type === "quiz" && (
                  <button className="mt-2 text-xs font-bold px-4 py-1.5 rounded-xl text-white" style={{ background: EMERALD }}>
                    Attempt Quiz
                  </button>
                )}
                {ev.type === "assignment" && (
                  <button className="mt-2 text-xs font-bold px-4 py-1.5 rounded-xl text-white" style={{ background: AMBER }}>
                    Submit Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        {/* Upcoming this week */}
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Upcoming This Week</p>
          <div className="space-y-2">
            {[1, 2, 3].flatMap(dayIdx =>
              schedule[dayIdx].map((ev, j) => (
                <div key={`${dayIdx}-${j}`} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate font-medium" style={{ color: TEXT }}>{ev.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{days[dayIdx]}, Jun {dates[dayIdx]} · {ev.time}</p>
                  </div>
                  <Bell className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule", active: true }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
