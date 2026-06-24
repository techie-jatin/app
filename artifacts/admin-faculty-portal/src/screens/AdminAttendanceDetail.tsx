import { useState } from "react";
import { CheckCircle, XCircle, Search, Download } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function AdminAttendanceDetail() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const { attendance, students, batches, markAttendance } = useApp();
  const toast = useToast();

  const batchStudents = students.filter(s => !selBatch || s.batchId === selBatch);
  const filtered = batchStudents.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const getStudentStats = (studentId: string, batchId: string) => {
    const relevant = attendance.filter(a => a.batchId === (batchId || selBatch) && studentId in a.records);
    const total = relevant.length;
    const present = relevant.filter(a => a.records[studentId] === true).length;

    const pct = total ? Math.round((present / total) * 100) : 0;
    return { total, present, pct };
  };

  const handleMark = (studentId: string, batchId: string, status: boolean) => {
    const student = students.find(s => s.id === studentId);
    const today = new Date().toISOString().split("T")[0];
    const existing = attendance.find(a => a.date === today && a.batchId === batchId);
    const newRecords = { ...(existing?.records || {}), [studentId]: status };
    markAttendance(today, batchId, newRecords, "admin");
    toast(`${student?.name} marked ${status ? "present" : "absent"}`);
  };

  const allStats = filtered.map(s => getStudentStats(s.id, s.batchId || ""));
  const avgPct = allStats.length ? Math.round(allStats.reduce((sum, s) => sum + s.pct, 0) / allStats.length) : 0;
  const goodCount = allStats.filter(s => s.pct >= 80).length;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Attendance Overview</h1>
              <p className="text-xs" style={{ color: MUTED }}>{attendance.length} records across all batches</p>
            </div>
          </div>
          <button onClick={() => toast("Export coming soon", "info")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>
            <Download className="w-4 h-4" /> Export
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Batch Average", value: `${avgPct}%`, color: avgPct >= 75 ? "#10B981" : "#F59E0B" },
              { label: "Students ≥80%", value: goodCount, color: "#10B981" },
              { label: "Total Records", value: attendance.length, color: "#3B82F6" },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <Search className="w-4 h-4" style={{ color: MUTED }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
            </div>
            <select value={selBatch} onChange={e => setSelBatch(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: selBatch ? TEXT : MUTED }}>
              <option value="">All Batches</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                  {["Student", "Batch", "Attendance", "Sessions", "Status", "Mark Today"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {filtered.map(student => {
                  const batch = batches.find(b => b.id === student.batchId);
                  const stats = getStudentStats(student.id, student.batchId || "");
                  const statusColor = stats.pct >= 80 ? "#10B981" : stats.pct >= 60 ? "#F59E0B" : stats.total === 0 ? MUTED : "#EF4444";
                  const statusLabel = stats.total === 0 ? "No records" : stats.pct >= 80 ? "Good" : stats.pct >= 60 ? "Low" : "Critical";
                  return (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                            {student.avatar || student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <p className="text-sm" style={{ color: TEXT }}>{student.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: MUTED }}>{batch?.name || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                            <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, background: statusColor }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: statusColor }}>{stats.pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: MUTED }}>{stats.present}/{stats.total}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor}15`, color: statusColor }}>{statusLabel}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleMark(student.id, student.batchId || "", true)} className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)" }} title="Mark Present">
                            <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                          </button>
                          <button onClick={() => handleMark(student.id, student.batchId || "", false)} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }} title="Mark Absent">
                            <XCircle className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filtered.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>No students found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
