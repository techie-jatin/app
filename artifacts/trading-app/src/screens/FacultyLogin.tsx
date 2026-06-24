import { GraduationCap, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const TEAL = "#0D9488";
const TEAL2 = "#14B8A6";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";

export function FacultyLogin() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Left panel — branding */}
      <div className="w-[520px] flex-shrink-0 flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg,#0F3460 0%,#0D9488 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-10" style={{ background: TEAL2 }} />
        <div className="absolute bottom-16 -right-16 w-56 h-56 rounded-full opacity-10" style={{ background: "#fff" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5" style={{ background: "#fff" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg">TradeCoach Academy</span>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Faculty Portal</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-black text-white leading-tight">Welcome back,<br />Educator.</h1>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
              Manage your batches, upload lectures, track student progress, and deliver world-class trading education.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { icon: "📚", text: "Upload lectures & course material" },
              { icon: "📝", text: "Create quizzes and assignments" },
              { icon: "📡", text: "Schedule & host live sessions" },
              { icon: "📊", text: "Track student progress in real-time" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="text-base">{f.icon}</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
          <ShieldCheck className="w-4 h-4 text-white opacity-70 flex-shrink-0" />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Faculty-only portal — student login is on the mobile app</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-black" style={{ color: TEXT }}>Sign in</h2>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>Use your academy-issued faculty credentials</p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Faculty Email</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                <span className="text-sm" style={{ color: MUTED }}>anand@tradecoach.in</span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Password</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}`, boxShadow: `0 0 0 3px rgba(13,148,136,0.15)` }}>
                <Lock className="w-4 h-4 flex-shrink-0" style={{ color: TEAL2 }} />
                <span className="flex-1 text-sm" style={{ color: MUTED }}>••••••••••••</span>
                <Eye className="w-4 h-4" style={{ color: MUTED }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: TEAL }}>
                  <span className="text-white text-[9px]">✓</span>
                </div>
                <span className="text-xs" style={{ color: MUTED }}>Keep me signed in</span>
              </label>
              <button className="text-xs font-medium" style={{ color: TEAL2 }}>Forgot password?</button>
            </div>

            <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(90deg,#0D9488,#14B8A6)" }}>
              Sign In to Faculty Portal
            </button>
          </div>

          <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.2)" }}>
            <p className="text-xs text-center" style={{ color: MUTED }}>
              Credentials are issued by the Academy Admin. Contact{" "}
              <span style={{ color: TEAL2 }}>admin@tradecoach.in</span>{" "}
              if you're having trouble signing in.
            </p>
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: MUTED }}>
            © 2025 TradeCoach Academy · Faculty Portal v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
