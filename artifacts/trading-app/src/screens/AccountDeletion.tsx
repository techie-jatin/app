import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2, Award,
  AlertTriangle, Trash2, Shield, Lock, ChevronRight, CheckCircle
} from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const BORDER = "#E2E8F0";

export function AccountDeletion() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <p className="text-white font-semibold text-base">Delete Account</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Rahul Sharma</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {/* Warning banner */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.12)" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: RED }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: RED }}>This action is permanent</p>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: TEXT2 }}>
                Deleting your account will permanently remove all your data from our servers. This cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* What gets deleted */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>What will be deleted</p>
          <div className="space-y-2.5">
            {[
              "Your profile and personal information",
              "Course progress and completion records",
              "Quiz scores and assignment submissions",
              "Attendance history and certificates",
              "All messages and notifications",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.12)" }}>
                  <span className="text-[8px] font-black" style={{ color: RED }}>✕</span>
                </div>
                <span className="text-xs" style={{ color: TEXT2 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What is kept */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>What is retained</p>
          <div className="space-y-2.5">
            {[
              "Anonymised aggregate analytics data",
              "Financial transaction records (legal requirement)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
                  <CheckCircle className="w-2.5 h-2.5" style={{ color: EMERALD }} />
                </div>
                <span className="text-xs" style={{ color: TEXT2 }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 px-3 py-2 rounded-xl" style={{ background: BG }}>
            <p className="text-[10px] leading-relaxed" style={{ color: MUTED }}>
              Per our Privacy Policy and applicable data protection laws, certain records may be retained for legal compliance. See our{" "}
              <span style={{ color: PRIMARY }}>Privacy Policy</span> for details.
            </p>
          </div>
        </div>

        {/* Alternatives */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Before you delete, consider</p>
          <div className="space-y-2.5">
            {[
              { icon: Lock, label: "Temporarily disable account", sub: "Pause access without losing data", color: PRIMARY },
              { icon: Shield, label: "Update privacy settings", sub: "Control what data we collect", color: EMERALD },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}12` }}>
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold" style={{ color: TEXT }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
              </button>
            ))}
          </div>
        </div>

        {/* Confirmation input */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid rgba(239,68,68,0.2)` }}>
          <p className="text-sm font-semibold mb-1" style={{ color: TEXT }}>Confirm deletion</p>
          <p className="text-[11px] mb-3" style={{ color: MUTED }}>
            Type <span className="font-bold" style={{ color: RED }}>DELETE</span> to confirm you want to permanently delete your account.
          </p>
          <div className="px-4 py-3 rounded-xl" style={{ background: BG, border: `1px solid ${BORDER}` }}>
            <span className="text-sm" style={{ color: MUTED }}>Type DELETE here...</span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white"
            style={{ background: RED, opacity: 0.5 }}>
            <Trash2 className="w-4 h-4" /> Delete My Account Permanently
          </button>
          <button className="w-full py-3.5 rounded-2xl font-semibold text-sm" style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT2 }}>
            Cancel — Keep My Account
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile", active: true }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: (item as any).active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
