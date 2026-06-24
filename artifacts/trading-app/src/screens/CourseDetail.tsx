import {
  ChevronLeft, Star, Users, Clock, PlayCircle, CheckCircle,
  ChevronDown, ChevronRight, Lock, Award, TrendingUp,
  BookOpen, Calendar, BarChart2, Download, Share2
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

const modules = [
  {
    title: "Market Structure & Basics",
    lectures: 4, duration: "3h 20m", unlocked: true,
    lessons: [
      { title: "What is the Stock Market?", dur: "42 min", free: true },
      { title: "Understanding Bull & Bear Cycles", dur: "38 min", free: false },
      { title: "Order Types & Market Mechanics", dur: "55 min", free: false },
      { title: "Reading Candlestick Charts", dur: "1h 05m", free: false },
    ],
  },
  {
    title: "Technical Analysis Foundations",
    lectures: 5, duration: "4h 45m", unlocked: false,
    lessons: [
      { title: "Support & Resistance Levels", dur: "50 min", free: false },
      { title: "Trendlines & Chart Patterns", dur: "58 min", free: false },
      { title: "Moving Averages (SMA, EMA)", dur: "45 min", free: false },
      { title: "RSI, MACD & Indicators", dur: "1h 12m", free: false },
      { title: "Volume Profile Analysis", dur: "1h 00m", free: false },
    ],
  },
  {
    title: "Options & Derivatives",
    lectures: 6, duration: "5h 30m", unlocked: false,
    lessons: [],
  },
  {
    title: "Risk Management & Psychology",
    lectures: 4, duration: "3h 10m", unlocked: false,
    lessons: [],
  },
];

export function CourseDetail() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Course hero */}
      <div className="flex-shrink-0 relative" style={{ background: NAVY }}>
        {/* Thumbnail area */}
        <div className="relative mx-0" style={{ height: 160 }}>
          {/* Candlestick mockup bg */}
          <div className="absolute inset-0 flex items-end px-5 pb-4 gap-2 overflow-hidden">
            {[55, 75, 40, 88, 60, 92, 70, 100, 65, 85, 78, 95].map((h, i) => {
              const isGreen = i % 3 !== 2;
              return (
                <div key={i} className="flex-1 rounded-sm opacity-80" style={{ height: `${h * 0.85}px`, background: isGreen ? EMERALD : "#EF4444" }} />
              );
            })}
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.85) 100%)" }} />

          {/* Play btn */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(37,99,235,0.9)", boxShadow: "0 0 0 8px rgba(37,99,235,0.2)" }}>
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Nav */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Free preview badge */}
          <div className="absolute bottom-3 left-4">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: EMERALD, color: "#fff" }}>
              FREE PREVIEW
            </span>
          </div>
        </div>

        {/* Course title block */}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase" style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA" }}>
              Advanced Trading
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: EMERALD }}>
              Batch A — Live
            </span>
          </div>
          <h1 className="text-white font-bold text-base leading-snug mb-2">
            Advanced Options & Derivatives Mastery Program
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[0,1,2,3,4].map(i=>(
                <Star key={i} className="w-3 h-3" style={{ color: AMBER }} fill={AMBER} />
              ))}
              <span className="text-xs font-bold ml-1" style={{ color: AMBER }}>4.9</span>
            </div>
            <span className="text-xs" style={{ color: "#64748B" }}>· 248 students</span>
            <span className="text-xs" style={{ color: "#64748B" }}>· 19 lectures</span>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Sticky enrol bar */}
        <div className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between" style={{ background: CARD, borderBottom: `1px solid ${BORDER}`, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div>
            <p className="text-xs line-through" style={{ color: MUTED }}>₹29,999</p>
            <p className="text-xl font-black" style={{ color: PRIMARY }}>₹19,999</p>
            <p className="text-[10px]" style={{ color: EMERALD }}>33% off — 2 days left</p>
          </div>
          <button className="px-6 py-3 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
            Enrol Now
          </button>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock, label: "Duration", value: "3 Months", color: PRIMARY },
              { icon: PlayCircle, label: "Lectures", value: "19 Videos", color: EMERALD },
              { icon: Users, label: "Batch Size", value: "42 Students", color: "#8B5CF6" },
              { icon: Award, label: "Certificate", value: "Yes — SEBI", color: AMBER },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-3.5 flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}14` }}>
                  <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                  <p className="text-sm font-bold" style={{ color: TEXT }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What you'll learn */}
          <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>What You'll Learn</p>
            <div className="space-y-2">
              {[
                "Read & analyse candlestick charts confidently",
                "Build profitable options strategies (Iron Condor, Strangle)",
                "Understand Greeks: Delta, Gamma, Theta, Vega",
                "Manage risk with proper position sizing",
                "Use Zerodha / Angel One for live trading",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                  <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #8B5CF6)" }}>AK</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: TEXT }}>Dr. Anand Kumar</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>SEBI-Reg. Mentor · 12 yrs experience</p>
              <div className="flex items-center gap-1 mt-1.5">
                {[0,1,2,3,4].map(i=><Star key={i} className="w-2.5 h-2.5" style={{ color: AMBER }} fill={AMBER} />)}
                <span className="text-[10px] font-bold ml-1" style={{ color: AMBER }}>4.9 (73 students)</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
          </div>

          {/* Curriculum */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Curriculum</p>
            <div className="space-y-2">
              {modules.map((mod, mi) => (
                <div key={mi} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: mi === 0 ? `1px solid ${BORDER}` : "none" }}>
                    <div className="flex items-center gap-2">
                      {mod.unlocked
                        ? <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
                        : <Lock className="w-4 h-4" style={{ color: MUTED }} />}
                      <div>
                        <p className="text-sm font-medium" style={{ color: mod.unlocked ? TEXT : TEXT2 }}>{mod.title}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>{mod.lectures} lectures · {mod.duration}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: MUTED, transform: mi === 0 ? "rotate(180deg)" : "none" }} />
                  </div>
                  {mi === 0 && mod.lessons.map((lesson, li) => (
                    <div key={li} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: li < mod.lessons.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                      <PlayCircle className="w-4 h-4 flex-shrink-0" style={{ color: lesson.free ? PRIMARY : MUTED }} />
                      <p className="flex-1 text-xs" style={{ color: lesson.free ? TEXT : MUTED }}>{lesson.title}</p>
                      <div className="flex items-center gap-1.5">
                        {lesson.free && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>FREE</span>}
                        <span className="text-[10px]" style={{ color: MUTED }}>{lesson.dur}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: TEXT }}>Student Reviews</p>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" style={{ color: AMBER }} fill={AMBER} />
                <span className="text-sm font-bold" style={{ color: AMBER }}>4.9</span>
              </div>
            </div>
            {[
              { name: "Rahul S.", text: "Best course I've taken. Dr. Anand explains options Greeks so clearly.", rating: 5 },
              { name: "Priya M.", text: "Live sessions are incredibly helpful. The batch community is supportive.", rating: 5 },
            ].map((r, i) => (
              <div key={i} className="pb-3 mb-3" style={{ borderBottom: i === 0 ? `1px solid ${BORDER}` : "none" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: PRIMARY }}>{r.name[0]}</div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: TEXT }}>{r.name}</p>
                    <div className="flex gap-0.5">{[0,1,2,3,4].map(i=><Star key={i} className="w-2.5 h-2.5" style={{ color: AMBER }} fill={AMBER} />)}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses", active: true }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
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
