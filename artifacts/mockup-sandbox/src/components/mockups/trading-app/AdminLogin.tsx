import { Shield, Eye, Lock, Mail, AlertTriangle, ChevronRight } from "lucide-react";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";

export function AdminLogin() {
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Left panel */}
      <div className="w-[520px] flex-shrink-0 flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg,#0B1120 0%,#1E3A8A 100%)" }}>
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10" style={{ background: PRIMARY }} />
        <div className="absolute bottom-20 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: AMBER }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>
            <Shield className="w-6 h-6" style={{ color: PRIMARY }} />
          </div>
          <div>
            <p className="text-white font-bold text-lg">TradeCoach Academy</p>
            <p className="text-xs" style={{ color: "#64748B" }}>Admin Control Panel</p>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
              <span className="text-xs font-bold" style={{ color: RED }}>RESTRICTED ACCESS</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">Admin Portal</h1>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              This area is restricted to authorised academy administrators only. Unauthorised access attempts are logged and monitored.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { icon: "🧑‍🎓", text: "Manage students, batches & faculty" },
              { icon: "📊", text: "View analytics & attendance reports" },
              { icon: "🔔", text: "Send push notifications to batches" },
              { icon: "🏅", text: "Issue and manage certificates" },
              { icon: "🔒", text: "Monitor security & login activity" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="text-base">{f.icon}</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>All admin actions are logged. Session is time-limited to 8 hours.</p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-16" style={{ background: CARD }}>
        <div className="w-full max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <Shield className="w-8 h-8" style={{ color: PRIMARY }} />
          </div>

          <h2 className="text-3xl font-black mb-1" style={{ color: TEXT }}>Admin Sign In</h2>
          <p className="text-sm mb-8" style={{ color: MUTED }}>Enter your admin credentials to access the control panel</p>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Admin Email</label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                <span className="text-sm" style={{ color: MUTED }}>admin@tradecoach.in</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Password</label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${PRIMARY}`, boxShadow: "0 0 0 3px rgba(37,99,235,0.12)" }}>
                <Lock className="w-4 h-4 flex-shrink-0" style={{ color: PRIMARY }} />
                <span className="flex-1 text-sm" style={{ color: MUTED }}>••••••••••••••</span>
                <Eye className="w-4 h-4" style={{ color: MUTED }} />
              </div>
            </div>

            {/* 2FA notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: AMBER }}>Two-Factor Authentication</p>
                <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>A verification code will be sent to your registered mobile number after password validation.</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ background: "linear-gradient(90deg,#1D4ED8,#2563EB)" }}>
              <Shield className="w-4 h-4" /> Sign In Securely
            </button>

            <div className="text-center">
              <button className="text-xs font-medium" style={{ color: MUTED }}>Forgot admin password? <span style={{ color: PRIMARY }}>Contact Super Admin →</span></button>
            </div>
          </div>

          {/* Security badges */}
          <div className="mt-8 pt-6 flex items-center justify-center gap-6" style={{ borderTop: `1px solid ${BORDER2}` }}>
            {["SSL Secured", "2FA Required", "Session Logged"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: EMERALD }} />
                <span className="text-[10px]" style={{ color: MUTED }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
