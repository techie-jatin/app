import { ChevronLeft, Mail, RotateCcw } from "lucide-react";

import { useLocation } from "wouter";
const BG = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#64748B";
const HINT = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const BORDER = "#E2E8F0";
const INPUT_BG = "#F8FAFC";

const digits = ["8", "4", "2", "7", "", ""];

export function OTPVerification() {
  const [, navigate] = useLocation();
  const filled = digits.filter(Boolean).length;

  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] font-medium text-white opacity-60">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Navy header */}
      <div className="flex items-center gap-3 px-5 py-3 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-base font-bold text-white">Verify Email</h1>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center pt-10 pb-8 px-8 text-center flex-shrink-0">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
          style={{ background: "rgba(37,99,235,0.08)", border: `1px solid rgba(37,99,235,0.15)` }}>
          <Mail className="w-9 h-9" style={{ color: PRIMARY }} />
        </div>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: TEXT }}>Enter OTP</h2>
        <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>We sent a 6-digit code to</p>
        <p className="text-sm font-semibold mt-1" style={{ color: PRIMARY }}>rahul.sharma@gmail.com</p>
      </div>

      {/* OTP boxes */}
      <div className="flex justify-center gap-3 px-5 mb-6 flex-shrink-0">
        {digits.map((d, i) => (
          <div key={i} className="w-12 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
            style={{
              background: d ? INPUT_BG : BG,
              border: `2px solid ${d ? PRIMARY : i === filled ? `rgba(37,99,235,0.4)` : BORDER}`,
              color: TEXT,
              boxShadow: d ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
            }}>
            {d || (i === filled ? <span style={{ color: PRIMARY }}>|</span> : "")}
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-2 mb-8 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `2px solid ${BORDER}` }}>
            <svg viewBox="0 0 32 32" className="w-5 h-5">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#E2E8F0" strokeWidth="3" />
              <circle cx="16" cy="16" r="12" fill="none" stroke={AMBER} strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 12}`}
                strokeDashoffset={`${2 * Math.PI * 12 * 0.45}`}
                strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
            </svg>
          </div>
          <span className="text-2xl font-extrabold" style={{ color: TEXT }}>1:38</span>
        </div>
        <p className="text-xs" style={{ color: HINT }}>OTP expires in 3 minutes</p>
        <button className="flex items-center gap-1.5 text-sm font-semibold mt-1" style={{ color: HINT }}>
          <RotateCcw className="w-3.5 h-3.5" /> Resend OTP
        </button>
      </div>

      {/* Verify */}
      <div className="px-5 mb-5 flex-shrink-0">
        <button className="w-full py-4 rounded-xl text-sm font-bold tracking-wide"
          style={filled >= 4 ? { background: PRIMARY, color: "#fff" } : { background: INPUT_BG, color: HINT, border: `1px solid ${BORDER}` }}>
          VERIFY OTP
        </button>
      </div>

      {/* Keypad */}
      <div className="px-5 flex-shrink-0">
        <div className="grid grid-cols-3 gap-3">
          {["1","2","3","4","5","6","7","8","9","*","0","⌫"].map((k) => (
            <button key={k} className="h-14 rounded-2xl text-xl font-bold flex items-center justify-center"
              style={{ background: k === "⌫" ? "rgba(37,99,235,0.06)" : INPUT_BG, border: `1px solid ${BORDER}`, color: k === "⌫" ? PRIMARY : k === "*" ? HINT : TEXT }}>
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const AMBER = "#F59E0B";
