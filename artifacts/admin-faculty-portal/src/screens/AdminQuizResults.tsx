import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Search, HelpCircle, Clock, Users, TrendingUp, ChevronRight } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  active:    { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  draft:     { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  completed: { color: MUTED,     bg: SURFACE },
};

export function AdminQuizResults() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const { quizzes, batches, students } = useApp();
  const toast = useToast();

  const filtered = quizzes.filter(q => !search || q.title.toLowerCase().includes(search.toLowerCase()));
  const sel = quizzes.find(q => q.id === selected);
  const selBatch = batches.find(b => b.id === sel?.batchId);
  const selStudents = sel ? students.filter(s => s.batchId === sel.batchId) : [];

  const mockResults = selStudents.map((s, i) => ({
    student: s,
    score: Math.floor(55 + Math.random() * 45),
    time: `${Math.floor(15 + Math.random() * 15)}m ${Math.floor(Math.random() * 60)}s`,
    attempts: 1,
  }));
  const avgScore = mockResults.length ? Math.round(mockResults.reduce((s, r) => s + r.score, 0) / mockResults.length) : 0;
  const passed = mockResults.filter(r => r.score >= 60).length;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Quiz Results</h1>
              <p className="text-xs" style={{ color: MUTED }}>{quizzes.length} quizzes</p>
            </div>
          </div>
          <button onClick={() => nav("/admin/quiz/builder")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Create Quiz
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-80 flex-shrink-0 flex flex-col" style={{ borderRight: `1px solid ${BORDER}` }}>
            <div className="p-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE }}>
                <Search className="w-4 h-4" style={{ color: MUTED }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quizzes…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: BORDER }}>
              {filtered.map(q => {
                const batch = batches.find(b => b.id === q.batchId);
                const cfg = STATUS_CFG[q.status as keyof typeof STATUS_CFG] || STATUS_CFG.draft;
                return (
                  <div key={q.id} onClick={() => setSelected(q.id)} className="p-4 cursor-pointer hover:bg-white/[0.02] transition"
                    style={{ background: selected === q.id ? "rgba(37,99,235,0.08)" : "transparent" }}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium leading-snug" style={{ color: TEXT }}>{q.title}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 capitalize" style={{ background: cfg.bg, color: cfg.color }}>{q.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: MUTED }}>
                      <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3" />{q.questions.length}Q</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{q.duration}m</span>
                    </div>
                    {batch && <p className="text-xs mt-1" style={{ color: MUTED }}>{batch.name}</p>}
                  </div>
                );
              })}
              {!filtered.length && (
                <div className="py-12 text-center">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                  <p className="text-sm" style={{ color: MUTED }}>No quizzes found</p>
                  <button onClick={() => nav("/admin/quiz/builder")} className="mt-2 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "#2563EB" }}>Create One</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {sel ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-bold" style={{ color: TEXT }}>{sel.title}</h2>
                  <p className="text-sm mt-0.5" style={{ color: MUTED }}>
                    {selBatch?.name || "—"} · {sel.questions.length} questions · {sel.duration} min
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Enrolled", value: selStudents.length, color: "#3B82F6" },
                    { label: "Avg Score", value: `${avgScore}%`, color: "#10B981" },
                    { label: "Passed", value: passed, color: "#F59E0B" },
                    { label: "Time Limit", value: `${sel.duration}m`, color: "#8B5CF6" },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="text-sm font-semibold" style={{ color: TEXT }}>Student Results</p>
                    <button onClick={() => toast("Export coming soon", "info")} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: SURFACE, color: MUTED }}>Export CSV</button>
                  </div>
                  {mockResults.length ? (
                    <div className="divide-y" style={{ borderColor: BORDER }}>
                      {mockResults.map((r, i) => (
                        <div key={r.student.id} className="flex items-center gap-3 px-5 py-3">
                          <span className="w-5 text-xs" style={{ color: MUTED }}>#{i + 1}</span>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                            {r.student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <p className="flex-1 text-sm" style={{ color: TEXT }}>{r.student.name}</p>
                          <div className="w-24">
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                              <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: r.score >= 60 ? "#10B981" : "#EF4444" }} />
                            </div>
                          </div>
                          <span className="w-12 text-right text-sm font-bold" style={{ color: r.score >= 60 ? "#10B981" : "#EF4444" }}>{r.score}%</span>
                          <span className="text-xs" style={{ color: MUTED }}>{r.time}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                      <p className="text-sm" style={{ color: MUTED }}>No students in this batch yet</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3" style={{ color: MUTED }} />
                  <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>Select a Quiz</p>
                  <p className="text-xs" style={{ color: MUTED }}>Choose from the list to view results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
