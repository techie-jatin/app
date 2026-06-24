import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, Mic, MicOff,
  Video, VideoOff, MessageCircle, Hand, StopCircle,
  Activity, Shield, PhoneOff, Send, Eye, AlertCircle,
  ChevronDown, Circle, Pin, UserX, Wifi
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
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", active: true, path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const participants = [
  { name: "Dr. Anand Kumar", role: "Faculty", avatar: "AK", color: EMERALD, mic: true, cam: true, hand: false, joined: "5:58 PM" },
  { name: "Rahul Sharma", role: "Student", avatar: "RS", color: PRIMARY, mic: false, cam: false, hand: true, joined: "5:59 PM" },
  { name: "Priya Mehta", role: "Student", avatar: "PM", color: PURPLE, mic: false, cam: false, hand: false, joined: "6:00 PM" },
  { name: "Arjun Kapoor", role: "Student", avatar: "AK2", color: AMBER, mic: true, cam: false, hand: false, joined: "6:01 PM" },
  { name: "Sneha Joshi", role: "Student", avatar: "SJ", color: "#EC4899", mic: false, cam: false, hand: true, joined: "6:02 PM" },
  { name: "Mohit Singh", role: "Student", avatar: "MS", color: RED, mic: false, cam: false, hand: false, joined: "6:03 PM" },
];

const chatMessages = [
  { author: "Rahul S.", avatar: "RS", color: PRIMARY, text: "Sir can you explain the strike selection again?", time: "6:08 PM", flagged: false },
  { author: "Priya M.", avatar: "PM", color: PURPLE, text: "IV crush after expiry is confusing me 🤔", time: "6:09 PM", flagged: false },
  { author: "Arjun K.", avatar: "AK2", color: AMBER, text: "This is the best explanation of Iron Condor I've seen!", time: "6:10 PM", flagged: false },
  { author: "Unknown123", avatar: "UN", color: MUTED, text: "Buy tips for tomorrow?? Call me +91...", time: "6:11 PM", flagged: true },
  { author: "Sneha J.", avatar: "SJ", color: "#EC4899", text: "Super clear, thank you Dr. Anand 🙏", time: "6:12 PM", flagged: false },
];

