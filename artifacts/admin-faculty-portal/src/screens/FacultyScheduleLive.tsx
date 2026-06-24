import { useState } from "react";
import { Plus, Video, Clock, Trash2, Check, X, ExternalLink, Radio } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function FacultyScheduleLive() {
  const [mob, setMob] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { liveClasses, addLiveClass, deleteLiveClass, batches } = useApp();
  const { user } = useAuth();
  const toast = useToast();

  const myClasses = liveClasses.filter(c => c.facultyId === user?.id);
  const upcoming = myClasses.filter(c => c.status === "scheduled").sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  const past = myClasses.filter(c => c.status === "ended").slice(0, 5);

  const [form, setForm] = useState({ title: "", batchId: "", scheduledAt: "", meetLink: "", description: "", duration: "90" });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSchedule = () => {
    if (!form.title || !form.batchId || !form.scheduledAt) { toast("Title, batch and date required", "error"); return; }
    addLiveClass({ title: form.title, batchId: form.batchId, facultyId: user?.id || "", scheduledAt: form.scheduledAt, meetLink: form.meetLink, description: form.description, duration: parseInt(form.duration) || 90, status: "scheduled" });
    toast(`"${form.title}" scheduled!`);
    setForm({ title: "", batchId: "", scheduledAt: "", meetLink: "", description: "", duration: "90" });
    setShowModal(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove "${title}"?`)) { deleteLiveClass(id); toast(`"${title}" removed`); }
  };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Live Sessions</h1>
              <p className="text-xs" style={{ color: MUTED }}>{upcoming.length} upcoming</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#0F766E" }}>
            <Plus className="w-4 h-4" /> Schedule Session
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Upcoming Sessions</h2>
              <div className="space-y-3">
                {upcoming.map(cls => {
                  const batch = batches.find(b => b.id === cls.batchId);
                  return (
                    <div key={cls.id} className="rounded-xl p-4" style={{ background: CARD, border: `1px solid rgba(15,118,110,0.3)` }}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,184,166,0.1)" }}>
                          <Radio className="w-5 h-5" style={{ color: "#14B8A6" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold mb-0.5" style={{ color: TEXT }}>{cls.title}</p>
                          {cls.description && <p className="text-xs mb-1" style={{ color: MUTED }}>{cls.description}</p>}
                          <div className="flex flex-wrap gap-x-4 text-xs" style={{ color: MUTED }}>
                            {batch && <span>{batch.name}</span>}
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cls.scheduledAt} · {cls.duration}min</span>
                          </div>
                          {cls.meetLink && (
                            <a href={cls.meetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs mt-1.5" style={{ color: "#14B8A6" }}>
                              <ExternalLink className="w-3 h-3" /> Go Live
                            </a>
                          )}
                        </div>
                        <button onClick={() => handleDelete(cls.id, cls.title)} className="p-1.5 rounded-lg flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!upcoming.length && (
            <div className="py-16 text-center">
              <Video className="w-12 h-12 mx-auto mb-3" style={{ color: MUTED }} />
              <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>No upcoming sessions</p>
              <p className="text-xs mb-4" style={{ color: MUTED }}>Schedule your next live class</p>
              <button onClick={() => setShowModal(true)} className="text-sm px-4 py-2 rounded-lg text-white" style={{ background: "#0F766E" }}>Schedule Session</button>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3" style={{ color: MUTED }}>Past Sessions</h2>
              <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                {past.map(cls => {
                  const batch = batches.find(b => b.id === cls.batchId);
                  return (
                    <div key={cls.id} className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: SURFACE }}>
                        <Video className="w-3.5 h-3.5" style={{ color: MUTED }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate" style={{ color: TEXT }}>{cls.title}</p>
                        <p className="text-xs" style={{ color: MUTED }}>{batch?.name} · {cls.duration}min</p>
                      </div>
                      {cls.recordingUrl && (
                        <a href={cls.recordingUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(20,184,166,0.1)", color: "#14B8A6" }}>
                          Recording
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: TEXT }}>Schedule Live Session</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Title *</label>
              <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="e.g. Options Chain Deep Dive — Session 4"
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
                <label className="block text-xs mb-1" style={{ color: MUTED }}>Duration (min)</label>
                <input type="number" value={form.duration} onChange={e => upd("duration", e.target.value)} min="15"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Date & Time *</label>
              <input type="datetime-local" value={form.scheduledAt} onChange={e => upd("scheduledAt", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Meet / YouTube Live Link</label>
              <input value={form.meetLink} onChange={e => upd("meetLink", e.target.value)} placeholder="https://meet.google.com/…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Description</label>
              <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={2} placeholder="Topics to be covered…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleSchedule} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#0F766E" }}>
                <Check className="w-4 h-4" /> Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
