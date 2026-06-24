import { useState } from "react";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";
import { FacultySidebar, MobileMenuBtn } from "../components/FacultySidebar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

export function FacultyAttendance() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const { attendance, students, batches, markAttendance } = useApp();
  const { user } = useAuth();
  const toast = useToast();

  const facultyId = user?.id || "";
  const myBatches = batches.filter(b => b.facultyId === facultyId);

  const activeBatchId = selBatch || myBatches[0]?.id || "";
  const batchStudents = students.filter(s => s.batchId === activeBatchId);
  const filtered = batchStudents.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const getStudentStats = (studentId: string) => {
    const batchRecords = attendance.filter(a => a.batchId === activeBatchId && studentId in a.records);
    const total = batchRecords.length;
    const present = batchRecords.filter(a => a.records[studentId] === true).length;
    const pct = total ? Math.round((present / total) * 100) : 0;
    return { total, present, pct };
  };

  const handleMark = (studentId: string, status: boolean) => {
    const student = students.find(s => s.id === studentId);
    if (!activeBatchId) { toast("Select a batch first", "error"); return; }
    const today = new Date().toISOString().split("T")[0];
    const existing = attendance.find(a => a.date === today && a.batchId === activeBatchId);
    const newRecords = { ...(existing?.records || {}), [studentId]: status };
    markAttendance(today, activeBatchId, newRecords, facultyId || "faculty");
    toast(`${student?.name} marked ${status ? "present" : "absent"}`);
  };

  const allStats = filtered.map(s => getStudentStats(s.id));
  const avgPct = allStats.length ? Math.round(allStats.reduce((sum, s) => sum + s.pct, 0) / allStats.length) : 0;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <FacultySidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Attendance</h1>
              <p className="text-xs" style={{ color: MUTED }}>{filtered.length} students</p>
            </div>
          </div>
          <button onClick={() => toast("Export coming soon", "info")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#10B981" }}>{avgPct}%</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Batch Average</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#3B82F6" }}>{allStats.filter(s => s.pct >= 80).length}</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Students ≥80%</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-bold" style={{ color: "#EF4444" }}>{allStats.filter(s => s.total > 0 && s.pct < 75).length}</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>At Risk (&lt;75%)</p>
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
                  {["Student", "Attendance", "Sessions", "Status", "Mark Today"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {filtered.map(student => {
                  const stats = getStudentStats(student.id);
                  const attColor = stats.pct >= 80 ? "#10B981" : stats.pct >= 60 ? "#F59E0B" : stats.total === 0 ? MUTED : "#EF4444";
                  const statusLabel = stats.total === 0 ? "No data" : stats.pct >= 80 ? "Good" : stats.pct >= 60 ? "Low" : "Critical";
                  return (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#0F766E,#14B8A6)" }}>
                            {student.avatar || student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <p className="text-sm" style={{ color: TEXT }}>{student.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                            <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, background: attColor }} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: attColor }}>{stats.pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: MUTED }}>{stats.present}/{stats.total}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${attColor}15`, color: attColor }}>{statusLabel}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleMark(student.id, true)} className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)" }} title="Present">
                            <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                          </button>
                          <button onClick={() => handleMark(student.id, false)} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)" }} title="Absent">
                            <XCircle className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filtered.length && <tr><td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>
                  {!activeBatchId ? "No batch selected" : "No students in this batch"}
                </td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
