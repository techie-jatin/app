import {
  ChevronLeft, ChevronRight, Bell, Lock, Smartphone,
  Moon, Globe, Download, Wifi, Shield, LogOut, Trash2,
  HelpCircle, Star, Share2, FileText, ChevronDown,
  TrendingUp, BookOpen, Calendar, BarChart2, Award,
  Video, Volume2, PlayCircle
} from "lucide-react";
import { useLocation } from "wouter";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const BORDER = "#E2E8F0";

type Toggle = { on: boolean };
const toggles: Record<string, boolean> = {
  liveReminders: true,
  quizReminders: true,
  assignmentAlerts: true,
  marketUpdates: false,
  darkMode: false,
  autoDownload: false,
  hdVideo: true,
};

function Toggle({ on }: Toggle) {
  return (
    <div className="w-11 h-6 rounded-full relative flex-shrink-0 transition-all"
      style={{ background: on ? PRIMARY : "#CBD5E1" }}>
      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm"
        style={{ left: on ? "calc(100% - 22px)" : "2px" }} />
    </div>
  );
}

const sections = [
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Live Class Reminders", sub: "30 min before class", toggle: "liveReminders" },
      { label: "Quiz & Assignment Alerts", sub: "When new content is available", toggle: "quizReminders" },
      { label: "Assignment Deadlines", sub: "24h before due date", toggle: "assignmentAlerts" },
      { label: "Market Update Alerts", sub: "Daily market summary at 8 AM", toggle: "marketUpdates" },
    ],
  },
  {
    title: "Playback",
    icon: PlayCircle,
    items: [
      { label: "Video Quality", sub: "HD 1080p", arrow: true },
      { label: "Playback Speed", sub: "1.25×", arrow: true },
      { label: "Auto-play Next Lecture", sub: "Plays next after 3 seconds", toggle: "hdVideo" },
      { label: "Download Quality", sub: "720p · saves storage", arrow: true },
    ],
  },
  {
    title: "Downloads",
    icon: Download,
    items: [
      { label: "Download over Wi-Fi only", sub: "Avoid mobile data usage", toggle: "autoDownload" },
      { label: "Storage Used", sub: "1.2 GB of 5 GB used", arrow: true },
      { label: "Clear Cache", sub: "Free up temporary files", action: "destructive" },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    items: [
      { label: "Change Password", sub: "Last changed 45 days ago", arrow: true },
      { label: "Two-Factor Authentication", sub: "SMS OTP enabled", toggle: "liveReminders" },
      { label: "Trusted Devices", sub: "2 devices linked", arrow: true },
      { label: "Privacy Policy", sub: "How we use your data", arrow: true },
    ],
  },
  {
    title: "App",
    icon: Smartphone,
    items: [
      { label: "Language", sub: "English", arrow: true },
      { label: "App Theme", sub: "Light", arrow: true },
      { label: "Rate TradeCoach", sub: "Share your feedback on Play Store", action: "rate" },
      { label: "Share with Friends", sub: "Refer & earn ₹1,000", action: "share" },
      { label: "Terms & Conditions", sub: "View full T&C", arrow: true },
    ],
  },
];

const iconColor: Record<string, string> = {
  Notifications: "#EF4444",
  Playback: PRIMARY,
  Downloads: "#8B5CF6",
  "Privacy & Security": "#10B981",
  App: "#F59E0B",
};

export function AppSettings() {
  const [, navigate] = useLocation();
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
      <div className="px-4 pt-3 pb-4 flex items-center gap-3 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <p className="text-white font-semibold text-base flex-1">Settings</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">
        {/* Profile mini-card */}
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>RS</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Rahul Sharma</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Advanced Trading Batch A</p>
            <p className="text-xs" style={{ color: PRIMARY }}>Edit Profile →</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: EMERALD }}>Active</p>
            <p className="text-[10px]" style={{ color: MUTED }}>Expires Apr 2026</p>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-5 h-5 rounded flex items-center justify-center"
                style={{ background: `${iconColor[section.title]}18` }}>
                <section.icon className="w-3 h-3" style={{ color: iconColor[section.title] }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>{section.title}</p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              {section.items.map((item: any, i) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < section.items.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: item.action === "destructive" ? RED : TEXT }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{item.sub}</p>
                  </div>
                  {item.toggle !== undefined && <Toggle on={toggles[item.toggle] ?? false} />}
                  {item.arrow && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />}
                  {item.action === "rate" && <Star className="w-4 h-4 flex-shrink-0" style={{ color: AMBER }} fill={AMBER} />}
                  {item.action === "share" && <Share2 className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} />}
                  {item.action === "destructive" && <Trash2 className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: "rgba(239,68,68,0.07)", color: RED, border: "1px solid rgba(239,68,68,0.15)" }}>
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
        <p className="text-center text-[10px] pb-4" style={{ color: MUTED }}>TradeCoach v2.1.0 · Build 210623</p>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", path: "/home" }, { icon: BookOpen, label: "Courses", path: "/course" }, { icon: Calendar, label: "Schedule", path: "/schedule" }, { icon: BarChart2, label: "Progress", path: "/progress" }, { icon: Award, label: "Profile", path: "/profile", active: true }].map((item) => (
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
