import { ChevronLeft, Mail, Phone, TrendingUp, ArrowRight, Shield } from "lucide-react";

import { useLocation } from "wouter";
const NAVY = "#0F172A";
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const BORDER = "#E2E8F0";

export function ForgotPassword() {
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

      {/* Top nav on NAVY */}
      <div className="px-4 pt-3 pb-6 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-2xl" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-white font-black text-2xl mb-1">Forgot Password?</p>
          <p className="text-sm text-center" style={{ color: "#64748B" }}>
            No worries — we'll send a reset code to your registered mobile number.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 px-5 pt-6 space-y-5">
        {/* Method selector */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Send reset code via</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Phone, label: "Mobile OTP", sub: "SMS to +91 98765 ****10", selected: true },
              { icon: Mail, label: "Email Link", sub: "rahul.****@gmail.com", selected: false },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl p-4 flex flex-col gap-2 cursor-pointer"
                style={{ background: CARD, border: `2px solid ${m.selected ? PRIMARY : BORDER}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: m.selected ? "rgba(37,99,235,0.1)" : "#F1F5F9" }}>
                  <m.icon className="w-4.5 h-4.5" style={{ color: m.selected ? PRIMARY : MUTED }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: m.selected ? TEXT : TEXT2 }}>{m.label}</p>
                  <p className="text-[10px] mt-0.5 leading-snug" style={{ color: MUTED }}>{m.sub}</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center self-end"
                  style={{ borderColor: m.selected ? PRIMARY : BORDER }}>
                  {m.selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: PRIMARY }} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile input */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Mobile Number</label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl px-4 py-3.5" style={{ background: CARD, border: `2px solid ${PRIMARY}` }}>
            <div className="flex items-center gap-2 pr-3" style={{ borderRight: `1px solid ${BORDER}` }}>
              <span className="text-sm">🇮🇳</span>
              <span className="text-sm font-semibold" style={{ color: TEXT }}>+91</span>
            </div>
            <p className="flex-1 text-base font-semibold tracking-wider" style={{ color: TEXT }}>98765 43210</p>
            <div className="w-0.5 h-5 animate-pulse rounded-full" style={{ background: PRIMARY }} />
          </div>
          <p className="text-xs mt-2" style={{ color: MUTED }}>We'll send a 6-digit OTP to this number</p>
        </div>

        {/* Steps preview */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: TEXT }}>How it works</p>
          <div className="space-y-3">
            {[
              { step: "1", text: "Enter your registered mobile number", color: PRIMARY },
              { step: "2", text: "Receive a 6-digit OTP via SMS", color: EMERALD },
              { step: "3", text: "Enter OTP to verify your identity", color: "#8B5CF6" },
              { step: "4", text: "Set your new password securely", color: "#F59E0B" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: s.color }}>{s.step}</div>
                <p className="text-sm" style={{ color: TEXT2 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
          Send OTP <ArrowRight className="w-5 h-5" />
        </button>

        <button className="w-full py-3 text-sm font-medium" style={{ color: MUTED }}>
          Remember your password? <span style={{ color: PRIMARY }}>Sign In</span>
        </button>
      </div>
    </div>
  );
}
