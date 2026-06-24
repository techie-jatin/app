import { useState } from "react";
import { Download, TrendingUp, Users, Award, BookOpen, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function AdminReports() {
  const [mob, setMob] = useState(false);
  const [period, setPeriod] = useState("month");
  const { students, batches, faculty, assignments, quizzes, attendance, certificates } = useApp();
  const toast = useToast();

  const enrolled = students.filter(s => s.batchId).length;
  const unenrolled = students.filter(s => !s.batchId).length;
  const activeBatches = batches.filter(b => b.status === "Active").length;
  const activeAssignments = assignments.filter(a => a.status === "open").length;
  const reviewedAssignments = assignments.filter(a => a.status === "graded").length;

  const getStudentAttPct = (studentId: string) => {
    const recs = attendance.filter(a => studentId in a.records);
    if (!recs.length) return 0;
    const present = recs.filter(a => a.records[studentId] === true).length;
    return Math.round((present / recs.length) * 100);
  };

  const avgAtt = students.length
    ? Math.round(students.reduce((s, st) => s + getStudentAttPct(st.id), 0) / students.length)
    : 0;

  const batchStats = batches.map(b => {
    const bStudents = students.filter(s => s.batchId === b.id);
    const bAtt = attendance.filter(a => a.batchId === b.id);
    const bAvgAtt = bAtt.length ? Math.round(
      bStudents.reduce((sum, s) => {
        const recs = bAtt.filter(a => s.id in a.records);
        if (!recs.length) return sum;
        const p = recs.filter(a => a.records[s.id] === true).length;
        return sum + Math.round((p / recs.length) * 100);
      }, 0) / (bStudents.length || 1)
    ) : 0;
    return { batch: b, students: bStudents.length, avgAtt: bAvgAtt, assignments: assignments.filter(a => a.batchId === b.id).length };
  });

  const topStudents = [...students].map(s => ({
    student: s, score: getStudentAttPct(s.id)
  })).sort((a, b) => b.score - a.score).slice(0, 5);

  const atRisk = [...students].map(s => ({
    student: s, score: getStudentAttPct(s.id)
  })).filter(s => s.score < 70 && s.score > 0).slice(0, 5);

  const kpis = [
    { label: "Total Students", value: students.length, sub: `${enrolled} enrolled`, color: "#2563EB", trend: "up" },
    { label: "Active Batches", value: activeBatches, sub: `${batches.length} total`, color: "#10B981", trend: "up" },
    { label: "Avg Attendance", value: `${avgAtt}%`, sub: `${attendance.length} records`, color: avgAtt >= 75 ? "#10B981" : "#F59E0B", trend: avgAtt >= 75 ? "up" : "down" },
    { label: "Certificates", value: certificates.length, sub: "Issued", color: "#8B5CF6", trend: "up" },
    { label: "Assignments", value: assignments.length, sub: `${reviewedAssignments} reviewed`, color: "#F59E0B", trend: "up" },
    { label: "Quizzes", value: quizzes.length, sub: "Published", color: "#06B6D4", trend: "up" },
  ];

  const barMax = Math.max(...batchStats.map(b => b.students), 1);

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Reports & Analytics</h1>
              <p className="text-xs" style={{ color: MUTED }}>Live data from platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
              {["week", "month", "quarter"].map(p => (
                <button key={p} onClick={() => setPeriod(p)} className="px-3 py-1.5 text-xs capitalize" style={{ background: period === p ? "#2563EB" : SURFACE, color: period === p ? TEXT : MUTED }}>
                  {p}
                </button>
              ))}
            </div>
            <button onClick={() => toast("Export coming soon", "info")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: SURFACE, color: MUTED }}>
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {kpis.map(k => (
              <div key={k.label} className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: MUTED }}>{k.label}</p>
                  {k.trend === "up" ? <ArrowUp className="w-3.5 h-3.5" style={{ color: "#10B981" }} /> : <ArrowDown className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />}
                </div>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <h2 className="text-sm font-semibold mb-4" style={{ color: TEXT }}>Batch Enrollment Breakdown</h2>
              {batchStats.length ? (
                <div className="space-y-3">
                  {batchStats.map(({ batch, students: count, avgAtt: att }) => (
                    <div key={batch.id}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="truncate" style={{ color: TEXT, maxWidth: "60%" }}>{batch.name}</span>
                        <span style={{ color: MUTED }}>{count} students · {att}% attendance</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${(count / barMax) * 100}%`, background: "#2563EB", minWidth: count > 0 ? "8px" : 0 }} />
                        <div className="h-2 rounded-full flex-1" style={{ background: SURFACE }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: MUTED }} />
                  <p className="text-sm" style={{ color: MUTED }}>No batch data yet</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Top Performers</h3>
                {topStudents.length ? topStudents.map((r, i) => (
                  <div key={r.student.id} className="flex items-center gap-2 py-1.5">
                    <span className="text-xs w-4" style={{ color: MUTED }}>#{i + 1}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                      {r.student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <p className="flex-1 text-xs truncate" style={{ color: TEXT }}>{r.student.name}</p>
                    <span className="text-xs font-bold" style={{ color: "#10B981" }}>{r.score}%</span>
                  </div>
                )) : <p className="text-xs" style={{ color: MUTED }}>No data yet</p>}
              </div>

              {atRisk.length > 0 && (
                <div className="rounded-xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" style={{ color: "#F59E0B" }} />
                    <h3 className="text-sm font-semibold" style={{ color: TEXT }}>At Risk</h3>
                  </div>
                  {atRisk.map(r => (
                    <div key={r.student.id} className="flex items-center gap-2 py-1.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: "#EF4444" }}>
                        {r.student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <p className="flex-1 text-xs truncate" style={{ color: TEXT }}>{r.student.name}</p>
                      <span className="text-xs font-bold" style={{ color: "#EF4444" }}>{r.score}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
