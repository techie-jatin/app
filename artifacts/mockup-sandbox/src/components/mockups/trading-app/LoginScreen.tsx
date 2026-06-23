import { TrendingUp, Eye, Mail, Lock } from "lucide-react";

const BG = "#FFFFFF";
const TEXT = "#0F172A";
const TEXT2 = "#64748B";
const HINT = "#94A3B8";
const PRIMARY = "#2563EB";
const BORDER = "#E2E8F0";
const INPUT_BG = "#F8FAFC";

export function LoginScreen() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0">
        <span className="text-xs font-medium" style={{ color: TEXT2 }}>9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 border rounded-[2px] relative" style={{ borderColor: "#CBD5E1" }}>
            <div className="absolute inset-[2px] left-[2px] rounded-[1px] w-2/3" style={{ background: TEXT2 }} />
          </div>
        </div>
      </div>

      {/* Navy hero banner */}
      <div className="flex flex-col items-center pt-10 pb-10 flex-shrink-0" style={{ background: "#0F172A" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-4" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Trade<span style={{ color: "#10B981" }}>Coach</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748B" }}>India's #1 Trading Education Platform</p>
      </div>

      {/* White card */}
      <div className="flex-1 px-6 pt-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: TEXT }}>Welcome back 👋</h2>
          <p className="text-sm" style={{ color: TEXT2 }}>Login to continue learning</p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: TEXT2 }}>EMAIL ADDRESS</label>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: INPUT_BG, border: `1.5px solid ${PRIMARY}` }}>
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: PRIMARY }} />
            <span className="text-sm flex-1" style={{ color: TEXT }}>rahul@email.com</span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: TEXT2 }}>PASSWORD</label>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: INPUT_BG, border: `1.5px solid ${BORDER}` }}>
            <Lock className="w-4 h-4 flex-shrink-0" style={{ color: HINT }} />
            <span className="text-sm flex-1" style={{ color: TEXT }}>••••••••</span>
            <Eye className="w-4 h-4" style={{ color: HINT }} />
          </div>
          <div className="flex justify-end">
            <span className="text-xs font-semibold" style={{ color: PRIMARY }}>Forgot Password?</span>
          </div>
        </div>

        {/* Login CTA */}
        <button className="w-full py-4 rounded-xl text-white text-sm font-bold tracking-wide shadow-lg" style={{ background: PRIMARY }}>
          LOGIN
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: BORDER }} />
          <span className="text-xs" style={{ color: HINT }}>OR</span>
          <div className="flex-1 h-px" style={{ background: BORDER }} />
        </div>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-semibold" style={{ background: BG, border: `1.5px solid ${BORDER}`, color: TEXT }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm" style={{ color: TEXT2 }}>
          New student?{" "}
          <span className="font-bold" style={{ color: PRIMARY }}>Register here</span>
        </p>
      </div>

      <div className="py-4 text-center text-[10px]" style={{ color: HINT }}>
        © 2026 TradeCoach · Privacy · Terms
      </div>
    </div>
  );
}
