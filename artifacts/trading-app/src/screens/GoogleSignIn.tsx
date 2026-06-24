import { ChevronLeft, TrendingUp, Shield, Chrome } from "lucide-react";

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

const googleAccounts = [
  { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", avatar: "RS", selected: true },
  { name: "Rahul Trading", email: "rahul.trading@gmail.com", avatar: "RT", selected: false },
];

export function GoogleSignIn() {
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

      {/* Header bar */}
      <div className="px-4 pt-3 pb-3 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white font-semibold text-base">Sign in with Google</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-6 py-6 pb-20">
        {/* Google branding block */}
        <div className="w-full rounded-3xl p-6 flex flex-col items-center mb-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          {/* Google logo simulation */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </div>
          <p className="text-lg font-bold text-center" style={{ color: TEXT }}>Sign in to TradeCoach</p>
          <p className="text-xs text-center mt-1" style={{ color: MUTED }}>with your Google Account</p>

          {/* Account picker */}
          <div className="w-full mt-5 space-y-3">
            {googleAccounts.map((acc) => (
              <button key={acc.email} className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left"
                style={{
                  background: acc.selected ? "rgba(37,99,235,0.06)" : BG,
                  border: `1.5px solid ${acc.selected ? PRIMARY : BORDER}`,
                }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: acc.selected ? PRIMARY : "#64748B" }}>
                  {acc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: TEXT }}>{acc.name}</p>
                  <p className="text-[11px] truncate" style={{ color: MUTED }}>{acc.email}</p>
                </div>
                {acc.selected && (
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: PRIMARY, background: PRIMARY }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}

            <button className="w-full flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: BG, border: `1.5px dashed ${BORDER}` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BORDER }}>
                <span className="text-xl font-light" style={{ color: MUTED }}>+</span>
              </div>
              <p className="text-sm font-medium" style={{ color: MUTED }}>Use another account</p>
            </button>
          </div>
        </div>

        {/* Permissions block */}
        <div className="w-full rounded-2xl p-4 mb-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: TEXT }}>TradeCoach will receive:</p>
          <div className="space-y-2.5">
            {[
              { label: "Your name and profile picture", icon: "👤" },
              { label: "Your email address", icon: "📧" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs" style={{ color: TEXT2 }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-xl" style={{ background: BG }}>
            <p className="text-[10px] leading-relaxed" style={{ color: MUTED }}>
              TradeCoach will NOT receive your Google password. By continuing, you agree to the{" "}
              <span style={{ color: PRIMARY }}>Terms of Service</span> and{" "}
              <span style={{ color: PRIMARY }}>Privacy Policy</span>.
            </p>
          </div>
        </div>

        {/* Security note */}
        <div className="w-full flex items-center gap-2 mb-6">
          <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />
          <p className="text-[10px]" style={{ color: MUTED }}>Your sign-in is secured by Google's 2-step verification</p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm text-white"
            style={{ background: PRIMARY }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" opacity="0.8" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" opacity="0.8" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" opacity="0.8" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" opacity="0.8" />
            </svg>
            Continue as Rahul Sharma
          </button>
          <button className="w-full py-3.5 rounded-2xl font-semibold text-sm" style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT2 }}>
            Sign in with Email instead
          </button>
        </div>
      </div>
    </div>
  );
}
