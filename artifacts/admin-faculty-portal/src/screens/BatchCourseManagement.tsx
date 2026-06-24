import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Search, Users, Calendar, BookOpen, ChevronRight, Layers, Clock } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  active:    { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  upcoming:  { color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  completed: { color: MUTED,     bg: SURFACE },
  draft:     { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
};

export function BatchCourseManagement() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [, nav] = useLocation();
  const { batches, faculty, courses, students } = useApp();
  const toast = useToast();

  const filtered = batches.filter(b => {
    const q = search.toLowerCase();
    const matchQ = !q || b.name.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || b.status === statusFilter;
    return matchQ && matchS;
  });

  const getBatchStudents = (batchId: string) => students.filter(s => s.batchId === batchId).length;
  const getFaculty = (facultyId?: string) => faculty.find(f => f.id === facultyId);
  const getCourse = (courseId?: string) => courses.find(c => c.id === courseId);

  const statusCounts = { active: batches.filter(b => b.status === "active").length, upcoming: batches.filter(b => b.status === "upcoming").length, completed: batches.filter(b => b.status === "completed").length };

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Batch Management</h1>
              <p className="text-xs" style={{ color: MUTED }}>{batches.length} batches</p>
            </div>
          </div>
          <button onClick={() => nav("/admin/batches/create")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> New Batch
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Active", count: statusCounts.active, color: "#10B981" },
              { label: "Upcoming", count: statusCounts.upcoming, color: "#3B82F6" },
              { label: "Completed", count: statusCounts.completed, color: MUTED },
            ].map(s => (
              <div key={s.label} onClick={() => setStatusFilter(s.label.toLowerCase())} className="p-3 rounded-xl cursor-pointer hover:opacity-90 transition" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <Search className="w-4 h-4" style={{ color: MUTED }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search batches…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
            </div>
            {["all", "active", "upcoming", "completed"].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} className="px-3 py-2 rounded-lg text-xs capitalize" style={{ background: statusFilter === f ? "#2563EB" : SURFACE, color: statusFilter === f ? TEXT : MUTED }}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(batch => {
              const fac = getFaculty(batch.facultyId);
              const course = getCourse(batch.courseId);
              const enrolled = getBatchStudents(batch.id);
              const cfg = STATUS_CFG[batch.status as keyof typeof STATUS_CFG] || STATUS_CFG.draft;
              return (
                <div key={batch.id} className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: TEXT }}>{batch.name}</p>
                      {course && <p className="text-xs mt-0.5 truncate" style={{ color: MUTED }}>{course.name}</p>}
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 capitalize" style={{ background: cfg.bg, color: cfg.color }}>{batch.status}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                      <p className="text-xs" style={{ color: MUTED }}>{enrolled} / {batch.maxStudents || "∞"} students</p>
                    </div>
                    {fac && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                        <p className="text-xs" style={{ color: MUTED }}>{fac.name}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                      <p className="text-xs" style={{ color: MUTED }}>{batch.startDate} → {batch.endDate}</p>
                    </div>
                  </div>

                  {batch.maxStudents && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: MUTED }}>Seats filled</span>
                        <span style={{ color: TEXT }}>{Math.round((enrolled / batch.maxStudents) * 100)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (enrolled / batch.maxStudents) * 100)}%`, background: cfg.color }} />
                      </div>
                    </div>
                  )}

                  <button onClick={() => { localStorage.setItem("selectedBatchId", batch.id); toast(`Managing ${batch.name}`); }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium" style={{ background: SURFACE, color: MUTED }}>
                    <Layers className="w-3.5 h-3.5" /> Manage Batch <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
            {!filtered.length && (
              <div className="col-span-3 py-12 text-center">
                <Layers className="w-10 h-10 mx-auto mb-3" style={{ color: MUTED }} />
                <p className="text-sm mb-3" style={{ color: MUTED }}>No batches found</p>
                <button onClick={() => nav("/admin/batches/create")} className="text-xs px-4 py-2 rounded-lg text-white" style={{ background: "#2563EB" }}>Create First Batch</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
