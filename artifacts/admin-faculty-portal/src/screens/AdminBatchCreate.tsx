import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, ChevronRight, Users, BookOpen, Calendar, Clock, AlertCircle } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";
const STEPS = ["Basic Info", "Faculty & Course", "Schedule", "Review"];

export function AdminBatchCreate() {
  const [mob, setMob] = useState(false);
  const [step, setStep] = useState(0);
  const [, nav] = useLocation();
  const { faculty, courses, addBatch } = useApp();
  const toast = useToast();

  const [form, setForm] = useState({ name: "", description: "", maxStudents: "30", facultyId: "", courseId: "", startDate: "", endDate: "", schedule: "Mon, Wed, Fri · 7:00 PM – 8:30 PM" });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return !!form.facultyId && !!form.courseId;
    if (step === 2) return !!form.startDate && !!form.endDate;
    return true;
  };

  const handleCreate = () => {
    addBatch({
      name: form.name, description: form.description, facultyId: form.facultyId, courseId: form.courseId,
      startDate: form.startDate, endDate: form.endDate, maxStudents: parseInt(form.maxStudents) || 30,
      status: "Upcoming", studentIds: [], schedule: form.schedule,
    });
    toast(`Batch "${form.name}" created!`);
    nav("/admin/batches");
  };

  const selFaculty = faculty.find(f => f.id === form.facultyId);
  const selCourse = courses.find(c => c.id === form.courseId);

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <MobileMenuBtn onClick={() => setMob(true)} />
          <button onClick={() => nav("/admin/batches")} className="p-1.5 rounded-lg" style={{ background: SURFACE }}>
            <ArrowLeft className="w-4 h-4" style={{ color: MUTED }} />
          </button>
          <div>
            <h1 className="text-base font-bold" style={{ color: TEXT }}>Create New Batch</h1>
            <p className="text-xs" style={{ color: MUTED }}>Step {step + 1} of {STEPS.length}</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-0 rounded-xl overflow-hidden" style={{ background: SURFACE }}>
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium"
                  style={{ background: i === step ? "#2563EB" : i < step ? "rgba(37,99,235,0.15)" : "transparent", color: i === step ? TEXT : i < step ? "#3B82F6" : MUTED }}>
                  {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]" style={{ background: i === step ? "rgba(255,255,255,0.2)" : SURFACE }}>{i + 1}</span>}
                  <span className="hidden sm:block">{s}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              {step === 0 && (
                <>
                  <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Basic Information</h2>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Batch Name *</label>
                    <input value={form.name} onChange={e => upd("name", e.target.value)} placeholder="e.g. Advanced Trading Batch A"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Description</label>
                    <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={3} placeholder="Brief description of this batch…"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Max Students</label>
                    <input type="number" value={form.maxStudents} onChange={e => upd("maxStudents", e.target.value)} min="1" max="200"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Faculty & Course</h2>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Assign Faculty *</label>
                    <select value={form.facultyId} onChange={e => upd("facultyId", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.facultyId ? TEXT : MUTED }}>
                      <option value="">Select faculty…</option>
                      {faculty.map(f => <option key={f.id} value={f.id}>{f.name} — {f.specialization}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Select Course *</label>
                    <select value={form.courseId} onChange={e => upd("courseId", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.courseId ? TEXT : MUTED }}>
                      <option value="">Select course…</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  {!faculty.length && <p className="text-xs" style={{ color: "#F59E0B" }}><AlertCircle className="w-3 h-3 inline mr-1" />No faculty available. Add faculty first.</p>}
                  {!courses.length && <p className="text-xs" style={{ color: "#F59E0B" }}><AlertCircle className="w-3 h-3 inline mr-1" />No courses available. Add a course first.</p>}
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Schedule</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs mb-1" style={{ color: MUTED }}>Start Date *</label>
                      <input type="date" value={form.startDate} onChange={e => upd("startDate", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1" style={{ color: MUTED }}>End Date *</label>
                      <input type="date" value={form.endDate} onChange={e => upd("endDate", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: MUTED }}>Class Schedule</label>
                    <input value={form.schedule} onChange={e => upd("schedule", e.target.value)} placeholder="Mon, Wed, Fri · 7:00 PM – 8:30 PM"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-sm font-semibold mb-4" style={{ color: TEXT }}>Review & Create</h2>
                  <div className="space-y-3">
                    {[
                      { icon: BookOpen, label: "Batch Name", value: form.name },
                      { icon: Users,    label: "Max Students", value: form.maxStudents },
                      { icon: Users,    label: "Faculty", value: selFaculty?.name || "—" },
                      { icon: BookOpen, label: "Course", value: selCourse?.name || "—" },
                      { icon: Calendar, label: "Duration", value: form.startDate && form.endDate ? `${form.startDate} → ${form.endDate}` : "—" },
                      { icon: Clock,    label: "Schedule", value: form.schedule },
                    ].map(r => (
                      <div key={r.label} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: SURFACE }}>
                        <r.icon className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                        <div className="flex-1">
                          <p className="text-xs" style={{ color: MUTED }}>{r.label}</p>
                          <p className="text-sm font-medium" style={{ color: TEXT }}>{r.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => step > 0 ? setStep(s => s - 1) : nav("/admin/batches")}
                className="px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>
                {step === 0 ? "Cancel" : "Back"}
              </button>
              <button onClick={() => step < 3 ? (canNext() ? setStep(s => s + 1) : toast("Please fill required fields", "error")) : handleCreate()}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                {step < 3 ? <><span>Next</span><ChevronRight className="w-4 h-4" /></> : "Create Batch"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
