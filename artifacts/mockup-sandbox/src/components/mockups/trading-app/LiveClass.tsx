import {
  ChevronLeft, Users, Hand, Mic, MicOff, MessageSquare,
  Send, MoreVertical, TrendingUp, BookOpen, Calendar,
  BarChart2, Award, Volume2, Maximize2, Share2, ThumbsUp
} from "lucide-react";

const NAVY = "#0F172A";
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#DC2626";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const messages = [
  { name: "Priya M.", avatar: "PM", text: "Can you explain the strike price selection again?", time: "2m", highlight: false },
  { name: "Dr. Anand", avatar: "DA", text: "Sure Priya — when IV is high, buy OTM puts for protection. Let me show on chart.", time: "1m", isHost: true, highlight: false },
  { name: "Vikram P.", avatar: "VP", text: "Great explanation sir! 🔥", time: "1m", highlight: false },
  { name: "You", avatar: "RS", text: "What's the ideal delta range for a covered call?", time: "now", highlight: true },
];

const participants = [
  { initials: "RS", color: PRIMARY },
  { initials: "PM", color: "#8B5CF6" },
  { initials: "VP", color: EMERALD },
  { initials: "AK", color: AMBER },
  { initials: "SJ", color: "#EC4899" },
];

export function LiveClass() {
  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']"
      style={{ background: "#0A0F1A", color: "#FFFFFF" }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-[11px] font-medium opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-2 pb-3 flex-shrink-0">
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate text-white">Options Chain Deep Dive</p>
          <p className="text-[11px] opacity-50">Advanced Trading Batch A</p>
        </div>
        <button style={{ color: "rgba(255,255,255,0.4)" }}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Video area */}
      <div className="flex-shrink-0 relative" style={{ background: "#060A12", aspectRatio: "16/9", width: "100%" }}>
        {/* Fake presenter video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Presenter avatar (large) */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-2 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              DA
            </div>
            <p className="text-white text-sm font-medium">Dr. Anand Kumar</p>
            <p className="text-xs opacity-40 mt-0.5">Presenting Screen</p>
          </div>
        </div>

        {/* LIVE badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: RED, boxShadow: "0 0 12px rgba(220,38,38,0.5)" }}>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[11px] font-black tracking-wide">LIVE</span>
        </div>

        {/* Duration */}
        <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <span className="text-white text-[11px] font-medium">47:23</span>
        </div>

        {/* Viewer count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
          <Users className="w-3 h-3" style={{ color: EMERALD }} />
          <span className="text-white text-[11px]">38 watching</span>
        </div>

        {/* Video controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <Volume2 className="w-3.5 h-3.5 text-white" />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <Maximize2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Participants row (picture-in-picture style) */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-1 flex items-end justify-center gap-1.5">
          {participants.map((p) => (
            <div key={p.initials}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ background: p.color, border: "2px solid rgba(0,0,0,0.4)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              {p.initials}
            </div>
          ))}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.08)" }}>
            +33
          </div>
        </div>
      </div>

      {/* Tabs: Chat / Q&A */}
      <div className="flex flex-shrink-0" style={{ background: "#0D1526", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {["Live Chat", "Q&A", "Poll"].map((tab, i) => (
          <button key={tab} className="flex-1 py-2.5 text-xs font-semibold transition-colors"
            style={i === 0 ? { color: "#FFFFFF", borderBottom: `2px solid ${PRIMARY}` } : { color: "rgba(255,255,255,0.3)" }}>
            {tab}
            {tab === "Q&A" && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold"
                style={{ background: PRIMARY, color: "#fff" }}>4</span>
            )}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{ background: "#0D1526" }}>
        {messages.map((msg, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: msg.isHost ? "linear-gradient(135deg, #2563EB, #10B981)" : msg.highlight ? PRIMARY : "rgba(255,255,255,0.12)" }}
            >
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold"
                  style={{ color: msg.isHost ? EMERALD : msg.highlight ? "#93C5FD" : "rgba(255,255,255,0.7)" }}>
                  {msg.name}
                </span>
                {msg.isHost && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(16,185,129,0.15)", color: EMERALD }}>HOST</span>
                )}
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{msg.time}</span>
              </div>
              <div className="rounded-xl px-3 py-2 inline-block max-w-full"
                style={{
                  background: msg.highlight ? "rgba(37,99,235,0.15)" : msg.isHost ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.05)",
                  border: msg.highlight ? "1px solid rgba(37,99,235,0.3)" : msg.isHost ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(255,255,255,0.05)",
                }}>
                <p className="text-[12px] leading-relaxed"
                  style={{ color: msg.highlight ? "#DBEAFE" : "rgba(255,255,255,0.85)" }}>
                  {msg.text}
                </p>
              </div>
            </div>
            {msg.highlight && (
              <button className="flex-shrink-0 mt-5">
                <ThumbsUp className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
              </button>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex items-center gap-2 px-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "rgba(255,255,255,0.25)", animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>Dr. Anand is typing…</span>
        </div>
      </div>

      {/* Action bar: raise hand + mute */}
      <div className="flex-shrink-0 px-4 py-2 flex items-center gap-2"
        style={{ background: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Raise hand */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold flex-shrink-0"
          style={{ background: "rgba(245,158,11,0.12)", color: AMBER, border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <Hand className="w-4 h-4" /> Raise Hand
        </button>

        {/* Mute */}
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(239,68,68,0.1)", color: RED, border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <MicOff className="w-4 h-4" />
        </button>

        {/* Message input */}
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[12px] flex-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Ask a question…
          </span>
          <button style={{ color: PRIMARY }}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2"
        style={{ background: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-around">
          {[
            { icon: TrendingUp, label: "Home" },
            { icon: BookOpen, label: "Courses", active: true },
            { icon: Calendar, label: "Schedule" },
            { icon: BarChart2, label: "Progress" },
            { icon: Award, label: "Profile" },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1"
              style={{ color: item.active ? PRIMARY : "rgba(255,255,255,0.3)" }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
