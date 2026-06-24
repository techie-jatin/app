import { ChevronRight, TrendingUp, PlayCircle, Award, Shield } from "lucide-react";

const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const NAVY = "#0F172A";

const slides = [
  {
    accent: PRIMARY,
    accentLight: "rgba(37,99,235,0.15)",
    icon: TrendingUp,
    badge: "LEARN TO TRADE",
    headline: "Master the\nMarket with\nExperts",
    body: "Learn technical analysis, options, and derivatives from SEBI-registered mentors — at your pace.",
    dots: [PRIMARY, "rgba(255,255,255,0.2)", "rgba(255,255,255,0.2)"],
    active: 0,
  },
];

const features = [
  { icon: PlayCircle, text: "HD live & recorded lectures" },
  { icon: Award, text: "Industry-recognised certificates" },
  { icon: Shield, text: "Doubt resolution every session" },
];

export function Onboarding() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins'] relative" style={{ background: NAVY }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY }} />
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: EMERALD }} />
        <div className="absolute bottom-60 right-10 w-40 h-40 rounded-full opacity-8" style={{ background: PRIMARY }} />
        {/* Grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px opacity-[0.03]" style={{ left: `${i * 14}%`, background: "#fff" }} />
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 flex-shrink-0 relative z-10">
        <span className="text-[11px] text-white opacity-40">9:41</span>
        <div className="w-4 h-2 border border-white/20 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/50 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Logo area */}
      <div className="flex items-center justify-center mt-8 mb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-white font-black text-xl tracking-tight">TradeCoach</p>
            <p className="text-[11px] font-medium" style={{ color: "#64748B" }}>Professional Trading Academy</p>
          </div>
        </div>
      </div>

      {/* Hero illustration placeholder */}
      <div className="mx-8 mt-6 mb-4 rounded-3xl overflow-hidden relative z-10 flex-shrink-0" style={{ height: 220, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Candlestick chart mock */}
        <div className="absolute inset-0 flex items-end px-6 pb-6 gap-3">
          {[55, 75, 45, 90, 62, 85, 70, 95, 60, 88, 72, 100].map((h, i) => {
            const isGreen = i % 3 !== 2;
            const color = isGreen ? EMERALD : "#EF4444";
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-0.5 mx-auto" style={{ height: Math.random() * 20 + 8, background: color, opacity: 0.5 }} />
                <div className="w-full rounded-sm" style={{ height: `${h * 0.8}px`, background: color, opacity: isGreen ? 0.9 : 0.7 }} />
                <div className="w-0.5 mx-auto" style={{ height: Math.random() * 15 + 5, background: color, opacity: 0.5 }} />
              </div>
            );
          })}
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%)" }} />
        {/* Live badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#EF4444" }} />
          <span className="text-xs font-bold" style={{ color: "#EF4444" }}>LIVE CLASS</span>
        </div>
        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-base">Nifty 50</p>
            <p className="text-sm font-semibold" style={{ color: EMERALD }}>↑ 1.24% today</p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#64748B" }}>Portfolio</p>
            <p className="text-white font-bold">₹2,48,500</p>
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col px-8 relative z-10">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.25)" }}>
            LEARN TO TRADE
          </span>
        </div>

        <h1 className="text-white font-black text-3xl leading-tight mb-3">
          Master the<br />Market with<br />
          <span style={{ color: EMERALD }}>Experts</span>
        </h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>
          Learn technical analysis, options, and derivatives from SEBI-registered mentors — at your own pace.
        </p>

        {/* Feature pills */}
        <div className="space-y-2.5 mb-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: i === 0 ? "rgba(37,99,235,0.15)" : i === 1 ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                <f.icon className="w-3.5 h-3.5" style={{ color: i === 0 ? "#60A5FA" : i === 1 ? EMERALD : "#F59E0B" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "#CBD5E1" }}>{f.text}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mb-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-full transition-all" style={{ width: i === 0 ? 24 : 8, height: 8, background: i === 0 ? PRIMARY : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="space-y-3 pb-8">
          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base shadow-xl"
            style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
            Get Started <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full py-3.5 rounded-2xl text-sm font-semibold" style={{ background: "rgba(255,255,255,0.05)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }}>
            Already enrolled? <span style={{ color: PRIMARY }}>Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}
