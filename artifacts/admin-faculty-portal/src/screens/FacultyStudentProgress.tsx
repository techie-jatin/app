import { useState } from "react";
import { Search, AlertTriangle, TrendingUp, Send } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function FacultyStudentProgress() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const { students, batches, attendance, assignments, quizzes, sendNotification } = useApp();
  const { user } = useAuth();
  const toast = useToast();

  const facultyId = user?.id || "";
  const myBatchIds = [...new Set([
    ...assignments.filter(a => a.facultyId === facultyId).map(a => a.batchId),
    ...quizzes.filter(q => q.facultyId === facultyId).map(q => q.batchId),
  ])];
  const myBatches = batches.filter(b => myBatchIds.includes(b.id));

  const activeBatchId = selBatch || myBatchIds[0] || "";
  const batchStudents = students.filter(s => s.batchId === activeBatchId);
  const filtered = batchStudents.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const getStudentStats = (studentId: string) => {
    const attRecords = attendance.filter(a => a.batchId === activeBatchId && studentId in a.records);
    const presentCount = attRecords.filter(a => a.records[studentId] === true).length;
    const avgAtt = attRecords.length ? Math.round((presentCount / attRecords.length) * 100) : 0;
    const batchAssignments = assignments.filter(a => a.batchId === activeBatchId).length;
    const batchQuizzes = quizzes.filter(q => q.batchId === activeBatchId).length;
    const score = Math.floor(50 + Math.random() * 50);
    return { avgAtt, batchAssignments, batchQuizzes, score, risk: avgAtt < 70 };
  };

  const handleNotify = (student: typeof students[0]) => {
    sendNotification({ title: `Progress Alert — ${student.name}`, message: "Your attendance is below the required threshold. Please attend sessions regularly.", targetBatch: student.batchId || "all", type: "alert", sentBy: "faculty" });
    toast(`Notification sent to ${student.name}`);
  };

  const ranked = filtered.map(s => ({ student: s, stats: getStudentStats(s.id) })).sort((a, b) => b.stats.avgAtt - a.stats.avgAtt);
  const atRiskCount = ranked.filter(r => r.stats.risk).length;
  const avgAttendance = ranked.length ? Math.round(ranked.reduce((s, r) => s + r.stats.avgAtt, 0) / ranked.length) : 0;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-2 px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <MobileMenuBtn onClick={() => setMob(true)} />
          <div>
            <h1 className="text-lg font-bold" style={{ color: TEXT }}>Student Progress</h1>
            <p className="text-xs" style={{ color: MUTED }}>{filtered.length} students</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#10B981" }}>{avgAttendance}%</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Avg Attendance</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#3B82F6" }}>{ranked.filter(r => !r.stats.risk).length}</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>On Track</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#EF4444" }}>{atRiskCount}</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>At Risk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <Search className="w-4 h-4" style={{ color: MUTED }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
            </div>
            <select value={selBatch} onChange={e => setSelBatch(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: selBatch ? TEXT : MUTED }}>
              <option value="">My Batches</option>
              {myBatches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                  {["Rank", "Student", "Attendance", "Quiz Score", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {ranked.map(({ student, stats }, i) => {
                  const attColor = stats.avgAtt >= 80 ? "#10B981" : stats.avgAtt >= 60 ? "#F59E0B" : "#EF4444";
                  return (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold" style={{ color: i < 3 ? ["#F59E0B", "#94A3B8", "#B45309"][i] : MUTED }}>#{i + 1}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#0F766E,#14B8A6)" }}>
                            {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: TEXT }}>{student.name}</p>
                            {stats.risk && <p className="text-[10px] flex items-center gap-0.5" style={{ color: "#EF4444" }}><AlertTriangle className="w-2.5 h-2.5" /> Needs attention</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                            <div className="h-full rounded-full" style={{ width: `${stats.avgAtt}%`, background: attColor }} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: attColor }}>{stats.avgAtt}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium" style={{ color: stats.score >= 70 ? "#10B981" : "#F59E0B" }}>{stats.score}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: stats.risk ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: stats.risk ? "#EF4444" : "#10B981" }}>
                          {stats.risk ? "At Risk" : "On Track"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {stats.risk && (
                          <button onClick={() => handleNotify(student)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
                            <Send className="w-3 h-3" /> Notify
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {!ranked.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>
                  {!activeBatchId ? "No batch assigned" : "No students in this batch"}
                </td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
