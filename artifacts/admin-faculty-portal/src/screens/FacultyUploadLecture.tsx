import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Check, X, Link2, PlayCircle, Upload } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function FacultyUploadLecture() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { batches, lectures, addLecture, deleteLecture } = useApp();
  const { user } = useAuth();
  const toast = useToast();

  const facultyId = user?.id || "";
  const myLectures = lectures.filter(l => l.facultyId === facultyId).slice(0, 5);

  const [form, setForm] = useState({ title: "", batchId: "", moduleTitle: "", youtubeUrl: "", description: "", duration: "" });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handlePublish = (isDraft: boolean) => {
    if (!form.title || !form.youtubeUrl) { toast("Title and YouTube URL required", "error"); return; }
    if (form.youtubeUrl && !isYoutube) { toast("Please enter a valid YouTube URL", "error"); return; }
    addLecture({
      title: form.title,
      batchId: form.batchId,
      facultyId,
      moduleTitle: form.moduleTitle,
      youtubeUrl: form.youtubeUrl,
      description: form.description,
      duration: form.duration,
      status: isDraft ? "draft" : "published",
    });
    toast(isDraft ? "Lecture saved as draft" : "Lecture published successfully!");
    if (!isDraft) setForm({ title: "", batchId: "", moduleTitle: "", youtubeUrl: "", description: "", duration: "" });
  };

  const isYoutube = form.youtubeUrl.includes("youtube") || form.youtubeUrl.includes("youtu.be");

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <button onClick={() => nav("/faculty/dashboard")} className="p-1.5 rounded-lg" style={{ background: SURFACE }}>
              <ArrowLeft className="w-4 h-4" style={{ color: MUTED }} />
            </button>
            <h1 className="text-base font-bold" style={{ color: TEXT }}>Upload Lecture</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handlePublish(true)} className="px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Save Draft</button>
            <button onClick={() => handlePublish(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#0F766E" }}>
              <Check className="w-4 h-4" /> Publish
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl p-5 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Lecture Details</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Lecture Title *</label>
                  <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="e.g. Options Chain Analysis — Part 1"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>YouTube Unlisted URL *</label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${form.youtubeUrl && !isYoutube ? "#EF4444" : BORDER}` }}>
                      <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                      <input value={form.youtubeUrl} onChange={e => upd("youtubeUrl", e.target.value)} placeholder="https://youtube.com/watch?v=…"
                        className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
                    </div>
                  </div>
                  {form.youtubeUrl && !isYoutube && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>Please enter a valid YouTube URL</p>}
                  {isYoutube && <p className="text-xs mt-1" style={{ color: "#10B981" }}>✓ Valid YouTube URL</p>}
                  <p className="text-xs mt-1" style={{ color: MUTED }}>Use Unlisted video links — students will not see the direct YouTube URL</p>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Description</label>
                  <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={4}
                    placeholder="Topics covered in this lecture: Support & Resistance levels, volume analysis, key patterns…"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Duration</label>
                  <input value={form.duration} onChange={e => upd("duration", e.target.value)} placeholder="e.g. 45 min"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
              </div>

              {isYoutube && (
                <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Preview</h3>
                  <div className="rounded-xl overflow-hidden aspect-video flex items-center justify-center" style={{ background: SURFACE }}>
                    <div className="text-center">
                      <PlayCircle className="w-12 h-12 mx-auto mb-2" style={{ color: "#14B8A6" }} />
                      <p className="text-sm" style={{ color: MUTED }}>YouTube video will be embedded here</p>
                      <p className="text-xs mt-1" style={{ color: MUTED }}>Students see only the embedded player</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl p-4 space-y-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Settings</h2>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Target Batch</label>
                  <select value={form.batchId} onChange={e => upd("batchId", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: form.batchId ? TEXT : MUTED }}>
                    <option value="">Select batch…</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: MUTED }}>Module / Chapter</label>
                  <input value={form.moduleTitle} onChange={e => upd("moduleTitle", e.target.value)} placeholder="e.g. Module 3: Technical Analysis"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Upload Guidelines</h3>
                <ul className="space-y-2">
                  {[
                    "Use YouTube Unlisted links only",
                    "Ensure video is accessible via the link",
                    "Add a clear title and description",
                    "Attendance auto-marks at 80% watched",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: MUTED }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#14B8A6" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {myLectures.length > 0 && (
                <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Recent Uploads</h3>
                  <div className="space-y-2">
                    {myLectures.map(l => (
                      <div key={l.id} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: SURFACE }}>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: TEXT }}>{l.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px]" style={{ color: l.status === "published" ? "#10B981" : "#F59E0B" }}>● {l.status}</span>
                            {l.duration && <span className="text-[10px]" style={{ color: MUTED }}>· {l.duration}</span>}
                          </div>
                        </div>
                        <button onClick={() => { if (confirm("Delete this lecture?")) { deleteLecture(l.id); toast("Lecture deleted"); } }}
                          className="p-1 rounded flex-shrink-0" style={{ color: MUTED }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
