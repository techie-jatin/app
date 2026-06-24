import {
  CheckCircle, Download, Share2, ChevronRight,
  TrendingUp, BookOpen, Calendar, BarChart2, Award,
  PlayCircle, Users, Clock, Star
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
const BORDER = "#E2E8F0";

export function PaymentSuccess() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Success hero */}
      <div className="flex-shrink-0 flex flex-col items-center px-6 pt-6 pb-7 relative overflow-hidden" style={{ background: NAVY }}>
        {/* Confetti dots */}
        {[
          { top: "8%", left: "10%", color: EMERALD, size: 8 },
          { top: "15%", left: "80%", color: AMBER, size: 6 },
          { top: "30%", left: "90%", color: PRIMARY, size: 10 },
          { top: "5%", left: "55%", color: "#F472B6", size: 7 },
          { top: "40%", left: "5%", color: AMBER, size: 5 },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-70"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: d.color }} />
        ))}

        {/* Success ring */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.3)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}>
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: EMERALD }} />
        </div>

        <p className="text-2xl font-black text-white mb-1">Payment Successful!</p>
        <p className="text-sm text-center" style={{ color: "#64748B" }}>
          Welcome to Advanced Batch A. You're all set to start learning.
        </p>

        {/* Amount chip */}
        <div className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
          <span className="text-xl font-black" style={{ color: EMERALD }}>₹23,600</span>
          <span className="text-xs font-medium" style={{ color: "#64748B" }}>paid via GPay UPI</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">

        {/* Receipt card */}
        <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Order Receipt</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs font-medium" style={{ color: PRIMARY }}>
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button className="flex items-center gap-1 text-xs font-medium" style={{ color: MUTED }}>
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            {[
              { label: "Order ID", value: "TC-2026-048291" },
              { label: "Transaction ID", value: "GPay-7382910234" },
              { label: "Date", value: "Jun 23, 2026  9:41 AM" },
              { label: "Course", value: "Adv. Options & Derivatives" },
              { label: "Batch", value: "Advanced Batch A" },
              { label: "Validity", value: "Jun 23 – Sep 23, 2026" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: MUTED }}>{row.label}</span>
                <span className="text-xs font-semibold text-right" style={{ color: TEXT2 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course access card */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(37,99,235,0.05)", border: `1.5px solid rgba(37,99,235,0.2)` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: TEXT }}>Advanced Options & Derivatives</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Now active in your account</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: PlayCircle, value: "19", label: "Lectures", color: PRIMARY },
              { icon: Users, value: "42", label: "Students", color: EMERALD },
              { icon: Clock, value: "3 mo", label: "Access", color: AMBER },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-2.5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <s.icon className="w-4 h-4 mb-1" style={{ color: s.color }} />
                <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
            <PlayCircle className="w-4 h-4" /> Start Learning Now
          </button>
        </div>

        {/* First live class nudge */}
        <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(239,68,68,0.1)" }}>
            <Calendar className="w-5 h-5" style={{ color: "#DC2626" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Next Live Class</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Today · 6:00 PM — Options Chain Deep Dive</p>
            <p className="text-xs" style={{ color: MUTED }}>Dr. Anand Kumar · 90 min</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0" style={{ background: "#DC2626" }}>
            Join
          </button>
        </div>

        {/* Invite friends */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(16,185,129,0.05)", border: `1px solid rgba(16,185,129,0.15)` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
            <Share2 className="w-5 h-5" style={{ color: EMERALD }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Refer & Earn ₹1,000</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Share your referral code: <span className="font-bold" style={{ color: EMERALD }}>RAHUL100</span></p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", active: true }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
