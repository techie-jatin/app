import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Plus, Trash2, CheckCircle, Circle, Check } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";
const LABELS = ["A", "B", "C", "D"];
const LABEL_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

type DraftOption = { text: string; correct: boolean };
type DraftQuestion = { id: string; text: string; options: DraftOption[]; marks: number };

function makeQ(): DraftQuestion {
  return { id: Date.now().toString() + Math.random(), text: "", options: LABELS.map(() => ({ text: "", correct: false })), marks: 4 };
}

export function FacultyCreateQuiz() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { batches, addQuiz } = useApp();
  const { user } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ title: "", batchId: "", duration: "30", dueDate: "" });
  const [questions, setQuestions] = useState<DraftQuestion[]>([makeQ()]);
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const addQ = () => setQuestions(p => [...p, makeQ()]);
  const removeQ = (id: string) => questions.length > 1 && setQuestions(p => p.filter(q => q.id !== id));
  const updateQ = (id: string, field: string, val: string | number) => setQuestions(p => p.map(q => q.id === id ? { ...q, [field]: val } : q));
  const updateOpt = (qId: string, oi: number, text: string) =>
    setQuestions(p => p.map(q => q.id === qId ? { ...q, options: q.options.map((o, i) => i === oi ? { ...o, text } : o) } : q));
  const setCorrect = (qId: string, oi: number) =>
    setQuestions(p => p.map(q => q.id === qId ? { ...q, options: q.options.map((o, i) => ({ ...o, correct: i === oi })) } : q));

  const handlePublish = (status: "draft" | "published") => {
    if (!form.title || !form.batchId) { toast("Title and batch required", "error"); return; }
    if (!form.dueDate) { toast("Due date required", "error"); return; }
    const validQs = questions.filter(q => q.text.trim() && q.options.some(o => o.correct));
    if (!validQs.length) { toast("Add at least one question with a correct answer", "error"); return; }
    const quizQuestions = validQs.map(q => ({
      id: q.id,
      question: q.text,
      marks: q.marks,
      options: q.options.map((o, i) => ({ id: `${q.id}-opt-${i}`, text: o.text, isCorrect: o.correct })),
    }));
    addQuiz({ title: form.title, batchId: form.batchId, facultyId: user?.id || "", questions: quizQuestions, duration: parseInt(form.duration) || 30, dueDate: form.dueDate, status });
    toast(status === "published" ? "Quiz published!" : "Draft saved");
    nav("/faculty/dashboard");
  };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <button onClick={() => nav("/faculty/dashboard")} className="p-1.5 rounded-lg" style={{ background: SURFACE }}>
              <ArrowLeft className="w-4 h-4" style={{ color: MUTED }} />
            </button>
            <div>
              <h1 className="text-base font-bold" style={{ color: TEXT }}>Create Quiz</h1>
              <p className="text-xs" style={{ color: MUTED }}>{questions.length} question{questions.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handlePublish("draft")} className="px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Save Draft</button>
            <button onClick={() => handlePublish("published")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#0F766E" }}>
              <Check className="w-4 h-4" /> Publish
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {questions.map((q, qi) => (
                <div key={q.id} className="rounded-xl p-5 space-y-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: "rgba(20,184,166,0.1)", color: "#14B8A6" }}>Q{qi + 1}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs" style={{ color: MUTED }}>Marks:</span>
                        <input type="number" value={q.marks} onChange={e => updateQ(q.id, "marks", parseInt(e.target.value) || 1)} min="1" max="20"
                          className="w-12 px-1.5 py-0.5 rounded text-xs text-center outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                      </div>
                    </div>
                    {questions.length > 1 && (
                      <button onClick={() => removeQ(q.id)} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }}>
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                      </button>
                    )}
                  </div>
                  <textarea value={q.text} onChange={e => updateQ(q.id, "text", e.target.value)} rows={2} placeholder="Enter question…"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <button onClick={() => setCorrect(q.id, oi)} className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: opt.correct ? `${LABEL_COLORS[oi]}20` : SURFACE, border: `2px solid ${opt.correct ? LABEL_COLORS[oi] : BORDER}` }}>
                          {opt.correct ? <CheckCircle className="w-3.5 h-3.5" style={{ color: LABEL_COLORS[oi] }} /> : <Circle className="w-3.5 h-3.5" style={{ color: MUTED }} />}
                        </button>
                        <span className="w-5 text-xs font-bold" style={{ color: LABEL_COLORS[oi] }}>{LABELS[oi]}</span>
                        <input value={opt.text} onChange={e => updateOpt(q.id, oi, e.target.value)} placeholder={`Option ${LABELS[oi]}`}
                          className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${opt.correct ? `${LABEL_COLORS[oi]}60` : BORDER}`, color: TEXT }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={addQ} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm border-2 border-dashed" style={{ borderColor: BORDER, color: MUTED }}>
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl p-4 space-y-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Quiz Settings</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Title *</label>
                  <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Options Chain Quiz 1"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Target Batch *</label>
                  <select value={form.batchId} onChange={e => upd("batchId", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.batchId ? TEXT : MUTED }}>
                    <option value="">Select batch…</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Duration (min)</label>
                    <input type="number" value={form.duration} onChange={e => upd("duration", e.target.value)} min="5"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Due Date *</label>
                    <input type="date" value={form.dueDate} onChange={e => upd("dueDate", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: TEXT }}>Summary</h3>
                <div className="space-y-2">
                  {[
                    { label: "Questions", value: questions.length },
                    { label: "With answers", value: questions.filter(q => q.options.some(o => o.correct)).length },
                    { label: "Total marks", value: questions.reduce((s, q) => s + q.marks, 0) },
                    { label: "Duration", value: `${form.duration} min` },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between text-xs">
                      <span style={{ color: MUTED }}>{s.label}</span>
                      <span style={{ color: TEXT }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
