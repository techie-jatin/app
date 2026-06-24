import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, User, Phone, Mail, MapPin, BookOpen, CheckCircle, Clock, Award, Send } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function AdminStudentDetail() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { students, batches, assignments, quizzes, attendance, updateStudent, sendNotification } = useApp();
  const toast = useToast();
  const [tab, setTab] = useState<"overview" | "assignments" | "quizzes" | "attendance">("overview");
  const [editing, setEditing] = useState(false);
  const [batchAssign, setBatchAssign] = useState("");
  const [msgText, setMsgText] = useState("");

  const studentId = localStorage.getItem("selectedStudentId") || "";
  const student = students.find(s => s.id === studentId);
  const batch = batches.find(b => b.id === student?.batchId);
  const studentAssignments = assignments.filter(a => a.batchId === student?.batchId);
  const studentQuizzes = quizzes.filter(q => q.batchId === student?.batchId);
  const studentAttendance = attendance.filter(a => studentId in a.records);
  const presentCount = studentAttendance.filter(a => a.records[studentId] === true).length;
  const avgAttendance = studentAttendance.length ? Math.round((presentCount / studentAttendance.length) * 100) : 0;

  const [form, setForm] = useState({ name: student?.name || "", email: student?.email || "", phone: student?.phone || "", address: student?.address || "" });

  const handleSave = () => {
    if (!student) return;
    updateStudent(student.id, form);
    toast("Student updated successfully");
    setEditing(false);
  };

  const handleAssign = () => {
    if (!student || !batchAssign) { toast("Select a batch first", "error"); return; }
    updateStudent(student.id, { batchId: batchAssign });
    toast("Student assigned to batch");
    setBatchAssign("");
  };

  const handleMessage = () => {
    if (!msgText.trim() || !student) return;
    sendNotification({ title: `Message to ${student.name}`, message: msgText, targetBatch: student.batchId || "all", type: "announcement", sentBy: "admin" });
    toast("Message sent");
    setMsgText("");
  };

  if (!student) return (
    <div className="flex h-screen items-center justify-center" style={{ background: BG }}>
      <div className="text-center">
        <p className="text-lg font-bold mb-2" style={{ color: TEXT }}>Student not found</p>
        <button onClick={() => nav("/admin/students")} className="text-sm px-4 py-2 rounded-lg text-white" style={{ background: "#2563EB" }}>Back to Students</button>
      </div>
    </div>
  );

  const unassignedBatches = batches.filter(b => b.id !== student.batchId && b.status === "Active");

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <MobileMenuBtn onClick={() => setMob(true)} />
          <button onClick={() => nav("/admin/students")} className="p-1.5 rounded-lg" style={{ background: SURFACE }}>
            <ArrowLeft className="w-4 h-4" style={{ color: MUTED }} />
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
              {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold truncate" style={{ color: TEXT }}>{student.name}</h1>
              <p className="text-xs" style={{ color: MUTED }}>{batch ? batch.name : "Not assigned"}</p>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className="px-3 py-1.5 rounded-lg text-sm" style={{ background: editing ? "rgba(16,185,129,0.1)" : SURFACE, color: editing ? "#10B981" : MUTED }}>
            {editing ? "Cancel" : "Edit"}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Assignments", value: studentAssignments.length, color: "#2563EB" },
              { label: "Quizzes", value: studentQuizzes.length, color: "#8B5CF6" },
              { label: "Avg Attendance", value: `${avgAttendance}%`, color: avgAttendance >= 80 ? "#10B981" : "#EF4444" },
              { label: "Status", value: student.batchId ? "Enrolled" : "Pending", color: student.batchId ? "#10B981" : "#F59E0B" },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold mb-4" style={{ color: TEXT }}>Student Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Full Name", key: "name", icon: User },
                    { label: "Email", key: "email", icon: Mail },
                    { label: "Phone", key: "phone", icon: Phone },
                    { label: "Address", key: "address", icon: MapPin },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs mb-1" style={{ color: MUTED }}>{f.label}</label>
                      {editing ? (
                        <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE }}>
                          <f.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                          <p className="text-sm" style={{ color: TEXT }}>{form[f.key as keyof typeof form] || "—"}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <button onClick={handleSave} className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>Save Changes</button>
                )}
              </div>

              <div className="flex gap-2">
                {(["overview", "assignments", "quizzes", "attendance"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} className="px-3 py-1.5 rounded-lg text-xs capitalize" style={{ background: tab === t ? "#2563EB" : SURFACE, color: tab === t ? TEXT : MUTED }}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                {tab === "overview" && (
                  <div className="p-4 space-y-3">
                    <div className="p-3 rounded-lg" style={{ background: SURFACE }}>
                      <p className="text-xs" style={{ color: MUTED }}>Current Batch</p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: TEXT }}>{batch ? batch.name : "Not enrolled in any batch"}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: SURFACE }}>
                      <p className="text-xs" style={{ color: MUTED }}>Enrolled At</p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: TEXT }}>{student.joinDate || "—"}</p>
                    </div>
                  </div>
                )}
                {tab === "assignments" && (
                  <div className="divide-y" style={{ borderColor: BORDER }}>
                    {studentAssignments.length ? studentAssignments.map(a => (
                      <div key={a.id} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm font-medium" style={{ color: TEXT }}>{a.title}</p>
                          <p className="text-xs" style={{ color: MUTED }}>Due: {a.dueDate} · Max: {a.totalMarks} marks</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>{a.status}</span>
                      </div>
                    )) : <p className="px-4 py-6 text-sm" style={{ color: MUTED }}>No assignments for this batch</p>}
                  </div>
                )}
                {tab === "quizzes" && (
                  <div className="divide-y" style={{ borderColor: BORDER }}>
                    {studentQuizzes.length ? studentQuizzes.map(q => (
                      <div key={q.id} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm font-medium" style={{ color: TEXT }}>{q.title}</p>
                          <p className="text-xs" style={{ color: MUTED }}>{q.questions.length} questions · {q.duration} min</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>{q.status}</span>
                      </div>
                    )) : <p className="px-4 py-6 text-sm" style={{ color: MUTED }}>No quizzes for this batch</p>}
                  </div>
                )}
                {tab === "attendance" && (
                  <div className="divide-y" style={{ borderColor: BORDER }}>
                    {studentAttendance.length ? studentAttendance.map(a => {
                      const present = a.records[studentId] === true;
                      return (
                        <div key={a.id} className="flex items-center justify-between px-4 py-3">
                          <p className="text-sm" style={{ color: TEXT }}>{a.date}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: present ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: present ? "#10B981" : "#EF4444" }}>
                            {present ? "Present" : "Absent"}
                          </span>
                        </div>
                      );
                    }) : <p className="px-4 py-6 text-sm" style={{ color: MUTED }}>No attendance records</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {!student.batchId && (
                <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Assign to Batch</h3>
                  <select value={batchAssign} onChange={e => setBatchAssign(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}>
                    <option value="">Select batch…</option>
                    {unassignedBatches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  <button onClick={handleAssign} className="w-full py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>Assign</button>
                </div>
              )}

              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Send Message</h3>
                <textarea value={msgText} onChange={e => setMsgText(e.target.value)} rows={3} placeholder="Type a message…"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none mb-3" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                <button onClick={handleMessage} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#10B981" }}>
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
