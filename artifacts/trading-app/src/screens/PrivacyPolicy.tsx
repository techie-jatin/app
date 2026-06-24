import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2, Award,
  Shield, Lock, Eye, Database, Bell, UserX, ChevronRight, ChevronDown
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
const BORDER = "#E2E8F0";

const sections = [
  {
    icon: Database, color: PRIMARY,
    title: "Information We Collect",
    content: "We collect information you provide during registration: name, email, mobile number, date of birth, gender, and address. We also automatically collect usage data, device information, and video watch progress to power attendance tracking.",
  },
  {
    icon: Eye, color: EMERALD,
    title: "How We Use Your Data",
    content: "Your data is used to: (1) manage your student account, (2) track attendance via lecture watch percentage, (3) deliver course content and notifications, (4) generate reports for your batch faculty and admin.",
  },
  {
    icon: Lock, color: "#8B5CF6",
    title: "Data Security",
    content: "We implement Firebase Authentication, SSL encryption, single-device login enforcement, and screen recording detection. Your video URLs are protected — YouTube links are Unlisted and never exposed to the client.",
  },
  {
    icon: Bell, color: "#F59E0B",
    title: "Push Notifications",
    content: "We use Firebase Cloud Messaging (FCM) to send notifications about lectures, quizzes, assignments, and live classes. You can manage notification preferences in Settings → Notifications.",
  },
  {
    icon: Shield, color: EMERALD,
    title: "Data Sharing",
    content: "We do NOT sell your personal data. Data is shared only with: (1) your batch faculty for academic purposes, (2) the academy admin for enrollment and management, (3) Firebase/Google as our cloud provider.",
  },
  {
    icon: UserX, color: "#EF4444",
    title: "Your Rights",
    content: "You have the right to: access your personal data, request corrections, request deletion (see Account Deletion in Settings), and withdraw consent. Contact us at privacy@tradecoach.in for any data requests.",
  },
];

export function PrivacyPolicy() {
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
      <div className="px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <p className="text-white font-semibold text-base">Privacy Policy</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Last updated: June 1, 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <Shield className="w-5 h-5 flex-shrink-0" style={{ color: "#93C5FD" }} />
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            TradeCoach Academy is committed to protecting your privacy and personal data.
          </p>
        </div>
      </div>

      {/* Jump to section */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {["Data", "Usage", "Security", "Notifications", "Sharing", "Rights"].map((s, i) => (
          <button key={s} className="px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0"
            style={i === 0 ? { background: PRIMARY, color: "#fff" } : { background: BG, color: MUTED, border: `1px solid ${BORDER}` }}>
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-20">
        {sections.map((section, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-3 p-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${section.color}12` }}>
                <section.icon className="w-4.5 h-4.5" style={{ color: section.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: TEXT }}>{section.title}</p>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            </div>
            <div className="px-4 pb-4 pt-0">
              <div className="h-px mb-3" style={{ background: BORDER }} />
              <p className="text-[11px] leading-relaxed" style={{ color: TEXT2 }}>{section.content}</p>
            </div>
          </div>
        ))}

        {/* Terms link */}
        <button className="w-full flex items-center justify-between p-4 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.08)" }}>
              <BookOpen className="w-4 h-4" style={{ color: PRIMARY }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: TEXT }}>Terms & Conditions</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Last updated: June 1, 2025</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: MUTED }} />
        </button>

        {/* Contact */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-2" style={{ color: TEXT }}>Contact Us</p>
          <p className="text-[11px] mb-3" style={{ color: MUTED }}>For any privacy concerns or data requests, reach us at:</p>
          <div className="space-y-2">
            {[
              { label: "Email", value: "privacy@tradecoach.in" },
              { label: "Address", value: "TradeCoach Academy, Mumbai, Maharashtra 400001" },
            ].map((c) => (
              <div key={c.label} className="flex gap-2">
                <span className="text-[10px] font-bold w-14 flex-shrink-0" style={{ color: MUTED }}>{c.label}</span>
                <span className="text-[10px]" style={{ color: TEXT2 }}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] py-2" style={{ color: MUTED }}>
          © 2025 TradeCoach Academy · All rights reserved · v1.0
        </p>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", path: "/home" }, { icon: BookOpen, label: "Courses", path: "/course" }, { icon: Calendar, label: "Schedule", path: "/schedule" }, { icon: BarChart2, label: "Progress", path: "/progress" }, { icon: Award, label: "Profile", path: "/profile", active: true }].map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: (item as any).active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
