import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2, Award,
  CheckCircle, XCircle, Clock, Trophy, Target, RotateCcw, Share2, ChevronDown
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
const PURPLE = "#8B5CF6";
const BORDER = "#E2E8F0";

const questions = [
  {
    q: "Which indicator measures momentum and is used to identify overbought/oversold conditions?",
    options: ["MACD", "RSI", "Bollinger Bands", "Volume Profile"],
    correct: 1, chosen: 1, marks: 2,
    explanation: "RSI (Relative Strength Index) is a momentum oscillator that ranges from 0–100. Values above 70 indicate overbought, below 30 indicate oversold conditions.",
  },
  {
    q: "In a bullish engulfing candlestick pattern, the second candle must:",
    options: ["Close below the first candle's open", "Close above the first candle's open", "Have equal highs as the first candle", "Show a doji formation"],
    correct: 1, chosen: 0, marks: 2,
    explanation: "A bullish engulfing requires the second (bullish) candle to completely engulf the first (bearish) candle — its body must close above the first candle's open.",
  },
  {
    q: "What does 'POC' stand for in Volume Profile?",
    options: ["Point of Control", "Price of Consolidation", "Pivot of Convergence", "Period of Correction"],
    correct: 0, chosen: 0, marks: 3,
    explanation: "POC (Point of Control) is the price level with the highest traded volume in the profile. It acts as a major magnet for price.",
  },
  {
    q: "A stock is trading above its 200-day SMA. This typically signals:",
    options: ["Short-term bearish bias", "Long-term bullish bias", "High volatility expected", "Support breakdown confirmed"],
    correct: 1, chosen: 1, marks: 2,
    explanation: "When a stock trades above its 200-day SMA, it is considered to be in a long-term uptrend — a bullish bias. Below is bearish bias.",
  },
  {
    q: "Support and Resistance levels are LEAST reliable when:",
    options: ["Price approaches them multiple times", "Volume is very low during the test", "They align with round numbers", "They coincide with Fibonacci levels"],
    correct: 1, chosen: 3, marks: 2,
    explanation: "Support/Resistance with low volume tests are weak because the level hasn't been truly tested by market participants. High volume at a level confirms its strength.",
  },
];

export function QuizResultsDetail() {
  const score = questions.reduce((acc, q) => acc + (q.chosen === q.correct ? q.marks : 0), 0);
  const total = questions.reduce((acc, q) => acc + q.marks, 0);
  const pct = Math.round((score / total) * 100);
  const correct = questions.filter(q => q.chosen === q.correct).length;

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
      <div className="px-4 pt-3 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <p className="text-white font-semibold text-base">Quiz Results</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Quiz 4 — Technical Analysis</p>
          </div>
          <button style={{ color: "#64748B" }}><Share2 className="w-4 h-4" /></button>
        </div>

        {/* Score ring */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="38" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
              <circle cx="48" cy="48" r="38"
                stroke={pct >= 80 ? EMERALD : pct >= 60 ? AMBER : RED}
                strokeWidth="8" fill="none"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - pct / 100)}`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{pct}%</span>
              <span className="text-[9px]" style={{ color: "#64748B" }}>Score</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-white font-bold text-lg">{score}/{total} marks</p>
              <p className="text-[11px]" style={{ color: pct >= 80 ? EMERALD : pct >= 60 ? AMBER : RED }}>
                {pct >= 80 ? "🎉 Excellent work!" : pct >= 60 ? "Good effort, review mistakes" : "Needs improvement — revise the module"}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <p className="text-lg font-black" style={{ color: EMERALD }}>{correct}</p>
                <p className="text-[9px]" style={{ color: "#64748B" }}>Correct</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black" style={{ color: RED }}>{questions.length - correct}</p>
                <p className="text-[9px]" style={{ color: "#64748B" }}>Wrong</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black" style={{ color: AMBER }}>18m</p>
                <p className="text-[9px]" style={{ color: "#64748B" }}>Time</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black" style={{ color: PURPLE }}>#3</p>
                <p className="text-[9px]" style={{ color: "#64748B" }}>Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-3">
        {/* Batch comparison */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: TEXT }}>Batch Comparison</p>
          <div className="flex items-center gap-3">
            {[
              { label: "Your Score", value: `${pct}%`, color: PRIMARY },
              { label: "Batch Avg", value: "74%", color: MUTED },
              { label: "Top Score", value: "96%", color: AMBER },
            ].map((item) => (
              <div key={item.label} className="flex-1 text-center py-2 rounded-xl" style={{ background: BG }}>
                <p className="text-base font-black" style={{ color: item.color }}>{item.value}</p>
                <p className="text-[9px]" style={{ color: MUTED }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <p className="text-xs font-semibold px-1" style={{ color: TEXT }}>Question Review</p>
        {questions.map((q, i) => {
          const isCorrect = q.chosen === q.correct;
          return (
            <div key={i} className="rounded-2xl p-4 space-y-3" style={{ background: CARD, border: `1px solid ${isCorrect ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: isCorrect ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)" }}>
                  {isCorrect
                    ? <CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                    : <XCircle className="w-3.5 h-3.5" style={{ color: RED }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold" style={{ color: MUTED }}>Q{i + 1}</span>
                    <span className="text-[10px] font-bold" style={{ color: isCorrect ? EMERALD : RED }}>
                      {isCorrect ? `+${q.marks}` : "0"}/{q.marks} marks
                    </span>
                  </div>
                  <p className="text-xs font-medium mt-1 leading-snug" style={{ color: TEXT }}>{q.q}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isChosen = oi === q.chosen;
                  const isCorrectOpt = oi === q.correct;
                  let bg = BG;
                  let border = BORDER;
                  let textColor = TEXT2;
                  if (isCorrectOpt) { bg = "rgba(16,185,129,0.08)"; border = EMERALD; textColor = EMERALD; }
                  else if (isChosen && !isCorrectOpt) { bg = "rgba(239,68,68,0.08)"; border = RED; textColor = RED; }
                  return (
                    <div key={oi} className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background: bg, border: `1px solid ${border}` }}>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-black"
                        style={{ background: isCorrectOpt ? EMERALD : isChosen ? RED : BORDER, color: isCorrectOpt || isChosen ? "#fff" : MUTED }}>
                        {["A","B","C","D"][oi]}
                      </div>
                      <span className="text-[11px] flex-1" style={{ color: textColor }}>{opt}</span>
                      {isCorrectOpt && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />}
                      {isChosen && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RED }} />}
                    </div>
                  );
                })}
              </div>

              <div className="px-3 py-2.5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: `1px solid rgba(37,99,235,0.12)` }}>
                <p className="text-[10px] leading-relaxed" style={{ color: TEXT2 }}>
                  <span className="font-bold" style={{ color: PRIMARY }}>Explanation: </span>{q.explanation}
                </p>
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm" style={{ background: CARD, border: `1px solid ${BORDER}`, color: PRIMARY }}>
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </button>
          <button className="flex-1 py-3 rounded-2xl font-bold text-sm text-white" style={{ background: PRIMARY }}>
            Back to Course
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
