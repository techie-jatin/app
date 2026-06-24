import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Search, Eye, Trash2, Users, CheckCircle, Clock } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function StudentManagement() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "enrolled" | "pending">("all");
  const [batchFilter, setBatchFilter] = useState<string>(() => {
    const stored = localStorage.getItem("selectedBatchId") || "";
    if (stored) localStorage.removeItem("selectedBatchId");
    return stored;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [, nav] = useLocation();
  const { students, batches, addStudent, deleteStudent } = useApp();
  const toast = useToast();

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchF = filter === "all" || (filter === "enrolled" ? !!s.batchId : !s.batchId);
    const matchB = !batchFilter || s.batchId === batchFilter;
    return matchQ && matchF && matchB;
  });

  const handleAdd = () => {
    if (!form.name || !form.email) { toast("Name and email are required", "error"); return; }
    const initials = form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    addStudent({
      name: form.name, email: form.email, phone: form.phone, batchId: null,
      status: "Pending", avatar: initials, joinDate: new Date().toISOString().split("T")[0],
      progress: 0, attendance: 0, avgScore: 0, totalQuizzes: 0,
      address: form.address, parentName: "", parentPhone: "",
    });
    toast(`${form.name} added successfully`);
    setForm({ name: "", email: "", phone: "", address: "" });
    setShowAdd(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove ${name}?`)) { deleteStudent(id); toast(`${name} removed`); }
  };

  const enrolled = students.filter(s => s.batchId).length;
  const pending = students.filter(s => !s.batchId).length;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Student Management</h1>
              <p className="text-xs" style={{ color: MUTED }}>{students.length} students total</p>
            </div>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total", value: students.length, icon: Users, color: "#2563EB", bg: "rgba(37,99,235,0.1)" },
              { label: "Enrolled", value: enrolled, icon: CheckCircle, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
              { label: "Pending", value: pending, icon: Clock, color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-xl flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
            </div>
            <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: batchFilter ? "#2563EB" : SURFACE, color: batchFilter ? TEXT : MUTED, border: `1px solid ${BORDER}` }}>
              <option value="">All Batches</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            {(["all", "enrolled", "pending"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-2 rounded-lg text-sm capitalize" style={{ background: filter === f ? "#2563EB" : SURFACE, color: filter === f ? TEXT : MUTED }}>
                {f}
              </button>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                  {["Student", "Contact", "Batch", "Progress", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {filtered.map(s => {
                  const batch = batches.find(b => b.id === s.batchId);
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                            {s.avatar || s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: TEXT }}>{s.name}</p>
                            <p className="text-xs" style={{ color: MUTED }}>{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: MUTED }}>{s.phone || "—"}</td>
                      <td className="px-4 py-3">
                        {batch ? (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(37,99,235,0.1)", color: "#3B82F6" }}>{batch.name}</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                            <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: "#10B981" }} />
                          </div>
                          <span className="text-xs" style={{ color: MUTED }}>{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: s.status === "Active" ? "rgba(16,185,129,0.1)" : s.status === "Pending" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)", color: s.status === "Active" ? "#10B981" : s.status === "Pending" ? "#F59E0B" : MUTED }}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { localStorage.setItem("selectedStudentId", s.id); nav("/admin/students/detail"); }}
                            className="p-1.5 rounded-lg" style={{ background: "rgba(37,99,235,0.1)" }} title="View">
                            <Eye className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
                          </button>
                          <button onClick={() => handleDelete(s.id, s.name)}
                            className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }} title="Delete">
                            <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filtered.length && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>
                    {search ? "No students match your search" : "No students yet — add one!"}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <h2 className="text-lg font-bold" style={{ color: TEXT }}>Add New Student</h2>
            {[
              { key: "name", label: "Full Name *", placeholder: "e.g. Rahul Sharma" },
              { key: "email", label: "Email Address *", placeholder: "rahul@example.com" },
              { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
              { key: "address", label: "Address / City", placeholder: "Mumbai" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>{f.label}</label>
                <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>Add Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
