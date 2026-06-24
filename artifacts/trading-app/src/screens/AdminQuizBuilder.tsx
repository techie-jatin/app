import {
  BarChart2, Users, GraduationCap, Layers, BookOpen, Calendar,
  Bell, Award, TrendingUp, Plus, Trash2, ChevronDown,
  Clock, CheckCircle, Circle, HelpCircle, Copy, Eye
} from "lucide-react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", active: true, path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const questions = [
  {
    q: "What does RSI stand for in technical analysis?",
    options: ["Relative Strength Index", "Relative Support Indicator", "Rate of Signal Intensity", "Risk-Scaled Index"],
    correct: 0, marks: 2,
  },
  {
    q: "A 'Head and Shoulders' pattern is considered a:",
    options: ["Continuation pattern", "Reversal pattern", "Consolidation pattern", "Volume pattern"],
    correct: 1, marks: 2,
  },
  {
    q: "In options trading, when a trader buys a call option, they profit when the stock price:",
    options: ["Falls significantly", "Stays flat", "Rises above the strike price", "Approaches the strike from above"],
    correct: 2, marks: 3,
  },
];

const optionLabels = ["A", "B", "C", "D"];

const recentQuizzes = [
  { title: "Quiz 4 — Technical Analysis", batch: "Advanced Trading A", questions: 10, status: "Published", attempts: "39/42" },
  { title: "Quiz 3 — Candlestick Patterns", batch: "Advanced Trading A", questions: 8, status: "Published", attempts: "42/42" },
  { title: "Quiz 2 — Market Basics", batch: "Fundamentals B", questions: 6, status: "Published", attempts: "22/24" },
];

export function AdminQuizBuilder() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PRIMARY }}>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#60A5FA", borderLeft: `3px solid ${PRIMARY}` } : { color: MUTED }}>
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
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Quiz Builder</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Create and publish MCQ quizzes to any batch · Auto-evaluated with instant results</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>Save Draft</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: PRIMARY }}>
              Publish Quiz
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Builder */}
            <div className="col-span-3 space-y-4">
              {/* Quiz settings */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Quiz Settings</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Quiz Title *</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${PRIMARY}`, boxShadow: "0 0 0 3px rgba(37,99,235,0.08)" }}>
                      <span className="text-sm" style={{ color: TEXT }}>Quiz 5 — Options Chain & Derivatives</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Target Batch *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Time Limit</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Clock className="w-4 h-4" style={{ color: AMBER }} />
                      <span className="text-sm" style={{ color: TEXT }}>25 minutes</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Passing Marks</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>14 / 20 (70%)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Available From</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Jun 26, 2025 · 9:00 AM</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Closes On</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Jun 28, 2025 · 11:59 PM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: `1px solid ${BORDER2}` }}>
                  {[
                    { label: "Shuffle questions", on: true },
                    { label: "Shuffle options", on: true },
                    { label: "Show result immediately", on: true },
                    { label: "Allow reattempt", on: false },
                  ].map((s) => (
                    <label key={s.label} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-8 h-4 rounded-full relative flex-shrink-0" style={{ background: s.on ? PRIMARY : BORDER2 }}>
                        <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" style={{ left: s.on ? "17px" : "2px" }} />
                      </div>
                      <span className="text-[10px]" style={{ color: MUTED }}>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Questions */}
              {questions.map((q, qi) => (
                <div key={qi} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA" }}>Q{qi + 1}</div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg" style={{ background: SURFACE }}>
                        <span className="text-xs font-semibold" style={{ color: AMBER }}>{q.marks} marks</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button style={{ color: MUTED }}><Copy className="w-4 h-4" /></button>
                      <button style={{ color: MUTED }}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="px-4 py-3 rounded-xl mb-4" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm" style={{ color: TEXT }}>{q.q}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{
                          background: oi === q.correct ? "rgba(16,185,129,0.08)" : SURFACE,
                          border: `1px solid ${oi === q.correct ? EMERALD : BORDER2}`,
                        }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0"
                          style={{ background: oi === q.correct ? EMERALD : BORDER2, color: oi === q.correct ? "#fff" : MUTED }}>
                          {optionLabels[oi]}
                        </div>
                        <span className="text-xs flex-1" style={{ color: oi === q.correct ? EMERALD : TEXT2 }}>{opt}</span>
                        {oi === q.correct && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EMERALD }} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm"
                style={{ background: "rgba(37,99,235,0.06)", border: `2px dashed rgba(37,99,235,0.3)`, color: "#60A5FA" }}>
                <Plus className="w-4 h-4" /> Add New Question
              </button>
            </div>

            {/* Right panel */}
            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Summary</p>
                <div className="space-y-3">
                  {[
                    { label: "Questions", value: `${questions.length} of target 10`, color: "#60A5FA" },
                    { label: "Total Marks", value: `${questions.reduce((a, q) => a + q.marks, 0)} marks`, color: AMBER },
                    { label: "Time", value: "25 minutes", color: PURPLE },
                    { label: "Pass Mark", value: "14 marks (70%)", color: EMERALD },
                    { label: "Target Batch", value: "Advanced Trading A", color: TEXT2 },
                    { label: "Students", value: "42 students", color: TEXT2 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: MUTED }}>{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <p className="text-[10px]" style={{ color: AMBER }}>⚠️ Add {10 - questions.length} more questions to reach 10 before publishing</p>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Recent Quizzes</p>
                <div className="space-y-2.5">
                  {recentQuizzes.map((q, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: SURFACE }}>
                      <p className="text-xs font-semibold" style={{ color: TEXT }}>{q.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px]" style={{ color: MUTED }}>{q.batch} · {q.questions}Q · {q.attempts}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>{q.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
