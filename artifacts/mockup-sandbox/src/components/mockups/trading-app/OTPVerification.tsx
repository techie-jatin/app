import { TrendingUp, ChevronLeft, Mail, RotateCcw, CheckCircle } from "lucide-react";

const digits = ["8", "4", "2", "7", "", ""];

export function OTPVerification() {
  const filled = digits.filter(Boolean).length;
  const isComplete = filled === 6;

  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Inter']"
      style={{ background: "#0C0C0C", color: "#FFFFFF" }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0">
        <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>9:41</span>
        <div className="w-4 h-2 border rounded-[2px] relative" style={{ borderColor: "#555" }}>
          <div className="absolute inset-[2px] left-[2px] rounded-[1px] w-1/2" style={{ background: "#9CA3AF" }} />
        </div>
      </div>

      {/* Back header */}
      <div className="flex items-center gap-3 px-5 pt-3 pb-2 flex-shrink-0">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#1E1E1E", border: "1px solid #2A2A2A" }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "#9CA3AF" }} />
        </button>
        <h1 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Verify Email</h1>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center pt-8 pb-8 flex-shrink-0 px-8 text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg, rgba(255,191,0,0.15), rgba(255,140,0,0.10))", border: "1px solid rgba(255,191,0,0.2)" }}
        >
          <Mail className="w-9 h-9" style={{ color: "#FFBF00" }} />
        </div>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#FFFFFF" }}>Enter OTP</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
          We sent a 6-digit verification code to
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: "#FFBF00" }}>rahul.sharma@gmail.com</p>
      </div>

      {/* OTP inputs */}
      <div className="flex justify-center gap-3 px-5 mb-6 flex-shrink-0">
        {digits.map((d, i) => (
          <div
            key={i}
            className="w-12 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
            style={{
              background: d ? "#1E1E1E" : "#161616",
              border: d
                ? "2px solid #FFBF00"
                : i === filled
                ? "2px solid rgba(255,191,0,0.4)"
                : "2px solid #2A2A2A",
              color: "#FFFFFF",
              boxShadow: d ? "0 0 12px rgba(255,191,0,0.15)" : "none",
            }}
          >
            {d || (i === filled ? <span style={{ color: "#FFBF00" }}>|</span> : "")}
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-2 mb-8 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#1E1E1E", border: "1px solid #2A2A2A" }}
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#2A2A2A" strokeWidth="3"/>
              <circle
                cx="16" cy="16" r="12" fill="none"
                stroke="#FFBF00" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 12}`}
                strokeDashoffset={`${2 * Math.PI * 12 * 0.45}`}
                strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
          </div>
          <span className="text-2xl font-extrabold" style={{ color: "#FFBF00" }}>1:38</span>
        </div>
        <p className="text-xs" style={{ color: "#6B7280" }}>OTP expires in 3 minutes</p>
        <button
          className="flex items-center gap-1.5 text-sm font-semibold mt-1"
          style={{ color: "#6B7280" }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Resend OTP
        </button>
      </div>

      {/* Verify button */}
      <div className="px-5 mb-5 flex-shrink-0">
        <button
          className="w-full py-4 rounded-2xl text-sm font-extrabold tracking-wide"
          style={{
            background: filled >= 4
              ? "linear-gradient(135deg, #FFBF00, #FF8C00)"
              : "#1E1E1E",
            color: filled >= 4 ? "#0C0C0C" : "#3A3A3A",
          }}
        >
          VERIFY OTP
        </button>
      </div>

      {/* Keypad */}
      <div className="px-5 flex-shrink-0">
        <div className="grid grid-cols-3 gap-3">
          {["1","2","3","4","5","6","7","8","9","*","0","⌫"].map((k) => (
            <button
              key={k}
              className="h-14 rounded-2xl text-xl font-bold flex items-center justify-center"
              style={{
                background: k === "⌫" ? "rgba(255,191,0,0.1)" : "#161616",
                border: "1px solid #252525",
                color: k === "⌫" ? "#FFBF00" : k === "*" ? "#3A3A3A" : "#FFFFFF",
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
