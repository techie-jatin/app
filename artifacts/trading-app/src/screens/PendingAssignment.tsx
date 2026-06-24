import { TrendingUp, Clock, Bell, CheckCircle, ChevronRight, Users, BookOpen, LogOut, RefreshCw, MessageCircle, AlertCircle } from "lucide-react";

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
const BORDER = "#E2E8F0";

const steps = [
  { label: "Account Created", desc: "Email verified successfully", done: true },
  { label: "Profile Submitted", desc: "Admin reviewing your details", done: true },
  { label: "Batch Assignment", desc: "Waiting for admin to assign you", done: false, active: true },
  { label: "Course Access", desc: "Unlocked after batch assignment", done: false },
];

const faqs = [
  { q: "How long does assignment take?", a: "Usually within 24–48 hours of registration." },
  { q: "What happens after assignment?", a: "You'll receive a notification and full course access." },
  { q: "Can I contact support?", a: "Yes — tap Contact Support below to reach our team." },
];

export function PendingAssignment() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-60">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Navy top bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-base text-white">Trade<span style={{ color: "#10B981" }}>Coach</span></span>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4 pb-20">
        {/* Hero card */}
        <div className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(37,99,235,0.08)", border: `2px solid rgba(37,99,235,0.15)` }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: AMBER }}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: TEXT }}>Pending Batch Assignment</h2>
          <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
            Hi <span className="font-semibold" style={{ color: TEXT }}>Rahul!</span> Your account is active. Our admin will assign you to a batch shortly.
          </p>
          <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: "rgba(37,99,235,0.08)", color: PRIMARY, border: `1px solid rgba(37,99,235,0.15)` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PRIMARY }} />
            Registered on Jun 23, 2026
          </div>
        </div>

        {/* Progress steps */}
        <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: TEXT }}>Onboarding Progress</h3>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={step.done ? { background: EMERALD } : step.active ? { background: "rgba(37,99,235,0.1)", border: `2px solid rgba(37,99,235,0.3)` } : { background: BG, border: `2px solid ${BORDER}` }}>
                  {step.done ? <CheckCircle className="w-4 h-4 text-white" /> :
                    step.active ? <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: PRIMARY }} /> :
                    <span className="w-2 h-2 rounded-full" style={{ background: BORDER }} />}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 mt-1 mb-1 min-h-[24px]" style={{ background: step.done ? EMERALD : BORDER }} />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold" style={{ color: step.done || step.active ? TEXT : MUTED }}>{step.label}</p>
                <p className="text-xs mt-0.5" style={{ color: step.done ? EMERALD : step.active ? TEXT2 : MUTED }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What unlocks */}
        <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT2 }}>What unlocks after assignment</h3>
          <div className="space-y-3">
            {[{ icon: BookOpen, label: "Recorded Lectures", sub: "Watch at your own pace" }, { icon: Users, label: "Live Classes", sub: "Join batch sessions" }, { icon: Bell, label: "Notifications", sub: "Quizzes, assignments & more" }].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.08)", border: `1px solid rgba(37,99,235,0.12)` }}>
                  <item.icon className="w-4 h-4" style={{ color: PRIMARY }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: TEXT }}>{item.label}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: TEXT }}>Frequently Asked</h3>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i}>
                <p className="text-sm font-semibold flex items-center justify-between" style={{ color: TEXT }}>
                  {f.q}<ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: PRIMARY }} />
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: TEXT2 }}>{f.a}</p>
                {i < faqs.length - 1 && <div className="mt-3 h-px" style={{ background: BORDER }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom */}
      <div className="flex-shrink-0 px-4 py-4 flex gap-3" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold" style={{ background: BG, color: TEXT2, border: `1px solid ${BORDER}` }}>
          <RefreshCw className="w-4 h-4" /> Refresh Status
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white" style={{ background: PRIMARY }}>
          <MessageCircle className="w-4 h-4" /> Contact Support
        </button>
      </div>
    </div>
  );
}
