import { useState } from "react";
import { Award, Search, Plus, CheckCircle, Clock, Download, Eye, X, Check } from "lucide-react";
import { AdminSidebar, MobileMenuBtn } from "../components/AdminSidebar";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

const BG = "#0B1120", CARD = "#111827", SURFACE = "#1F2937", BORDER = "#1F2937", TEXT = "#FFFFFF", MUTED = "#64748B";

const STATUS_CFG = {
  issued:   { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Issued" },
  pending:  { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Pending" },
  revoked:  { color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "Revoked" },
};

export function AdminCertificateManagement() {
  const [mob, setMob] = useState(false);
  const [search, setSearch] = useState("");
  const [showIssue, setShowIssue] = useState(false);
  const [selStudent, setSelStudent] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const { certificates, students, batches, issueCertificate, addCertificate } = useApp();
  const toast = useToast();

  const filtered = certificates.filter(c => {
    if (!search) return true;
    const student = students.find(s => s.id === c.studentId);
    return student?.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleIssue = () => {
    if (!selStudent) { toast("Select a student", "error"); return; }
    const student = students.find(s => s.id === selStudent);
    const batchId = selBatch || student?.batchId || "";
    if (!batchId) { toast("Student must be assigned to a batch first", "error"); return; }
    const certNo = `TCA-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(3, "0")}`;
    addCertificate({ studentId: selStudent, batchId, status: "issued", certificateNo: certNo });
    toast(`Certificate issued to ${student?.name}`);
    setSelStudent(""); setSelBatch(""); setShowIssue(false);
  };

  const handleApprove = (certId: string, studentName: string) => {
    issueCertificate(certId);
    toast(`Certificate issued to ${studentName}`);
  };

  const issued = certificates.filter(c => c.status === "issued").length;
  const pending = certificates.filter(c => c.status === "pending").length;

  return (
    <div className="flex h-screen" style={{ background: BG }}>
      <AdminSidebar mobileOpen={mob} setMobileOpen={setMob} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <MobileMenuBtn onClick={() => setMob(true)} />
            <div>
              <h1 className="text-lg font-bold" style={{ color: TEXT }}>Certificates</h1>
              <p className="text-xs" style={{ color: MUTED }}>{certificates.length} total</p>
            </div>
          </div>
          <button onClick={() => setShowIssue(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
            <Plus className="w-4 h-4" /> Issue Certificate
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Issued", value: issued, color: "#10B981", icon: Award },
              { label: "Pending Approval", value: pending, color: "#F59E0B", icon: Clock },
              { label: "Total Students", value: students.length, color: "#3B82F6", icon: CheckCircle },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <s.icon className="w-8 h-8 flex-shrink-0" style={{ color: s.color }} />
                <div>
                  <p className="text-xl font-bold" style={{ color: TEXT }}>{s.value}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <Search className="w-4 h-4" style={{ color: MUTED }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student name…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: TEXT }} />
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                  {["Student", "Batch", "Certificate No.", "Issued At", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {filtered.map(cert => {
                  const student = students.find(s => s.id === cert.studentId);
                  const batch = batches.find(b => b.id === cert.batchId);
                  const cfg = STATUS_CFG[cert.status as keyof typeof STATUS_CFG] || STATUS_CFG.pending;
                  return (
                    <tr key={cert.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                            {student?.avatar || student?.name.split(" ").map(n => n[0]).join("").slice(0, 2) || "?"}
                          </div>
                          <p className="text-sm" style={{ color: TEXT }}>{student?.name || "Unknown"}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: MUTED }}>{batch?.name || "—"}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: MUTED }}>{cert.certificateNo}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: MUTED }}>{cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString("en-IN") : "—"}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {cert.status === "pending" && (
                            <button onClick={() => handleApprove(cert.id, student?.name || "")} className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)" }} title="Approve & Issue">
                              <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                            </button>
                          )}
                          <button onClick={() => toast("Preview coming soon", "info")} className="p-1.5 rounded-lg" style={{ background: "rgba(37,99,235,0.1)" }}>
                            <Eye className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
                          </button>
                          <button onClick={() => toast("Download coming soon", "info")} className="p-1.5 rounded-lg" style={{ background: "rgba(100,116,139,0.1)" }}>
                            <Download className="w-3.5 h-3.5" style={{ color: MUTED }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filtered.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>No certificates {search ? "matching search" : "issued yet"}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 space-y-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: TEXT }}>Issue Certificate</h2>
              <button onClick={() => setShowIssue(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Student *</label>
              <select value={selStudent} onChange={e => setSelStudent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: selStudent ? TEXT : MUTED }}>
                <option value="">Select student…</option>
                {students.filter(s => s.batchId).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: MUTED }}>Batch (override)</label>
              <select value={selBatch} onChange={e => setSelBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: selBatch ? TEXT : MUTED }}>
                <option value="">Auto (student's batch)</option>
                {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <p className="text-xs" style={{ color: MUTED }}>Certificate number will be auto-generated as TCA-YYYY-NNN</p>
            <div className="flex gap-3">
              <button onClick={() => setShowIssue(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Cancel</button>
              <button onClick={handleIssue} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                <Check className="w-4 h-4" /> Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
