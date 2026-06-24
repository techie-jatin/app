import { useState } from "react";
import { Plus, Video, Clock, Link2, Trash2, Check, X, ExternalLink } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  scheduled: { color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  live:      { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  ended:     { color: MUTED,     bg: SURFACE },
  cancelled: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
};

export function AdminLiveClass() {
  const [mob, setMob] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "scheduled" | "live" | "ended">("all");
  const { liveClasses, addLiveClass, deleteLiveClass, batches, faculty } = useApp();
  const toast = useToast();

  const [form, setForm] = useState({ title: "", batchId: "", facultyId: "", scheduledAt: "", meetLink: "", description: "", duration: "90" });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleCreate = () => {
    if (!form.title || !form.batchId || !form.scheduledAt) { toast("Title, batch and date required", "error"); return; }
    addLiveClass({ title: form.title, batchId: form.batchId, facultyId: form.facultyId, scheduledAt: form.scheduledAt, meetLink: form.meetLink, description: form.description, duration: parseInt(form.duration) || 90, status: "scheduled" });
    toast(`"${form.title}" scheduled`);
    setForm({ title: "", batchId: "", facultyId: "", scheduledAt: "", meetLink: "", description: "", duration: "90" });
    setShowModal(false);
  };

  const filtered = liveClasses.filter(c => filter === "all" || c.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove "${title}"?`)) { deleteLiveClass(id); toast(`"${title}" removed`); }
  };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Live Classes</h1>
              <p className="text-xs" style={{ color: MUTED }}>{liveClasses.length} total</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Schedule Class
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex gap-2">
            {(["all", "scheduled", "live", "ended"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs capitalize" style={{ background: filter === f ? "#2563EB" : SURFACE, color: filter === f ? TEXT : MUTED }}>
                {f} {f !== "all" ? `(${liveClasses.filter(c => c.status === f).length})` : ""}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {sorted.map(cls => {
              const batch = batches.find(b => b.id === cls.batchId);
              const fac = faculty.find(f => f.id === cls.facultyId);
              const cfg = STATUS_CFG[cls.status as keyof typeof STATUS_CFG] || STATUS_CFG.scheduled;
              return (
                <div key={cls.id} className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                      <Video className="w-5 h-5" style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold" style={{ color: TEXT }}>{cls.title}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 capitalize" style={{ background: cfg.bg, color: cfg.color }}>{cls.status}</span>
                      </div>
                      {cls.description && <p className="text-xs mb-2" style={{ color: MUTED }}>{cls.description}</p>}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: MUTED }}>
                        {batch && <span>{batch.name}</span>}
                        {fac && <span>{fac.name}</span>}
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cls.scheduledAt} · {cls.duration}min</span>
                        {cls.meetLink && (
                          <a href={cls.meetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: "#3B82F6" }}>
                            <Link2 className="w-3 h-3" /> Join Link
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {cls.meetLink && (
                        <a href={cls.meetLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)" }}>
                          <ExternalLink className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                        </a>
                      )}
                      <button onClick={() => handleDelete(cls.id, cls.title)} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }}>
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {!sorted.length && (
              <div className="py-16 text-center">
                <Video className="w-10 h-10 mx-auto mb-3" style={{ color: MUTED }} />
                <p className="text-sm mb-3" style={{ color: MUTED }}>No live classes {filter !== "all" ? `with status "${filter}"` : "yet"}</p>
                <button onClick={() => setShowModal(true)} className="text-xs px-4 py-2 rounded-lg text-white" style={{ background: "#2563EB" }}>Schedule One</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: TEXT }}>Schedule Live Class</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Class Title *</label>
              <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Options Chain Analysis — Session 5"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>Batch *</label>
                <select value={form.batchId} onChange={e => upd("batchId", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.batchId ? TEXT : MUTED }}>
                  <option value="">Select…</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>Faculty</label>
                <select value={form.facultyId} onChange={e => upd("facultyId", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.facultyId ? TEXT : MUTED }}>
                  <option value="">Select…</option>
                  {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>Date & Time *</label>
                <input type="datetime-local" value={form.scheduledAt} onChange={e => upd("scheduledAt", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>Duration (min)</label>
                <input type="number" value={form.duration} onChange={e => upd("duration", e.target.value)} min="15"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Meet / YouTube Live Link</label>
              <input value={form.meetLink} onChange={e => upd("meetLink", e.target.value)} placeholder="https://meet.google.com/… or youtube.com/live/…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Description</label>
              <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={2} placeholder="Topics to be covered…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleCreate} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                <Check className="w-4 h-4" /> Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
