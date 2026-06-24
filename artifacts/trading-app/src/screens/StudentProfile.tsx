import {
  ChevronLeft, ChevronRight, Edit2, Shield, Bell, LogOut,
  User, Mail, Phone, MapPin, Calendar, TrendingUp, BookOpen,
  BarChart2, Award, Lock, Smartphone, HelpCircle, FileText,
  CheckCircle, Star
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

const badges = [
  { label: "Quiz Champion", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: Star },
  { label: "Full Attendance", color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: CheckCircle },
  { label: "Fast Learner", color: "#2563EB", bg: "rgba(37,99,235,0.1)", icon: TrendingUp },
];

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", sub: "Name, DOB, Address" },
      { icon: Shield, label: "Security & Password", sub: "Change password, 2FA" },
      { icon: Smartphone, label: "Trusted Devices", sub: "2 devices linked" },
    ],
  },
  {
    title: "Learning",
    items: [
      { icon: BookOpen, label: "My Courses", sub: "1 active course" },
      { icon: FileText, label: "My Assignments", sub: "4 submitted" },
      { icon: Award, label: "Certificates", sub: "2 earned" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notification Settings", sub: "Customise alerts" },
      { icon: HelpCircle, label: "Help & Support", sub: "FAQ, live chat" },
    ],
  },
];

export function StudentProfile() {
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

      {/* Navy hero */}
      <div className="px-4 pt-4 pb-8 flex-shrink-0 relative overflow-hidden" style={{ background: NAVY }}>
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5" style={{ background: PRIMARY }} />

        <div className="flex items-start justify-between mb-4">
          <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white font-semibold">My Profile</p>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Edit2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>RS</div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: EMERALD, border: "2px solid #0F172A" }}>
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <p className="text-white font-bold text-lg">Rahul Sharma</p>
          <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>rahul.sharma@gmail.com</p>
          <div className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#60A5FA" }} />
            <span className="text-xs font-medium" style={{ color: "#93C5FD" }}>Advanced Trading Batch A</span>
          </div>
        </div>
      </div>

      {/* Stats strip - overlapping the hero */}
      <div className="flex-shrink-0 mx-4 -mt-5 rounded-2xl p-4 grid grid-cols-3 gap-3 z-10 relative"
        style={{ background: CARD, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", border: `1px solid ${BORDER}` }}>
        {[{ label: "Attendance", val: "91%", color: EMERALD }, { label: "Quiz Avg", val: "88%", color: PRIMARY }, { label: "Rank", val: "#4 / 42", color: AMBER }].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-base font-black" style={{ color: s.color }}>{s.val}</p>
            <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">
        {/* Badges */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Achievements</p>
          <div className="flex gap-2">
            {badges.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl"
                style={{ background: b.bg }}>
                <b.icon className="w-5 h-5" style={{ color: b.color }} />
                <p className="text-[10px] font-semibold text-center leading-tight" style={{ color: b.color }}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal info card */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Personal Info</p>
            <button className="text-xs font-medium" style={{ color: PRIMARY }}>Edit</button>
          </div>
          <div className="space-y-2.5">
            {[
              { icon: Phone, label: "Mobile", value: "+91 98765 43210" },
              { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra" },
              { icon: Calendar, label: "Joined", value: "January 12, 2026" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(37,99,235,0.08)" }}>
                  <f.icon className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: MUTED }}>{f.label}</p>
                  <p className="text-sm font-medium" style={{ color: TEXT }}>{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: MUTED }}>{section.title}</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              {section.items.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
                  style={{ borderBottom: i < section.items.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#F1F5F9" }}>
                    <item.icon className="w-4 h-4" style={{ color: TEXT2 }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: TEXT }}>{item.label}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{item.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: "rgba(239,68,68,0.08)", color: RED, border: `1px solid rgba(239,68,68,0.15)` }}>
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
        <p className="text-center text-[10px] pb-2" style={{ color: MUTED }}>TradeCoach v2.1.0 · TC-STU-001</p>
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
