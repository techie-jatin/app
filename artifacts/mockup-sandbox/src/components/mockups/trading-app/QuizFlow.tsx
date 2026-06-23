import { ChevronLeft, Clock, CheckCircle, XCircle, TrendingUp, BookOpen, Calendar, BarChart2, Award, Trophy } from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#EF4444";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const question = {
  number: 7, total: 15,
  text: "Which of the following best describes a 'double top' pattern in technical analysis?",
  options: [
    { id: "A", text: "A bullish reversal pattern formed after a downtrend" },
    { id: "B", text: "A bearish reversal pattern with two peaks at roughly the same price level" },
    { id: "C", text: "A continuation pattern indicating a strong uptrend" },
    { id: "D", text: "A pattern indicating a stock consolidating before a breakout" },
  ],
  selected: "B", correct: "B",
};

export function QuizFlow() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] font-medium text-white opacity-60">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0" style={{ background: NAVY }}>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Quiz 3 — Support & Resistance</p>
          <p className="text-xs" style={{ color: "#64748B" }}>Advanced Trading A</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(239,68,68,0.15)" }}>
          <Clock className="w-3.5 h-3.5" style={{ color: RED }} />
          <span className="text-xs font-bold" style={{ color: RED }}>05:28</span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 py-4 flex-shrink-0 bg-white" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: TEXT2 }}>Question {question.number} of {question.total}</span>
          <span className="text-xs" style={{ color: MUTED }}>{Math.round((question.number / question.total) * 100)}% complete</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
          <div className="h-full rounded-full" style={{ width: `${(question.number / question.total) * 100}%`, background: PRIMARY }} />
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {Array.from({ length: question.total }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center"
              style={i < question.number - 1 ? { background: EMERALD, color: "#fff" } : i === question.number - 1 ? { background: PRIMARY, color: "#fff" } : { background: "#E2E8F0", color: MUTED }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="px-5 pt-4 flex-shrink-0">
        <div className="rounded-2xl p-4 mb-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-lg text-white text-xs font-bold flex items-center justify-center" style={{ background: PRIMARY }}>Q</span>
            <p className="text-sm leading-relaxed font-medium" style={{ color: TEXT }}>{question.text}</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-5 flex-1 overflow-y-auto space-y-2.5 pb-4">
        {question.options.map((opt) => {
          const isSelected = opt.id === question.selected;
          const isCorrect = opt.id === question.correct;
          return (
            <button key={opt.id} className="w-full flex items-start gap-3 rounded-2xl px-4 py-3.5 text-left"
              style={isSelected && isCorrect ? { background: "rgba(16,185,129,0.08)", border: `1.5px solid ${EMERALD}` }
                : isSelected ? { background: "rgba(239,68,68,0.08)", border: `1.5px solid ${RED}` }
                : { background: CARD, border: `1.5px solid ${BORDER}` }}>
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border"
                style={isSelected && isCorrect ? { background: EMERALD, borderColor: EMERALD, color: "#fff" }
                  : isSelected ? { background: RED, borderColor: RED, color: "#fff" }
                  : { background: BG, borderColor: BORDER, color: MUTED }}>
                {opt.id}
              </span>
              <p className="text-sm leading-snug flex-1"
                style={{ color: isSelected && isCorrect ? EMERALD : isSelected ? RED : TEXT2 }}>
                {opt.text}
              </p>
              {isSelected && isCorrect && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />}
              {isSelected && !isCorrect && <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RED }} />}
            </button>
          );
        })}

        {question.selected && (
          <div className="rounded-2xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.06)", border: `1px solid rgba(16,185,129,0.2)` }}>
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
              <span className="text-xs font-semibold" style={{ color: EMERALD }}>Correct!</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
              A double top is a bearish reversal chart pattern that forms after an asset reaches a high price twice with a moderate decline between the two highs.
            </p>
          </div>
        )}
      </div>

      {/* Next */}
      <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${BORDER}`, background: CARD }}>
        <button className="w-full py-4 rounded-2xl text-white font-bold text-sm" style={{ background: PRIMARY }}>
          Next Question →
        </button>
      </div>
    </div>
  );
}
