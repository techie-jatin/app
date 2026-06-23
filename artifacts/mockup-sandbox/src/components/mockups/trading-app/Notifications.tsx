import {
  ChevronLeft, Bell, PlayCircle, HelpCircle, ClipboardList,
  Award, AlertCircle, Users, TrendingUp, BookOpen,
  Calendar, BarChart2, CheckCircle, Settings, Trash2
} from "lucide-react";

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

type NotifItem = {
  id: number;
  icon: React.ElementType;
  iconStyle: { background: string; color: string };
  title: string;
  body: string;
  time: string;
  unread: boolean;
  tag: string;
  tagStyle: { background: string; color: string };
  action?: string;
};

const notifications: NotifItem[] = [
  {
    id: 1, icon: PlayCircle,
    iconStyle: { background: "rgba(220,38,38,0.12)", color: RED },
    title: "Live Class Starting in 15 min",
    body: "Options Chain Deep Dive with Dr. Anand Kumar — Advanced Trading A",
    time: "Just now", unread: true, tag: "LIVE",
    tagStyle: { background: "rgba(220,38,38,0.1)", color: RED },
    action: "Join Now",
  },
  {
    id: 2, icon: HelpCircle,
    iconStyle: { background: "rgba(16,185,129,0.12)", color: EMERALD },
    title: "Quiz 4 Published",
    body: "Risk Management & Position Sizing — 20 min · 15 questions",
    time: "2 hr ago", unread: true, tag: "QUIZ",
    tagStyle: { background: "rgba(16,185,129,0.1)", color: EMERALD },
    action: "Attempt Now",
  },
  {
    id: 3, icon: ClipboardList,
    iconStyle: { background: "rgba(139,92,246,0.12)", color: "#8B5CF6" },
    title: "Assignment 2 Graded",
    body: "You scored 88/100 — Faculty feedback is available",
    time: "5 hr ago", unread: true, tag: "GRADE",
    tagStyle: { background: "rgba(139,92,246,0.1)", color: "#8B5CF6" },
    action: "View Feedback",
  },
  {
    id: 4, icon: AlertCircle,
    iconStyle: { background: "rgba(245,158,11,0.12)", color: AMBER },
    title: "Assignment 3 Due in 2 Days",
    body: "Chart Analysis Exercise — Submit before Jun 25, 11:59 PM",
    time: "Yesterday", unread: false, tag: "REMINDER",
    tagStyle: { background: "rgba(245,158,11,0.08)", color: AMBER },
  },
  {
    id: 5, icon: PlayCircle,
    iconStyle: { background: "rgba(37,99,235,0.12)", color: PRIMARY },
    title: "New Lecture Uploaded",
    body: "Lecture 6 — Advanced Options Strategies added to your batch",
    time: "Jun 21", unread: false, tag: "CONTENT",
    tagStyle: { background: "rgba(37,99,235,0.08)", color: PRIMARY },
  },
  {
    id: 6, icon: Award,
    iconStyle: { background: "rgba(212,175,55,0.15)", color: "#D4AF37" },
    title: "Certificate Issued! 🎉",
    body: "Your Technical Analysis Foundation certificate is ready to download",
    time: "Jun 20", unread: false, tag: "CERT",
    tagStyle: { background: "rgba(212,175,55,0.1)", color: "#D4AF37" },
    action: "Download",
  },
  {
    id: 7, icon: Users,
    iconStyle: { background: "rgba(37,99,235,0.12)", color: PRIMARY },
    title: "Batch Schedule Updated",
    body: "June 24 live session rescheduled to June 25 at 7:00 PM",
    time: "Jun 19", unread: false, tag: "SCHEDULE",
    tagStyle: { background: "rgba(37,99,235,0.08)", color: PRIMARY },
  },
  {
    id: 8, icon: CheckCircle,
    iconStyle: { background: "rgba(16,185,129,0.12)", color: EMERALD },
    title: "Attendance Marked",
    body: "You were marked Present for Lecture 5 — Volume Profile Trading",
    time: "Jun 18", unread: false, tag: "ATTENDANCE",
    tagStyle: { background: "rgba(16,185,129,0.08)", color: EMERALD },
  },
];

const unreadCount = notifications.filter(n => n.unread).length;

export function Notifications() {
  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']"
      style={{ background: BG, color: TEXT }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-base">Notifications</p>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: RED }}>{unreadCount}</span>
            )}
          </div>
          <p className="text-[11px]" style={{ color: "#64748B" }}>{unreadCount} unread</p>
        </div>
        <button style={{ color: "rgba(255,255,255,0.35)" }}>
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Filter chips */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {["All", "Live", "Quiz", "Assignment", "Content"].map((chip, i) => (
          <span key={chip} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
            style={i === 0
              ? { background: PRIMARY, color: "#fff" }
              : { background: BG, color: TEXT2, border: `1px solid ${BORDER}` }}>
            {chip}
          </span>
        ))}
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* Unread section */}
        <div className="px-4 pt-4 pb-1 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>New</p>
          <button className="text-[11px] font-medium" style={{ color: PRIMARY }}>Mark all read</button>
        </div>

        {notifications.filter(n => n.unread).map((n) => (
          <div key={n.id}
            className="mx-4 mb-2.5 rounded-2xl p-4 relative overflow-hidden"
            style={{ background: CARD, border: `1.5px solid rgba(37,99,235,0.15)`, boxShadow: "0 2px 8px rgba(37,99,235,0.06)" }}>
            {/* Unread dot */}
            <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full" style={{ background: PRIMARY }} />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={n.iconStyle}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>{n.title}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={n.tagStyle}>{n.tag}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{n.body}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px]" style={{ color: MUTED }}>{n.time}</span>
                  {n.action && (
                    <button className="text-[11px] font-bold px-3 py-1 rounded-lg text-white"
                      style={{ background: PRIMARY }}>
                      {n.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Earlier section */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Earlier</p>
        </div>

        {notifications.filter(n => !n.unread).map((n) => (
          <div key={n.id}
            className="mx-4 mb-2.5 rounded-2xl p-4 flex items-start gap-3"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={n.iconStyle}>
              <n.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <p className="text-sm font-medium" style={{ color: TEXT }}>{n.title}</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={n.tagStyle}>{n.tag}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{n.body}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[11px]" style={{ color: MUTED }}>{n.time}</span>
                {n.action && (
                  <button className="text-[11px] font-semibold" style={{ color: PRIMARY }}>{n.action}</button>
                )}
              </div>
            </div>
            <button className="flex-shrink-0" style={{ color: MUTED }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Bell, label: "Alerts", active: true }].map((item) => (
            <button key={item.label} className="relative flex flex-col items-center gap-1 px-3 py-1"
              style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              {item.active && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black text-white"
                  style={{ background: RED }}>{unreadCount}</span>
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
