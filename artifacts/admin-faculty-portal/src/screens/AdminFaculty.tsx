import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Mail, Phone, Star, X, Check } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";
import type { Faculty } from "../context/types";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const emptyForm = { name: "", email: "", phone: "", specialization: "" };

export function AdminFaculty() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Faculty | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useApp();
  const toast = useToast();

  const filtered = faculty.filter(f => {
    const q = search.toLowerCase();
    return !q || f.name.toLowerCase().includes(q) || f.specialization.toLowerCase().includes(q);
  });

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (f: Faculty) => { setEditing(f); setForm({ name: f.name, email: f.email, phone: f.phone || "", specialization: f.specialization }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.email) { toast("Name and email required", "error"); return; }
    const initials = form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    if (editing) {
      updateFaculty(editing.id, { name: form.name, email: form.email, phone: form.phone, specialization: form.specialization });
      toast(`${form.name} updated`);
    } else {
      addFaculty({ name: form.name, email: form.email, phone: form.phone, specialization: form.specialization, batchIds: [], status: "Active", avatar: initials, joinDate: new Date().toISOString().split("T")[0], totalStudents: 0, rating: 4.5 });
      toast(`${form.name} added`);
    }
    setShowModal(false);
  };

  const handleDelete = (f: Faculty) => {
    if (confirm(`Remove ${f.name}?`)) { deleteFaculty(f.id); toast(`${f.name} removed`); }
  };

  const gradients = [
    "linear-gradient(135deg,#2563EB,#10B981)", "linear-gradient(135deg,#8B5CF6,#3B82F6)",
    "linear-gradient(135deg,#F59E0B,#EF4444)", "linear-gradient(135deg,#10B981,#06B6D4)",
  ];

  const subjectColors = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"];

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Faculty Management</h1>
              <p className="text-xs" style={{ color: MUTED }}>{faculty.length} faculty members</p>
            </div>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Add Faculty
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <Search className="w-4 h-4" style={{ color: MUTED }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((f, i) => (
              <div key={f.id} className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: gradients[i % gradients.length] }}>
                      {f.avatar || f.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: TEXT }}>{f.name}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{f.specialization}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg" style={{ background: "rgba(37,99,235,0.1)" }}>
                      <Edit2 className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
                    </button>
                    <button onClick={() => handleDelete(f)} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }}>
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                    <p className="text-xs truncate" style={{ color: MUTED }}>{f.email}</p>
                  </div>
                  {f.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                      <p className="text-xs" style={{ color: MUTED }}>{f.phone}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: f.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)", color: f.status === "Active" ? "#10B981" : MUTED }}>{f.status}</span>
                    <span className="text-xs" style={{ color: MUTED }}>{f.batchIds.length} batch{f.batchIds.length !== 1 ? "es" : ""}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(n => <Star key={n} className="w-3 h-3" style={{ color: n <= Math.round(f.rating) ? "#F59E0B" : BORDER, fill: n <= Math.round(f.rating) ? "#F59E0B" : "transparent" }} />)}
                    <span className="text-xs ml-1" style={{ color: MUTED }}>{f.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            {!filtered.length && <p className="col-span-3 py-8 text-center text-sm" style={{ color: MUTED }}>No faculty found</p>}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: TEXT }}>{editing ? "Edit Faculty" : "Add Faculty Member"}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            {[
              { key: "name", label: "Full Name *", placeholder: "Dr. Anand Kumar" },
              { key: "email", label: "Email *", placeholder: "faculty@tradecoach.in" },
              { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
              { key: "specialization", label: "Specialization", placeholder: "Options & Derivatives" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>{f.label}</label>
                <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
            ))}
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                <Check className="w-4 h-4" /> {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
