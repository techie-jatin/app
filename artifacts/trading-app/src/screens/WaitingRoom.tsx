import {
  Mic, MicOff, Video, VideoOff, MessageCircle, Users,
  Hand, PhoneOff, Wifi, Settings, Bell, ChevronLeft,
  Send, TrendingUp, BookOpen, Calendar, BarChart2, Award
} from "lucide-react";
import { useLocation } from "wouter";

const NAVY = "#0B1120";
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

const participants = [
  { name: "Vikram P.", avatar: "VP", color: "#8B5CF6", mic: true },
  { name: "Priya M.", avatar: "PM", color: "#EC4899", mic: false },
  { name: "Arjun K.", avatar: "AK", color: PRIMARY, mic: true },
  { name: "Sneha J.", avatar: "SJ", color: EMERALD, mic: false },
  { name: "Mohit S.", avatar: "MS", color: AMBER, mic: true },
  { name: "Riya V.", avatar: "RV", color: "#EF4444", mic: false },
  { name: "+35 more", avatar: "+35", color: SURFACE, mic: false },
];

const chatMessages = [
  { author: "Priya M.", avatar: "PM", color: "#EC4899", text: "Looking forward to today's Options Chain session! 🚀", time: "5:54 PM" },
  { author: "Arjun K.", avatar: "AK", color: PRIMARY, text: "Same! I have a few doubts about Iron Condor from last class.", time: "5:56 PM" },
  { author: "Dr. Anand", avatar: "AK2", color: EMERALD, text: "Starting in a few minutes everyone. Please keep your notebooks ready.", time: "5:58 PM", isFaculty: true },
];

export function WaitingRoom() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: NAVY, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-[11px] text-white opacity-40">9:41</span>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3 text-white opacity-40" />
          <div className="w-4 h-2 border border-white/20 rounded-[2px] relative">
            <div className="absolute inset-[2px] left-[2px] bg-white/50 rounded-[1px] w-2/3" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-2 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Options Chain Deep Dive</p>
          <p className="text-xs" style={{ color: MUTED }}>Dr. Anand Kumar · Advanced Batch A</p>
        </div>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }}>
          <Settings className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Countdown hero */}
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden flex-shrink-0 relative" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: PRIMARY }} />
        </div>

        <div className="flex flex-col items-center py-7 relative z-10">
          {/* Live soon badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: RED }} />
            <span className="text-xs font-bold" style={{ color: RED }}>CLASS STARTS SOON</span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 mb-2">
            {[{ val: "00", label: "HRS" }, { val: "01", label: "MIN" }, { val: "47", label: "SEC" }].map((t, i) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                    style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.08)" }}>
                    {t.val}
                  </div>
                  <span className="text-[9px] font-semibold mt-1" style={{ color: MUTED }}>{t.label}</span>
                </div>
                {i < 2 && <span className="text-2xl font-black mb-4" style={{ color: MUTED }}>:</span>}
              </div>
            ))}
          </div>

          {/* Faculty preview */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>AK</div>
            <div>
              <p className="text-sm font-semibold text-white">Dr. Anand Kumar</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Host · SEBI Reg. Mentor</p>
            </div>
            <div className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.12)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: EMERALD }} />
              <span className="text-[10px] font-bold" style={{ color: EMERALD }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Participants row */}
      <div className="px-4 mb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" style={{ color: MUTED }} />
            <span className="text-xs font-medium" style={{ color: MUTED }}>42 students joined</span>
          </div>
          <button className="text-xs font-medium" style={{ color: PRIMARY }}>View all</button>
        </div>
        <div className="flex items-center gap-2">
          {participants.map((p, i) => (
            <div key={i} className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: p.color === SURFACE ? "rgba(255,255,255,0.08)" : p.color, fontSize: p.avatar.startsWith("+") ? 9 : undefined }}>
                {p.avatar}
              </div>
              {!p.avatar.startsWith("+") && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ background: NAVY, border: `1px solid ${NAVY}` }}>
                  {p.mic
                    ? <Mic className="w-2 h-2" style={{ color: EMERALD }} />
                    : <MicOff className="w-2 h-2" style={{ color: RED }} />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Pre-class Chat</p>
        {chatMessages.map((msg, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
              style={{ background: msg.color }}>{msg.avatar.replace("2", "")}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold" style={{ color: msg.isFaculty ? EMERALD : TEXT2 }}>{msg.author}</span>
                {msg.isFaculty && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.12)", color: EMERALD }}>FACULTY</span>}
                <span className="text-[9px]" style={{ color: MUTED }}>{msg.time}</span>
              </div>
              <div className="rounded-xl rounded-tl-sm px-3 py-2 inline-block max-w-full"
                style={{ background: msg.isFaculty ? "rgba(16,185,129,0.08)" : SURFACE, border: msg.isFaculty ? "1px solid rgba(16,185,129,0.15)" : "none" }}>
                <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: PRIMARY }}>RS</div>
          <span className="flex-1 text-sm" style={{ color: MUTED }}>Type a message…</span>
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: PRIMARY }}>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center justify-around" style={{ background: CARD, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { icon: MicOff, label: "Mute", on: false, color: RED },
          { icon: Video, label: "Camera", on: true, color: TEXT2 },
          { icon: Hand, label: "Raise Hand", on: false, color: AMBER },
          { icon: MessageCircle, label: "Chat", on: true, color: PRIMARY },
          { icon: PhoneOff, label: "Leave", on: false, color: RED, bg: true },
        ].map((ctrl) => (
          <div key={ctrl.label} className="flex flex-col items-center gap-1">
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: ctrl.bg ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)" }}>
              <ctrl.icon className="w-4.5 h-4.5" style={{ color: ctrl.color }} />
            </button>
            <span className="text-[9px] font-medium" style={{ color: MUTED }}>{ctrl.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
