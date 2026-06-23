import {
  TrendingUp, Clock, Bell, CheckCircle, ChevronRight,
  Users, BookOpen, LogOut, RefreshCw, MessageCircle
} from "lucide-react";

const steps = [
  { label: "Account Created", desc: "Email verified successfully", done: true },
  { label: "Profile Submitted", desc: "Admin reviewing your details", done: true },
  { label: "Batch Assignment", desc: "Waiting for admin to assign you", done: false, active: true },
  { label: "Course Access", desc: "Unlocked after batch assignment", done: false },
];

const faqs = [
  { q: "How long does assignment take?", a: "Usually within 24–48 hours of registration." },
  { q: "What happens after assignment?", a: "You'll get a push notification and full course access." },
  { q: "Can I contact support?", a: "Yes — tap the chat icon below to reach our team." },
];

export function PendingAssignment() {
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

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)" }}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-base">
            Trade<span style={{ color: "#FFBF00" }}>Coach</span>
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl"
          style={{ background: "#1E1E1E", color: "#9CA3AF", border: "1px solid #2A2A2A" }}
        >
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-20">
        {/* Hero card */}
        <div
          className="rounded-3xl p-6 flex flex-col items-center text-center"
          style={{
            background: "linear-gradient(160deg, #161616, #1A1400)",
            border: "1px solid rgba(255,191,0,0.18)",
          }}
        >
          {/* Animated pulse ring */}
          <div className="relative mb-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,191,0,0.12)", border: "2px solid rgba(255,191,0,0.3)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)" }}
              >
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
            {/* Ping dot */}
            <div
              className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "#FFBF00" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>

          <h2 className="text-xl font-extrabold mb-2">Pending Batch Assignment</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
            Hi <span className="font-semibold" style={{ color: "#FFFFFF" }}>Rahul!</span> Your account is active.
            Our admin will assign you to a batch shortly.
          </p>

          <div
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: "rgba(255,191,0,0.1)", color: "#FFBF00", border: "1px solid rgba(255,191,0,0.2)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFBF00" }} />
            Registered on Jun 23, 2026
          </div>
        </div>

        {/* Progress steps */}
        <div
          className="rounded-3xl p-5"
          style={{ background: "#161616", border: "1px solid #252525" }}
        >
          <h3 className="text-sm font-bold mb-4" style={{ color: "#FFFFFF" }}>Onboarding Progress</h3>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: step.done
                        ? "linear-gradient(135deg, #FFBF00, #FF8C00)"
                        : step.active
                        ? "rgba(255,191,0,0.1)"
                        : "#1E1E1E",
                      border: step.active
                        ? "2px solid rgba(255,191,0,0.4)"
                        : step.done
                        ? "none"
                        : "2px solid #2A2A2A",
                    }}
                  >
                    {step.done ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : step.active ? (
                      <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#FFBF00" }} />
                    ) : (
                      <span className="w-2 h-2 rounded-full" style={{ background: "#2A2A2A" }} />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-1 mb-1"
                      style={{
                        background: step.done ? "rgba(255,191,0,0.3)" : "#2A2A2A",
                        minHeight: "24px",
                      }}
                    />
                  )}
                </div>
                {/* Text */}
                <div className="pb-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: step.done || step.active ? "#FFFFFF" : "#3A3A3A" }}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: step.done ? "#FFBF00" : step.active ? "#9CA3AF" : "#3A3A3A" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview teaser */}
        <div
          className="rounded-3xl p-5"
          style={{ background: "#161616", border: "1px solid #252525" }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "#9CA3AF" }}>What unlocks after assignment</h3>
          <div className="space-y-2.5">
            {[
              { icon: BookOpen, label: "Recorded Lectures", sub: "Watch at your own pace" },
              { icon: Users, label: "Live Classes", sub: "Join batch sessions" },
              { icon: Bell, label: "Notifications", sub: "Quizzes, assignments & more" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,191,0,0.08)", border: "1px solid rgba(255,191,0,0.12)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#FFBF00" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#E5E7EB" }}>{item.label}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div
          className="rounded-3xl p-5"
          style={{ background: "#161616", border: "1px solid #252525" }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "#FFFFFF" }}>Frequently Asked</h3>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i}>
                <p className="text-sm font-semibold flex items-center justify-between" style={{ color: "#E5E7EB" }}>
                  {f.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#FFBF00" }} />
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6B7280" }}>{f.a}</p>
                {i < faqs.length - 1 && <div className="mt-3 h-px" style={{ background: "#1E1E1E" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom */}
      <div
        className="flex-shrink-0 px-5 py-4 flex gap-3"
        style={{ background: "#0C0C0C", borderTop: "1px solid #1A1A1A" }}
      >
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold"
          style={{ background: "#1E1E1E", color: "#9CA3AF", border: "1px solid #2A2A2A" }}
        >
          <RefreshCw className="w-4 h-4" /> Refresh Status
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)", color: "#0C0C0C" }}
        >
          <MessageCircle className="w-4 h-4" /> Contact Support
        </button>
      </div>
    </div>
  );
}
