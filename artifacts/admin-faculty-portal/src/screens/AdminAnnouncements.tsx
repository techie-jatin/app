import { useState } from "react";
import { Send, Bell, Users, User, Info, AlertCircle, CheckCircle } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

type NotifType = "announcement" | "reminder" | "alert" | "update";

const TYPE_CFG: Record<NotifType, { icon: typeof Info; color: string; bg: string; label: string }> = {
  announcement: { icon: Bell,         color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  label: "Announcement" },
  reminder:     { icon: CheckCircle,  color: "#10B981", bg: "rgba(16,185,129,0.1)",  label: "Reminder" },
  alert:        { icon: AlertCircle,  color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  label: "Alert" },
  update:       { icon: Info,         color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",  label: "Update" },
};

export function AdminAnnouncements() {
  const [mob, setMob] = useState(false);
  const { notifications, sendNotification, batches } = useApp();
  const toast = useToast();

  const [form, setForm] = useState({ title: "", message: "", targetBatch: "all", type: "announcement" as NotifType, batchId: "" });

  const handleSend = () => {
    if (!form.title.trim() || !form.message.trim()) { toast("Title and message are required", "error"); return; }
    sendNotification({ title: form.title, message: form.message, targetBatch: form.batchId || form.targetBatch, type: form.type, sentBy: "admin" });
    toast("Announcement sent!");
    setForm({ title: "", message: "", targetBatch: "all", type: "announcement", batchId: "" });
  };

  const sorted = [...notifications].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-2 px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <MobileMenuBtn onClick={() => setMob(true)} />
          <div>
            <h1 className="text-lg font-bold" style={{ color: TEXT }}>Announcements</h1>
            <p className="text-xs" style={{ color: MUTED }}>{notifications.length} sent</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl p-5 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Compose Announcement</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Announcement title…" className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={4} placeholder="Write your announcement…"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: MUTED }}>Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(TYPE_CFG) as [NotifType, typeof TYPE_CFG[NotifType]][]).map(([key, cfg]) => (
                      <button key={key} onClick={() => setForm(p => ({ ...p, type: key }))}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: form.type === key ? cfg.bg : SURFACE, color: form.type === key ? cfg.color : MUTED, border: `1px solid ${form.type === key ? `${cfg.color}40` : BORDER}` }}>
                        <cfg.icon className="w-3.5 h-3.5" /> {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Target Audience</label>
                  <div className="flex gap-2 mb-2">
                    {[{ val: "all", label: "All" }, { val: "students", label: "Students" }, { val: "faculty", label: "Faculty" }].map(opt => (
                      <button key={opt.val} onClick={() => setForm(p => ({ ...p, targetBatch: opt.val, batchId: "" }))}
                        className="flex-1 py-1.5 rounded-lg text-xs" style={{ background: form.targetBatch === opt.val && !form.batchId ? "rgba(37,99,235,0.1)" : SURFACE, color: form.targetBatch === opt.val && !form.batchId ? "#3B82F6" : MUTED }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <select value={form.batchId} onChange={e => setForm(p => ({ ...p, batchId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.batchId ? TEXT : MUTED }}>
                    <option value="">Or target a specific batch…</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <button onClick={handleSend} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                  <Send className="w-4 h-4" /> Send Announcement
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Sent Announcements ({notifications.length})</h2>
                </div>
                <div className="divide-y overflow-y-auto" style={{ borderColor: BORDER, maxHeight: "calc(100vh - 220px)" }}>
                  {sorted.map(n => {
                    const cfg = TYPE_CFG[n.type as NotifType] || TYPE_CFG.announcement;
                    const batch = batches.find(b => b.id === n.targetBatch);
                    return (
                      <div key={n.id} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                            <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm font-medium" style={{ color: TEXT }}>{n.title}</p>
                              <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                            </div>
                            <p className="text-xs mb-2 leading-relaxed" style={{ color: MUTED }}>{n.message}</p>
                            <div className="flex items-center gap-3 text-[10px]" style={{ color: MUTED }}>
                              <span>To: {batch ? batch.name : n.targetBatch}</span>
                              <span>·</span>
                              <span>{new Date(n.sentAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!sorted.length && (
                    <div className="py-12 text-center">
                      <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: MUTED }} />
                      <p className="text-sm" style={{ color: MUTED }}>No announcements sent yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
