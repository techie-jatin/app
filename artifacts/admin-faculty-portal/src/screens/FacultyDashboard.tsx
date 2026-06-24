import { useState } from "react";
import { useLocation } from "wouter";
import { ClipboardList, HelpCircle, Upload, Calendar, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function FacultyDashboard() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { assignments, quizzes, liveClasses, batches, students } = useApp();
  const { user } = useAuth();

  const facultyId = user?.id || "";
  const myAssignments = assignments.filter(a => a.facultyId === facultyId);
  const myQuizzes = quizzes.filter(q => q.facultyId === facultyId);
  const myLiveClasses = liveClasses.filter(c => c.facultyId === facultyId);
  const myBatchIds = [...new Set([...myAssignments.map(a => a.batchId), ...myQuizzes.map(q => q.batchId)])];
  const myBatches = batches.filter(b => myBatchIds.includes(b.id));
  const myStudents = students.filter(s => myBatchIds.includes(s.batchId || "")).length;

  const upcomingClasses = myLiveClasses.filter(c => c.status === "scheduled").slice(0, 3);
  const pendingReviews = myAssignments.filter(a => a.status === "open").length;

  const stats = [
    { label: "My Batches", value: myBatches.length, icon: Calendar, color: "#2563EB", path: "/faculty/attendance" },
    { label: "Students", value: myStudents, icon: ClipboardList, color: "#10B981", path: "/faculty/progress" },
    { label: "Assignments", value: myAssignments.length, icon: ClipboardList, color: "#F59E0B", path: "/faculty/assignment" },
    { label: "Quizzes", value: myQuizzes.length, icon: HelpCircle, color: "#8B5CF6", path: "/faculty/quiz" },
  ];

  const tasks = [
    { label: "Pending Assignment Reviews", count: pendingReviews, color: "#F59E0B", path: "/faculty/assignment" },
    { label: "Upcoming Live Classes", count: upcomingClasses.length, color: "#3B82F6", path: "/faculty/live" },
    { label: "Active Quizzes", count: myQuizzes.filter(q => q.status === "published").length, color: "#8B5CF6", path: "/faculty/quiz" },
  ];

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Faculty Dashboard</h1>
              <p className="text-xs" style={{ color: MUTED }}>Welcome, {user?.name}</p>
            </div>
          </div>
          <button onClick={() => nav("/faculty/upload")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#0F766E" }}>
            <Upload className="w-4 h-4" /> Upload Lecture
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} onClick={() => nav(s.path)} className="p-4 rounded-xl cursor-pointer hover:opacity-90 transition" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${s.color}15` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Pending Tasks</h2>
              </div>
              <div className="p-4 space-y-3">
                {tasks.map(t => (
                  <div key={t.label} onClick={() => nav(t.path)} className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:opacity-90 transition" style={{ background: SURFACE }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${t.color}15` }}>
                        {t.count > 0 ? <AlertCircle className="w-4 h-4" style={{ color: t.color }} /> : <CheckCircle className="w-4 h-4" style={{ color: "#10B981" }} />}
                      </div>
                      <p className="text-sm" style={{ color: TEXT }}>{t.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: t.count > 0 ? t.color : "#10B981" }}>{t.count}</span>
                      <ArrowRight className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="text-sm font-semibold" style={{ color: TEXT }}>Upcoming Classes</h2>
                <button onClick={() => nav("/faculty/live")} className="flex items-center gap-1 text-xs" style={{ color: "#14B8A6" }}>View All <ArrowRight className="w-3 h-3" /></button>
              </div>
              <div className="divide-y" style={{ borderColor: BORDER }}>
                {upcomingClasses.map(cls => {
                  const batch = batches.find(b => b.id === cls.batchId);
                  return (
                    <div key={cls.id} className="flex items-start gap-3 px-5 py-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,184,166,0.1)" }}>
                        <Calendar className="w-4 h-4" style={{ color: "#14B8A6" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{cls.title}</p>
                        <p className="text-xs" style={{ color: MUTED }}>{batch?.name} · {cls.scheduledAt}</p>
                      </div>
                    </div>
                  );
                })}
                {!upcomingClasses.length && (
                  <div className="py-8 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                    <p className="text-sm mb-2" style={{ color: MUTED }}>No upcoming classes</p>
                    <button onClick={() => nav("/faculty/live")} className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "#0F766E" }}>Schedule One</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: TEXT }}>My Batches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {myBatches.map(b => {
                const count = students.filter(s => s.batchId === b.id).length;
                return (
                  <div key={b.id} className="p-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <p className="text-sm font-medium" style={{ color: TEXT }}>{b.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{count} students · {b.status}</p>
                  </div>
                );
              })}
              {!myBatches.length && <p className="col-span-3 text-sm py-4" style={{ color: MUTED }}>No batches assigned yet</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
