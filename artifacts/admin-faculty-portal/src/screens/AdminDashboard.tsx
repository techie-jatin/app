import { useState } from "react";
import { useLocation } from "wouter";
import { Users, BookOpen, Award, Activity, TrendingUp, Plus, ArrowRight, Calendar } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const BG = "#0B1120", CARD = "#111827", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function AdminDashboard() {
  const [mob, setMob] = useState(false);
  const [, nav] = useLocation();
  const { students, batches, faculty, liveClasses, notifications, assignments, quizzes } = useApp();
  const { user } = useAuth();

  const pendingAssignments = assignments.filter(a => a.status === "open").length;
  const upcomingClasses = liveClasses.filter(c => c.status === "scheduled").slice(0, 3);
  const recentStudents = [...students].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 5);
  const activeBatches = batches.filter(b => b.status === "Active").length;

  const stats = [
    { label: "Total Students", value: students.length, icon: Users, color: "#2563EB", bg: "rgba(37,99,235,0.1)", delta: "+3 this week" },
    { label: "Active Batches", value: activeBatches, icon: BookOpen, color: "#10B981", bg: "rgba(16,185,129,0.1)", delta: `${batches.length} total` },
    { label: "Faculty Members", value: faculty.length, icon: Award, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", delta: "All active" },
    { label: "Upcoming Classes", value: upcomingClasses.length, icon: Activity, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", delta: "Scheduled" },
  ];

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Dashboard</h1>
              <p className="text-xs" style={{ color: MUTED }}>Welcome back, {user?.name}</p>
            </div>
          </div>
          <button onClick={() => nav("/admin/students")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
                <p className="text-xs mt-1 font-medium" style={{ color: s.color }}>{s.delta}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Recent Students</h2>
                <button onClick={() => nav("/admin/students")} className="flex items-center gap-1 text-xs" style={{ color: "#2563EB" }}>
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: BORDER }}>
                {recentStudents.map(s => (
                  <div key={s.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                      {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{s.name}</p>
                      <p className="text-xs truncate" style={{ color: MUTED }}>{s.email}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.batchId ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: s.batchId ? "#10B981" : "#F59E0B" }}>
                      {s.batchId ? "Enrolled" : "Pending"}
                    </span>
                    <button onClick={() => { localStorage.setItem("selectedStudentId", s.id); nav("/admin/students/detail"); }}
                      className="text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(37,99,235,0.1)", color: "#3B82F6" }}>
                      View
                    </button>
                  </div>
                ))}
                {!recentStudents.length && <p className="px-5 py-4 text-sm" style={{ color: MUTED }}>No students yet</p>}
              </div>
            </div>

            <div className="rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Upcoming Live Classes</h2>
                <button onClick={() => nav("/admin/live")} className="flex items-center gap-1 text-xs" style={{ color: "#2563EB" }}>
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: BORDER }}>
                {upcomingClasses.map(cls => (
                  <div key={cls.id} className="flex items-start gap-3 px-5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.1)" }}>
                      <Calendar className="w-4 h-4" style={{ color: "#8B5CF6" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{cls.title}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{cls.batchId} · {cls.scheduledAt}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>Scheduled</span>
                  </div>
                ))}
                {!upcomingClasses.length && (
                  <div className="px-5 py-8 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                    <p className="text-sm" style={{ color: MUTED }}>No upcoming classes</p>
                    <button onClick={() => nav("/admin/live")} className="mt-2 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "#2563EB" }}>Schedule One</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { label: "Pending Reviews", value: pendingAssignments, color: "#F59E0B", sub: "Assignments", path: "/admin/assignments" },
              { label: "Notifications Sent", value: notifications.length, color: "#10B981", sub: "Total sent", path: "/admin/notifications" },
              { label: "Active Quizzes", value: quizzes.length, color: "#8B5CF6", sub: "Published", path: "/admin/quiz/results" },
            ].map(card => (
              <div key={card.label} onClick={() => nav(card.path)} className="p-4 rounded-xl cursor-pointer hover:opacity-90 transition" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: MUTED }}>{card.label}</p>
                  <ArrowRight className="w-4 h-4" style={{ color: MUTED }} />
                </div>
                <p className="text-3xl font-bold mt-2" style={{ color: card.color }}>{card.value}</p>
                <p className="text-xs mt-1" style={{ color: MUTED }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
