import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, BookOpen, Edit2, Trash2, Check, X, PlayCircle, HelpCircle, ClipboardList, Eye } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";
import type { Course } from "../context/types";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const emptyForm = { name: "", description: "", duration: "", modules: "1" };

export function AdminCourseBuilder() {
  const [mob, setMob] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState<Course | null>(null);
  const { courses, addCourse, updateCourse, deleteCourse } = useApp();
  const toast = useToast();

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (c: Course) => { setEditing(c); setForm({ name: c.name, description: c.description || "", duration: c.duration || "", modules: String(c.modules || 1) }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name) { toast("Course name required", "error"); return; }
    const data = { name: form.name, description: form.description, duration: form.duration, modules: parseInt(form.modules) || 1 };
    if (editing) { updateCourse(editing.id, data); toast(`"${form.name}" updated`); }
    else { addCourse({ ...data, level: "Beginner", batchIds: [] }); toast(`"${form.name}" created`); }
    setShowModal(false);
  };

  const handleDelete = (c: Course) => {
    if (confirm(`Delete "${c.name}"?`)) { deleteCourse(c.id); if (selected?.id === c.id) setSelected(null); toast(`"${c.name}" deleted`); }
  };

  const typeIcons = { lecture: PlayCircle, quiz: HelpCircle, assignment: ClipboardList };
  const typeColors = { lecture: "#3B82F6", quiz: "#8B5CF6", assignment: "#F59E0B" };

  const sampleContent = selected ? [
    { type: "lecture", title: "Introduction to " + selected.name, duration: "45 min" },
    { type: "quiz", title: "Chapter 1 Assessment", duration: "20 min" },
    { type: "lecture", title: "Advanced Concepts", duration: "60 min" },
    { type: "assignment", title: "Practice Exercise", duration: "Submit by deadline" },
  ] : [];

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Course Builder</h1>
              <p className="text-xs" style={{ color: MUTED }}>{courses.length} courses</p>
            </div>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> New Course
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4 space-y-2" style={{ borderRight: `1px solid ${BORDER}` }}>
            <p className="text-xs font-medium px-1 mb-3" style={{ color: MUTED }}>All Courses</p>
            {courses.map(c => (
              <div key={c.id} onClick={() => setSelected(c)} className="rounded-xl p-4 cursor-pointer transition"
                style={{ background: selected?.id === c.id ? "rgba(37,99,235,0.1)" : CARD, border: `1px solid ${selected?.id === c.id ? "rgba(37,99,235,0.4)" : BORDER}` }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium leading-snug" style={{ color: TEXT }}>{c.name}</p>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={e => { e.stopPropagation(); openEdit(c); }} className="p-1 rounded" style={{ background: "rgba(37,99,235,0.1)" }}>
                      <Edit2 className="w-3 h-3" style={{ color: "#3B82F6" }} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); handleDelete(c); }} className="p-1 rounded" style={{ background: "rgba(239,68,68,0.1)" }}>
                      <Trash2 className="w-3 h-3" style={{ color: "#EF4444" }} />
                    </button>
                  </div>
                </div>
                {c.description && <p className="text-xs mb-2 line-clamp-2" style={{ color: MUTED }}>{c.description}</p>}
                <div className="flex items-center gap-3 text-[10px]" style={{ color: MUTED }}>
                  <span>{c.modules} modules</span>
                  {c.duration && <><span>·</span><span>{c.duration}</span></>}
                  <span className="ml-auto px-1.5 py-0.5 rounded-full capitalize" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>{c.level}</span>
                </div>
              </div>
            ))}
            {!courses.length && (
              <div className="py-12 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                <p className="text-sm" style={{ color: MUTED }}>No courses yet</p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold" style={{ color: TEXT }}>{selected.name}</h2>
                    {selected.description && <p className="text-sm mt-1" style={{ color: MUTED }}>{selected.description}</p>}
                  </div>
                  <button onClick={() => openEdit(selected)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: SURFACE, color: MUTED }}>
                    <Edit2 className="w-3.5 h-3.5" /> Edit Course
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Modules", value: selected.modules },
                    { label: "Duration", value: selected.duration || "—" },
                    { label: "Level", value: selected.level || "—" },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <p className="text-lg font-bold" style={{ color: TEXT }}>{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <h3 className="text-sm font-semibold" style={{ color: TEXT }}>Curriculum Preview</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: SURFACE, color: MUTED }}>Sample</span>
                  </div>
                  <div className="divide-y" style={{ borderColor: BORDER }}>
                    {sampleContent.map((item, i) => {
                      const Icon = typeIcons[item.type as keyof typeof typeIcons] || PlayCircle;
                      const color = typeColors[item.type as keyof typeof typeColors] || "#3B82F6";
                      return (
                        <div key={i} className="flex items-center gap-3 px-5 py-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                            <Icon className="w-3.5 h-3.5" style={{ color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm" style={{ color: TEXT }}>{item.title}</p>
                            <p className="text-xs" style={{ color: MUTED }}>{item.duration}</p>
                          </div>
                          <span className="text-xs capitalize" style={{ color: MUTED }}>{item.type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: MUTED }} />
                  <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>Select a Course</p>
                  <p className="text-xs" style={{ color: MUTED }}>Choose a course from the left to view its curriculum</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: TEXT }}>{editing ? "Edit Course" : "Create Course"}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            {[
              { key: "name", label: "Course Name *", placeholder: "Options & Derivatives Mastery" },
              { key: "description", label: "Description", placeholder: "Comprehensive course on…" },
              { key: "duration", label: "Duration", placeholder: "3 months" },
              { key: "modules", label: "Number of Modules", placeholder: "8" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs mb-1" style={{ color: MUTED }}>{f.label}</label>
                {f.key === "description" ? (
                  <textarea value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} rows={2} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                ) : (
                  <input type={f.key === "modules" ? "number" : "text"} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                <Check className="w-4 h-4" /> {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
