import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Check, FileText, Paperclip } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function AdminAssignmentCreator() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { batches, faculty, assignments, addAssignment } = useApp();
  const toast = useToast();

  const [form, setForm] = useState({ title: "", batchId: "", facultyId: "", totalMarks: "100", dueDate: "", description: "" });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handlePublish = (status: "open" | "closed") => {
    if (!form.title || !form.batchId || !form.dueDate) { toast("Title, batch and due date required", "error"); return; }
    addAssignment({ title: form.title, batchId: form.batchId, facultyId: form.facultyId, totalMarks: parseInt(form.totalMarks) || 100, dueDate: form.dueDate, description: form.description, status });
    toast(status === "open" ? "Assignment published!" : "Draft saved");
    nav("/admin/assignments");
  };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <button onClick={() => nav("/admin/assignments")} className="p-1.5 rounded-lg" style={{ background: SURFACE }}>
              <ArrowLeft className="w-4 h-4" style={{ color: MUTED }} />
            </button>
            <div>
              <h1 className="text-base font-bold" style={{ color: TEXT }}>Create Assignment</h1>
              <p className="text-xs" style={{ color: MUTED }}>{assignments.length} existing</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handlePublish("closed")} className="px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Save Draft</button>
            <button onClick={() => handlePublish("open")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
              <Check className="w-4 h-4" /> Publish
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl p-5 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Assignment Details</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Title *</label>
                  <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="e.g. Options Chain Analysis — Week 3"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Instructions / Description</label>
                  <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={5}
                    placeholder="Describe what students need to submit, references to use, and grading criteria…"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Attachments</h2>
                <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: BORDER }}>
                  <Paperclip className="w-6 h-6 mx-auto mb-2" style={{ color: MUTED }} />
                  <p className="text-xs" style={{ color: MUTED }}>Attach PDF brief, rubric, or reference materials</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl p-4 space-y-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Settings</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Target Batch *</label>
                  <select value={form.batchId} onChange={e => upd("batchId", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.batchId ? TEXT : MUTED }}>
                    <option value="">Select batch…</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Assign Faculty</label>
                  <select value={form.facultyId} onChange={e => upd("facultyId", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.facultyId ? TEXT : MUTED }}>
                    <option value="">Select faculty…</option>
                    {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Total Marks</label>
                  <input type="number" value={form.totalMarks} onChange={e => upd("totalMarks", e.target.value)} min="1"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Due Date *</label>
                  <input type="date" value={form.dueDate} onChange={e => upd("dueDate", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Recent Assignments</h2>
                {assignments.slice(0, 4).map(a => (
                  <div key={a.id} className="flex items-center gap-2 py-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: TEXT }}>{a.title}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>Due: {a.dueDate} · {a.totalMarks} marks</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>{a.status}</span>
                  </div>
                ))}
                {!assignments.length && <p className="text-xs" style={{ color: MUTED }}>No assignments yet</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
