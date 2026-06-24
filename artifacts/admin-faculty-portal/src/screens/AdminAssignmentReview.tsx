import { useState } from "react";
import { Plus, Search, FileText, Clock, CheckCircle, XCircle, Eye, Filter } from "lucide-react";
import { useLocation } from "wouter";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  open:      { color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  label: "Open" },
  graded:    { color: "#10B981", bg: "rgba(16,185,129,0.1)",  label: "Graded" },
  closed:    { color: MUTED,     bg: SURFACE,                  label: "Closed" },
  draft:     { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  label: "Draft" },
};

export function AdminAssignmentReview() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const { assignments, batches, faculty, students, updateAssignment, gradeSubmission } = useApp();
  const toast = useToast();
  const [studentMarks, setStudentMarks] = useState<Record<string, string>>({});
  const [studentFeedback, setStudentFeedback] = useState<Record<string, string>>({});

  const filtered = assignments.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q);
    const matchF = filter === "all" || a.status === filter;
    return matchQ && matchF;
  });

  const sel = assignments.find(a => a.id === selected);
  const selBatch = batches.find(b => b.id === sel?.batchId);
  const selFaculty = faculty.find(f => f.id === sel?.facultyId);
  const batchStudents = sel ? students.filter(s => s.batchId === sel.batchId) : [];

  const handleClose = () => {
    if (!sel) return;
    updateAssignment(sel.id, { status: "closed" });
    toast("Assignment closed");
    setSelected(null);
  };

  const handleGradeStudent = (studentId: string) => {
    if (!sel) return;
    const m = parseFloat(studentMarks[studentId] ?? "");
    if (isNaN(m) || m < 0 || m > sel.totalMarks) { toast(`Enter marks between 0 and ${sel.totalMarks}`, "error"); return; }
    gradeSubmission(sel.id, studentId, m, studentFeedback[studentId] ?? "");
    toast("Marks saved");
  };

  const handleMarkAllGraded = () => {
    if (!sel) return;
    updateAssignment(sel.id, { status: "graded" });
    toast("Assignment marked as graded");
  };

  const counts = { all: assignments.length, open: assignments.filter(a => a.status === "open").length, graded: assignments.filter(a => a.status === "graded").length, closed: assignments.filter(a => a.status === "closed").length };

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
                {([
                  { key: "all", label: "All" },
                  { key: "open", label: "Open" },
                  { key: "graded", label: "Graded" },
                  { key: "closed", label: "Closed" },
                ] as const).map(f => (
                  <button key={f.key} onClick={() => setFilter(f.key)} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: filter === f.key ? "#2563EB" : SURFACE, color: filter === f.key ? TEXT : MUTED }}>
                    {f.label} ({f.key === "all" ? counts.all : f.key === "open" ? counts.open : f.key === "graded" ? counts.graded : counts.closed})
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
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>Max: {a.totalMarks} marks</p>
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
                    { label: "Max Marks", value: sel.totalMarks },
                    { label: "Batch Students", value: batchStudents.length },
                    { label: "Status", value: sel.status },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <p className="text-xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="text-sm font-semibold" style={{ color: TEXT }}>Student Submissions</p>
                    <div className="flex gap-2">
                      <button onClick={handleMarkAllGraded} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: "#10B981" }}>
                        <CheckCircle className="w-3.5 h-3.5" /> Mark All Graded
                      </button>
                      <button onClick={handleClose} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: SURFACE, color: MUTED }}>
                        <Clock className="w-3.5 h-3.5" /> Close
                      </button>
                    </div>
                  </div>
                  {batchStudents.length === 0 ? (
                    <p className="p-4 text-sm text-center" style={{ color: MUTED }}>No students in this batch</p>
                  ) : (
                    <div className="divide-y" style={{ borderColor: BORDER }}>
                      {batchStudents.map(s => {
                        const sub = sel.submissions.find(sub => sub.studentId === s.id);
                        const subStatus = sub?.status ?? "pending";
                        const subColor = subStatus === "graded" ? "#10B981" : subStatus === "submitted" ? "#3B82F6" : MUTED;
                        return (
                          <div key={s.id} className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                                {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium" style={{ color: TEXT }}>{s.name}</p>
                                {sub?.submittedAt && <p className="text-xs" style={{ color: MUTED }}>Submitted: {sub.submittedAt.split("T")[0] || sub.submittedAt}</p>}
                              </div>
                              <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: subColor + "22", color: subColor }}>{subStatus}</span>
                              {sub?.marks != null && <span className="text-sm font-bold" style={{ color: "#10B981" }}>{sub.marks}/{sel.totalMarks}</span>}
                            </div>
                            {(sub?.status === "submitted" || sub?.status === "graded") && (
                              <div className="grid grid-cols-2 gap-2 pl-10">
                                <input type="number" placeholder={`Marks (0–${sel.totalMarks})`} min={0} max={sel.totalMarks}
                                  value={studentMarks[s.id] ?? (sub.marks != null ? String(sub.marks) : "")}
                                  onChange={e => setStudentMarks(p => ({ ...p, [s.id]: e.target.value }))}
                                  className="px-3 py-1.5 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                                <input placeholder="Feedback (optional)"
                                  value={studentFeedback[s.id] ?? (sub.remarks ?? "")}
                                  onChange={e => setStudentFeedback(p => ({ ...p, [s.id]: e.target.value }))}
                                  className="px-3 py-1.5 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                                <button onClick={() => handleGradeStudent(s.id)} className="col-span-2 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: "#2563EB" }}>
                                  Save Grade
                                </button>
                              </div>
                            )}
                            {!sub && <p className="pl-10 text-xs" style={{ color: MUTED }}>No submission yet</p>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
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
