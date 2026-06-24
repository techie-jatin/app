import { useState } from "react";
import { Plus, Search, FileText, Clock, CheckCircle, XCircle, Eye, Filter } from "lucide-react";
import { useLocation } from "wouter";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  active:    { color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  label: "Active" },
  reviewed:  { color: "#10B981", bg: "rgba(16,185,129,0.1)",  label: "Reviewed" },
  pending:   { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  label: "Pending" },
  draft:     { color: MUTED,     bg: SURFACE,                  label: "Draft" },
};

export function AdminAssignmentReview() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [marks, setMarks] = useState("");
  const { assignments, batches, faculty, students, updateAssignment } = useApp();
  const toast = useToast();

  const filtered = assignments.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q);
    const matchF = filter === "all" || a.status === filter;
    return matchQ && matchF;
  });

  const sel = assignments.find(a => a.id === selected);
  const selBatch = batches.find(b => b.id === sel?.batchId);
  const selFaculty = faculty.find(f => f.id === sel?.facultyId);
  const batchStudents = sel ? students.filter(s => s.batchId === sel.batchId).slice(0, 6) : [];

  const handleReview = (status: "reviewed" | "pending") => {
    if (!sel) return;
    updateAssignment(sel.id, { status });
    toast(`Assignment marked as ${status}`);
    setSelected(null);
    setFeedback(""); setMarks("");
  };

  const counts = { all: assignments.length, active: assignments.filter(a => a.status === "active").length, reviewed: assignments.filter(a => a.status === "reviewed").length, pending: assignments.filter(a => a.status === "pending").length };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Assignment Review</h1>
              <p className="text-xs" style={{ color: MUTED }}>{assignments.length} assignments</p>
            </div>
          </div>
          <button onClick={() => nav("/admin/assignments/create")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Create
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-80 flex-shrink-0 flex flex-col" style={{ borderRight: `1px solid ${BORDER}` }}>
            <div className="p-3 space-y-2 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE }}>
                <Search className="w-4 h-4" style={{ color: MUTED }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(["all", "active", "reviewed", "pending"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className="px-2.5 py-1 rounded-lg text-xs capitalize" style={{ background: filter === f ? "#2563EB" : SURFACE, color: filter === f ? TEXT : MUTED }}>
                    {f} ({counts[f] ?? assignments.length})
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: BORDER }}>
              {filtered.map(a => {
                const batch = batches.find(b => b.id === a.batchId);
                const cfg = STATUS_CFG[a.status as keyof typeof STATUS_CFG] || STATUS_CFG.draft;
                return (
                  <div key={a.id} onClick={() => setSelected(a.id)} className="p-4 cursor-pointer hover:bg-white/[0.02] transition"
                    style={{ background: selected === a.id ? "rgba(37,99,235,0.08)" : "transparent" }}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium leading-snug" style={{ color: TEXT }}>{a.title}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                    </div>
                    <p className="text-xs" style={{ color: MUTED }}>{batch?.name || "No batch"} · Due: {a.dueDate}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>Max: {a.maxMarks} marks</p>
                  </div>
                );
              })}
              {!filtered.length && <p className="p-4 text-sm" style={{ color: MUTED }}>No assignments found</p>}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {sel ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-bold" style={{ color: TEXT }}>{sel.title}</h2>
                  <p className="text-sm mt-0.5" style={{ color: MUTED }}>
                    {selBatch?.name || "—"} · {selFaculty?.name || "—"} · Due {sel.dueDate}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Max Marks", value: sel.maxMarks },
                    { label: "Batch Students", value: batchStudents.length },
                    { label: "Status", value: sel.status },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <p className="text-xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl p-4 space-y-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-sm font-semibold" style={{ color: TEXT }}>Review Panel</h3>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Marks Awarded</label>
                    <input type="number" value={marks} onChange={e => setMarks(e.target.value)} placeholder={`0 – ${sel.maxMarks}`} max={sel.maxMarks} min={0}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Feedback</label>
                    <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={3} placeholder="Write feedback for the student…"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleReview("reviewed")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#10B981" }}>
                      <CheckCircle className="w-4 h-4" /> Mark Reviewed
                    </button>
                    <button onClick={() => handleReview("pending")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium" style={{ background: SURFACE, color: MUTED }}>
                      <Clock className="w-4 h-4" /> Mark Pending
                    </button>
                  </div>
                </div>

                {batchStudents.length > 0 && (
                  <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="px-4 py-3 text-xs font-semibold" style={{ color: MUTED, borderBottom: `1px solid ${BORDER}` }}>BATCH STUDENTS</p>
                    {batchStudents.map(s => (
                      <div key={s.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                          {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <p className="flex-1 text-sm" style={{ color: TEXT }}>{s.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: SURFACE, color: MUTED }}>Submitted</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: MUTED }} />
                  <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>Select an Assignment</p>
                  <p className="text-xs" style={{ color: MUTED }}>Choose from the list to review it</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