export function AdminLiveClass() {
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
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-3.5 flex items-center gap-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: RED }} />
            <span className="text-sm font-bold" style={{ color: RED }}>LIVE</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: TEXT }}>Options Chain Deep Dive</p>
            <p className="text-xs" style={{ color: MUTED }}>Advanced Trading Batch A · Dr. Anand Kumar · Started 6:01 PM</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <Wifi className="w-3.5 h-3.5" style={{ color: EMERALD }} />
              <span className="text-xs font-semibold" style={{ color: EMERALD }}>42 watching</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2 }}>
              Duration: 01:12:34
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(239,68,68,0.12)", color: RED, border: "1px solid rgba(239,68,68,0.2)" }}>
              <StopCircle className="w-4 h-4" /> End Class
            </button>
          </div>
        </header>

        {/* 3-column layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video/stream area */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
            {/* Main video tile */}
            <div className="flex-1 rounded-2xl relative overflow-hidden flex items-center justify-center" style={{ background: "#000", border: "2px solid rgba(16,185,129,0.3)", minHeight: 0 }}>
              {/* Simulated video bg */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0a1628,#0d2040)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black"
                    style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>AK</div>
                  <p className="text-white text-lg font-bold">Dr. Anand Kumar</p>
                  <p className="text-sm" style={{ color: MUTED }}>Sharing screen · Options Chain</p>
                </div>
              </div>
              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}>
                  <Circle className="w-2 h-2 fill-white" /> LIVE
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
                <Eye className="w-3 h-3 text-white opacity-70" />
                <span className="text-xs text-white opacity-70">42</span>
              </div>
              {/* Controls overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {[
                  { icon: Mic, label: "Mute All", color: AMBER },
                  { icon: Shield, label: "Lock Room", color: PURPLE },
                  { icon: MessageCircle, label: "Slow Mode", color: PRIMARY },
                ].map((c) => (
                  <button key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(0,0,0,0.7)", color: c.color, border: `1px solid ${c.color}30` }}>
                    <c.icon className="w-3.5 h-3.5" /> {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-3 flex-shrink-0">
              {[
                { label: "Joined", val: "42 / 45", icon: Users, color: PRIMARY },
                { label: "Hands Raised", val: "3", icon: Hand, color: AMBER },
                { label: "Avg Watch Time", val: "68 min", icon: Activity, color: EMERALD },
                { label: "Flagged Msgs", val: "1", icon: AlertCircle, color: RED },
              ].map((s) => (
                <div key={s.label} className="flex-1 rounded-2xl px-4 py-3" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
                  </div>
                  <p className="text-xl font-black" style={{ color: s.val === "1" ? RED : TEXT }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: participants + chat */}
          <div className="w-80 flex flex-col" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
            {/* Panel tabs */}
            <div className="flex" style={{ borderBottom: `1px solid ${BORDER}` }}>
              {[{ label: "Participants", count: 42 }, { label: "Chat", count: 47 }].map((tab, i) => (
                <button key={tab.label} className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2"
                  style={{ borderColor: i === 0 ? PRIMARY : "transparent", color: i === 0 ? PRIMARY : MUTED }}>
                  {tab.label}
                  <span className="px-1.5 py-0.5 rounded-full text-[9px]"
                    style={{ background: i === 0 ? "rgba(37,99,235,0.12)" : SURFACE, color: i === 0 ? PRIMARY : MUTED }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Participants list */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 space-y-1">
                {participants.map((p) => (
                  <div key={p.name} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 group" style={{ background: "transparent" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: p.color === MUTED ? SURFACE : p.color }}>
                      {p.avatar.replace("2", "")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-medium truncate" style={{ color: p.role === "Faculty" ? EMERALD : TEXT2 }}>{p.name}</p>
                        {p.hand && <Hand className="w-3 h-3 flex-shrink-0" style={{ color: AMBER }} />}
                      </div>
                      <p className="text-[9px]" style={{ color: MUTED }}>{p.role} · {p.joined}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.mic ? <Mic className="w-3 h-3" style={{ color: EMERALD }} /> : <MicOff className="w-3 h-3" style={{ color: MUTED }} />}
                      {p.cam ? <Video className="w-3 h-3" style={{ color: EMERALD }} /> : <VideoOff className="w-3 h-3" style={{ color: MUTED }} />}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: RED }}>
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-center text-[10px] py-2" style={{ color: MUTED }}>+ 36 more students</p>
              </div>

              {/* Chat section */}
              <div style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="p-3 space-y-2">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="rounded-xl p-2.5 relative" style={{ background: msg.flagged ? "rgba(239,68,68,0.06)" : SURFACE, border: msg.flagged ? "1px solid rgba(239,68,68,0.2)" : `1px solid ${BORDER2}` }}>
                      {msg.flagged && (
                        <div className="flex items-center gap-1 mb-1.5">
                          <AlertCircle className="w-3 h-3" style={{ color: RED }} />
                          <span className="text-[9px] font-bold" style={{ color: RED }}>FLAGGED · SPAM DETECTED</span>
                          <button className="ml-auto text-[9px] font-bold" style={{ color: RED }}>Remove</button>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0" style={{ background: msg.color }}>{msg.avatar.replace("2", "")}</div>
                        <span className="text-[10px] font-semibold" style={{ color: msg.color }}>{msg.author}</span>
                        <span className="text-[9px] ml-auto" style={{ color: MUTED }}>{msg.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: TEXT2, opacity: msg.flagged ? 0.6 : 1 }}>{msg.text}</p>
                      {!msg.flagged && (
                        <div className="flex gap-2 mt-1.5">
                          <button className="text-[9px]" style={{ color: MUTED }}>Pin</button>
                          <button className="text-[9px]" style={{ color: MUTED }}>Remove</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Admin chat input */}
            <div className="p-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <span className="text-xs flex-1" style={{ color: MUTED }}>Broadcast to all students…</span>
                <button className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ background: PRIMARY }}>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
