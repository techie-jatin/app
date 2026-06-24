import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  Users, BarChart2, Bell, GraduationCap,
  Upload, Video, Plus, Trash2, ChevronDown, Clock, CheckCircle, Circle
} from "lucide-react";
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
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/dashboard" },
  { icon: BookOpen, label: "My Batches", path: "/faculty/dashboard" },
  { icon: Upload, label: "Upload Lecture", path: "/faculty/upload" },
  { icon: HelpCircle, label: "Create Quiz", active: true, path: "/faculty/quiz" },
  { icon: FileText, label: "Assignments", path: "/faculty/assignment" },
  { icon: Video, label: "Live Session", path: "/faculty/live" },
  { icon: Users, label: "Attendance", path: "/faculty/attendance" },
  { icon: BarChart2, label: "Progress", path: "/faculty/progress" },
  { icon: Bell, label: "Notifications", path: "/faculty/dashboard" },
];

const questions = [
  {
    q: "Which indicator is primarily used to identify overbought and oversold conditions?",
    options: ["MACD", "RSI", "Bollinger Bands", "Volume Profile"],
    correct: 1,
    marks: 2,
  },
  {
    q: "In a bullish engulfing pattern, the second candle should:",
    options: ["Close below the first candle's open", "Close above the first candle's open", "Have equal highs", "Show a doji formation"],
    correct: 1,
    marks: 2,
  },
  {
    q: "What does POC stand for in Volume Profile analysis?",
    options: ["Point of Control", "Price of Consolidation", "Pivot of Convergence", "Period of Correction"],
    correct: 0,
    marks: 3,
  },
];

const optionLabels = ["A", "B", "C", "D"];
const optionColors = [TEAL2, PURPLE, AMBER, "#EC4899"];

export function FacultyCreateQuiz() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: TEAL }}>
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: TEAL2 }}>Faculty Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-4" style={{ background: SURFACE }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: TEAL }}>AK</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: TEXT }}>Dr. Anand Kumar</p>
            <p className="text-[10px] truncate" style={{ color: TEAL2 }}>Senior Mentor</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(13,148,136,0.15)", color: TEAL2, borderLeft: `3px solid ${TEAL2}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Create Quiz</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Build an MCQ quiz with timer and auto-evaluation</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>Save Draft</button>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: TEAL }}>Publish Quiz</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Questions panel */}
            <div className="col-span-3 space-y-4">
              {/* Quiz meta */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Quiz Settings</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Quiz Title</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Quiz 5 — Technical Analysis & Indicators</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assign to Batch</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Time Limit</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Clock className="w-4 h-4" style={{ color: AMBER }} />
                      <span className="text-sm" style={{ color: TEXT }}>20 minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions */}
              {questions.map((q, qi) => (
                <div key={qi} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(13,148,136,0.15)", color: TEAL2 }}>Q{qi + 1}</div>
                      <span className="text-xs font-semibold" style={{ color: TEXT2 }}>{q.marks} marks</span>
                    </div>
                    <button style={{ color: MUTED }}><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm font-medium mb-4" style={{ color: TEXT }}>{q.q}</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{
                          background: oi === q.correct ? "rgba(16,185,129,0.1)" : SURFACE,
                          border: `1px solid ${oi === q.correct ? EMERALD : BORDER2}`,
                        }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                          style={{ background: oi === q.correct ? EMERALD : BORDER2, color: oi === q.correct ? "#fff" : MUTED }}>
                          {optionLabels[oi]}
                        </div>
                        <span className="text-xs" style={{ color: oi === q.correct ? EMERALD : TEXT2 }}>{opt}</span>
                        {oi === q.correct && <CheckCircle className="w-3.5 h-3.5 ml-auto flex-shrink-0" style={{ color: EMERALD }} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add question */}
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm"
                style={{ background: "rgba(13,148,136,0.06)", border: `2px dashed rgba(13,148,136,0.3)`, color: TEAL2 }}>
                <Plus className="w-4 h-4" /> Add New Question
              </button>
            </div>

            {/* Sidebar summary */}
            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Quiz Summary</p>
                <div className="space-y-3">
                  {[
                    { label: "Total Questions", value: `${questions.length} of 10`, color: TEAL2 },
                    { label: "Total Marks", value: `${questions.reduce((a, q) => a + q.marks, 0)} marks`, color: AMBER },
                    { label: "Time Limit", value: "20 minutes", color: PURPLE },
                    { label: "Batch", value: "Advanced Trading A", color: TEXT2 },
                    { label: "Status", value: "Draft", color: AMBER },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: MUTED }}>{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Progress</p>
                <div className="space-y-2">
                  {[
                    { label: "Quiz title set", done: true },
                    { label: "Batch assigned", done: true },
                    { label: "Timer configured", done: true },
                    { label: "Min. 5 questions", done: false },
                    { label: "All answers marked", done: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      {item.done
                        ? <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
                        : <Circle className="w-4 h-4" style={{ color: BORDER2 }} />}
                      <span className="text-xs" style={{ color: item.done ? TEXT2 : MUTED }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <p className="text-[10px]" style={{ color: AMBER }}>⚠️ Add at least 2 more questions before publishing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
