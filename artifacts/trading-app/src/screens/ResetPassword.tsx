import { ChevronLeft, Eye, EyeOff, CheckCircle, X, Lock, ArrowRight } from "lucide-react";

import { useLocation } from "wouter";
const NAVY = "#0F172A";
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#EF4444";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const pwRules = [
  { label: "At least 8 characters", met: true },
  { label: "One uppercase letter (A-Z)", met: true },
  { label: "One number (0–9)", met: true },
  { label: "One special character (!@#$…)", met: false },
];

const strength = 3; // out of 4
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
const strengthColors = [RED, AMBER, PRIMARY, EMERALD];

export function ResetPassword() {
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

      {/* Navy header */}
      <div className="px-4 pt-3 pb-7 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-2xl" style={{ background: "linear-gradient(135deg,#10B981,#2563EB)" }}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <p className="text-white font-black text-2xl mb-1">New Password</p>
          <p className="text-sm" style={{ color: "#64748B" }}>OTP verified ✓ — set a strong password for your account</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-8 space-y-5">

        {/* Verified banner */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: EMERALD }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: EMERALD }}>Identity Verified</p>
            <p className="text-xs" style={{ color: MUTED }}>+91 98765 43210 · OTP confirmed</p>
          </div>
        </div>

        {/* New password field */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>New Password</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3.5" style={{ background: CARD, border: `2px solid ${PRIMARY}` }}>
            <Lock className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            <p className="flex-1 text-base tracking-[0.25em] font-bold" style={{ color: TEXT }}>••••••••••</p>
            <div className="w-0.5 h-5 animate-pulse rounded-full" style={{ background: PRIMARY }} />
            <Eye className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
          </div>
        </div>

        {/* Strength meter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: MUTED }}>Password Strength</span>
            <span className="text-xs font-bold" style={{ color: strengthColors[strength - 1] }}>
              {strengthLabels[strength - 1]}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: BORDER }}>
                {i < strength && (
                  <div className="h-full rounded-full" style={{ background: strengthColors[strength - 1] }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rules checklist */}
        <div className="rounded-2xl p-4 space-y-2.5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-xs font-semibold" style={{ color: TEXT }}>Password Requirements</p>
          {pwRules.map((rule) => (
            <div key={rule.label} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: rule.met ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)" }}>
                {rule.met
                  ? <CheckCircle className="w-3 h-3" style={{ color: EMERALD }} />
                  : <X className="w-3 h-3" style={{ color: RED }} />}
              </div>
              <p className="text-xs" style={{ color: rule.met ? TEXT2 : MUTED }}>{rule.label}</p>
            </div>
          ))}
        </div>

        {/* Confirm password */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Confirm Password</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3.5" style={{ background: CARD, border: `2px solid ${EMERALD}` }}>
            <Lock className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            <p className="flex-1 text-base tracking-[0.25em] font-bold" style={{ color: TEXT }}>••••••••••</p>
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} />
          </div>
          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: EMERALD }}>
            <CheckCircle className="w-3 h-3" /> Passwords match
          </p>
        </div>

        {/* Security tip */}
        <div className="rounded-2xl px-4 py-3 flex items-start gap-3" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.12)" }}>
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: PRIMARY }} />
          <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
            <span className="font-semibold">Security tip:</span> Never share your password with anyone, including TradeCoach support staff.
          </p>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base shadow-lg"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
          <Lock className="w-4 h-4" /> Set New Password
        </button>
      </div>
    </div>
  );
}
