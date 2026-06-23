import {
  ChevronLeft, Clock, CheckCircle, XCircle, TrendingUp,
  BookOpen, Calendar, BarChart2, Award, AlertCircle, Trophy
} from "lucide-react";

const question = {
  number: 7,
  total: 15,
  text: "Which of the following best describes a 'double top' pattern in technical analysis?",
  options: [
    { id: "A", text: "A bullish reversal pattern formed after a downtrend" },
    { id: "B", text: "A bearish reversal pattern with two peaks at roughly the same price level" },
    { id: "C", text: "A continuation pattern indicating a strong uptrend" },
    { id: "D", text: "A pattern indicating a stock consolidating before a breakout" },
  ],
  selected: "B",
  correct: "B",
};

const resultData = {
  score: 12,
  total: 15,
  percent: 80,
  timeTaken: "14:32",
  correct: 12,
  incorrect: 2,
  skipped: 1,
};

// Toggle between "quiz" and "result" modes
const mode: "quiz" | "result" = "quiz";

export function QuizFlow() {
  if (mode === "result") {
    return <QuizResult />;
  }
  return <QuizQuestion />;
}

function QuizQuestion() {
  return (
    <div className="w-[390px] h-[844px] bg-slate-950 font-['Inter'] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-slate-400 text-[11px] font-medium">9:41</span>
        <div className="w-4 h-2 border border-slate-500 rounded-[2px] relative"><div className="absolute inset-0.5 left-0.5 bg-slate-400 rounded-[1px] w-2/3" /></div>
      </div>

      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0 border-b border-slate-800">
        <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Quiz 3 — Support & Resistance</p>
          <p className="text-slate-500 text-xs">Advanced Trading A</p>
        </div>
        <div className="flex items-center gap-1.5 bg-red-500/15 px-2.5 py-1.5 rounded-xl">
          <Clock className="w-3.5 h-3.5 text-red-400" />
          <span className="text-red-400 text-xs font-bold">05:28</span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-xs">Question {question.number} of {question.total}</span>
          <span className="text-slate-400 text-xs">{Math.round((question.number / question.total) * 100)}% complete</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all"
            style={{ width: `${(question.number / question.total) * 100}%` }}
          />
        </div>
        {/* Question dots */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {Array.from({ length: question.total }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${
                i < question.number - 1 ? "bg-emerald-500 text-white" :
                i === question.number - 1 ? "bg-amber-500 text-white" :
                "bg-slate-800 text-slate-600"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="px-5 flex-shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2 mb-3">
            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-lg text-white text-xs font-bold flex items-center justify-center">Q</span>
            <p className="text-white text-sm leading-relaxed font-medium">{question.text}</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-5 flex-1 overflow-y-auto space-y-2.5 pb-4">
        {question.options.map((opt) => {
          const isSelected = opt.id === question.selected;
          const isCorrect = opt.id === question.correct;
          return (
            <button
              key={opt.id}
              className={`w-full flex items-start gap-3 rounded-2xl px-4 py-3.5 text-left border transition-all ${
                isSelected && isCorrect
                  ? "bg-emerald-500/15 border-emerald-500/40"
                  : isSelected && !isCorrect
                  ? "bg-red-500/15 border-red-500/40"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                isSelected && isCorrect
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : isSelected && !isCorrect
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}>
                {opt.id}
              </span>
              <p className={`text-sm leading-snug flex-1 ${
                isSelected && isCorrect ? "text-emerald-300" :
                isSelected && !isCorrect ? "text-red-300" :
                "text-slate-300"
              }`}>
                {opt.text}
              </p>
              {isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
              {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
            </button>
          );
        })}

        {/* Explanation */}
        {question.selected && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mt-1">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold">Correct!</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              A double top is a bearish reversal chart pattern that forms after an asset reaches a high price twice with a moderate decline between the two highs.
            </p>
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="px-5 py-4 flex-shrink-0 border-t border-slate-800">
        <button className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-2xl text-sm transition-colors">
          Next Question →
        </button>
      </div>
    </div>
  );
}

function QuizResult() {
  return (
    <div className="w-[390px] h-[844px] bg-slate-950 font-['Inter'] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-slate-400 text-[11px] font-medium">9:41</span>
        <div className="w-4 h-2 border border-slate-500 rounded-[2px] relative"><div className="absolute inset-0.5 left-0.5 bg-slate-400 rounded-[1px] w-2/3" /></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Trophy */}
        <div className="flex flex-col items-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-1">Great Job!</h2>
          <p className="text-slate-400 text-sm">Quiz 3 — Support & Resistance</p>
          <div className="mt-4 text-center">
            <span className="text-6xl font-black text-amber-400">{resultData.percent}%</span>
            <p className="text-slate-500 text-sm mt-1">{resultData.score} / {resultData.total} correct</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Correct", value: resultData.correct, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "Wrong", value: resultData.incorrect, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
            { label: "Skipped", value: resultData.skipped, color: "text-slate-400", bg: "bg-slate-800 border-slate-700" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 border text-center ${s.bg}`}>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span className="text-slate-500 text-sm">Time Taken</span>
            <span className="text-white font-semibold text-sm">{resultData.timeTaken}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-500 text-sm">Result</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" /> Passed
            </span>
          </div>
        </div>

        <button className="w-full bg-amber-500 text-white font-bold py-4 rounded-2xl text-sm mb-3">
          View Detailed Report
        </button>
        <button className="w-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold py-4 rounded-2xl text-sm">
          Back to Course
        </button>
      </div>
    </div>
  );
}
