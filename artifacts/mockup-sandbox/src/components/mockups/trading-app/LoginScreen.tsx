import { TrendingUp, Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";

export function LoginScreen() {
  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Inter']"
      style={{ background: "#0C0C0C", color: "#FFFFFF" }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0">
        <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 border rounded-[2px] relative" style={{ borderColor: "#555" }}>
            <div className="absolute inset-[2px] left-[2px] rounded-[1px] w-1/2" style={{ background: "#9CA3AF" }} />
          </div>
        </div>
      </div>

      {/* Logo area */}
      <div className="flex flex-col items-center pt-10 pb-8 flex-shrink-0">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-4"
          style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)" }}
        >
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "#FFFFFF" }}>
          Trade<span style={{ color: "#FFBF00" }}>Coach</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>India's #1 Trading Education Platform</p>
      </div>

      {/* Card */}
      <div className="flex-1 mx-4 rounded-3xl px-6 py-8 flex flex-col gap-5" style={{ background: "#161616", border: "1px solid #252525" }}>
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#FFFFFF" }}>Welcome back 👋</h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>Login to continue learning</p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Email Address</label>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: "#1E1E1E", border: "1px solid #2E2E2E" }}>
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#6B7280" }} />
            <span className="text-sm flex-1" style={{ color: "#6B7280" }}>rahul@email.com</span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Password</label>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: "#1E1E1E", border: "1px solid #2E2E2E" }}>
            <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "#6B7280" }} />
            <span className="text-sm flex-1" style={{ color: "#FFFFFF" }}>••••••••</span>
            <Eye className="w-4 h-4" style={{ color: "#6B7280" }} />
          </div>
          <div className="flex justify-end">
            <span className="text-xs font-medium" style={{ color: "#FFBF00" }}>Forgot Password?</span>
          </div>
        </div>

        {/* Login button */}
        <button
          className="w-full py-4 rounded-2xl text-sm font-extrabold tracking-wide shadow-lg"
          style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)", color: "#0C0C0C" }}
        >
          LOGIN
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "#2A2A2A" }} />
          <span className="text-xs" style={{ color: "#555" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "#2A2A2A" }} />
        </div>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: "#1E1E1E", border: "1px solid #2E2E2E", color: "#E5E7EB" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Register link */}
        <p className="text-center text-sm" style={{ color: "#6B7280" }}>
          New student?{" "}
          <span className="font-bold" style={{ color: "#FFBF00" }}>Register here</span>
        </p>
      </div>

      <div className="py-4 text-center text-[10px]" style={{ color: "#3A3A3A" }}>
        © 2026 TradeCoach · Privacy · Terms
      </div>
    </div>
  );
}
