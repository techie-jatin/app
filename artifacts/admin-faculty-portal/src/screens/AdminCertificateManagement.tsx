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
  const [previewCertId, setPreviewCertId] = useState<string | null>(null);
  const [selStudent, setSelStudent] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const { certificates, students, batches, issueCertificate, addCertificate } = useApp();
  const toast = useToast();

  const previewCert = previewCertId ? certificates.find(c => c.id === previewCertId) : null;
  const previewStudent = previewCert ? students.find(s => s.id === previewCert.studentId) : null;
  const previewBatch = previewCert ? batches.find(b => b.id === previewCert.batchId) : null;

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
                          <button onClick={() => setPreviewCertId(cert.id)} className="p-1.5 rounded-lg" style={{ background: "rgba(37,99,235,0.1)" }} title="Preview">
                            <Eye className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
                          </button>
                          <button onClick={() => toast("PDF download available in production build", "info")} className="p-1.5 rounded-lg" style={{ background: "rgba(100,116,139,0.1)" }} title="Download">
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

      {previewCert && previewStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreviewCertId(null)}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()} style={{ background: "#0F172A", border: "1px solid #1E293B" }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: "#F59E0B" }} />
                <span className="text-sm font-semibold" style={{ color: TEXT }}>Certificate Preview</span>
              </div>
              <button onClick={() => setPreviewCertId(null)}><X className="w-4 h-4" style={{ color: MUTED }} /></button>
            </div>
            <div className="p-8">
              <div className="rounded-xl p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0F172A 100%)", border: "2px solid #F59E0B" }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#F59E0B 0,#F59E0B 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
                <div className="relative z-10 space-y-5">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#F59E0B" }}>TradeCoach Academy</p>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>Certificate of Completion</h2>
                    <p className="text-xs" style={{ color: "#94A3B8" }}>This is to certify that</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: "#F59E0B", fontFamily: "Georgia, serif" }}>{previewStudent.name}</p>
                    <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>has successfully completed</p>
                  </div>
                  <div className="px-6 py-3 rounded-lg inline-block" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <p className="text-base font-semibold" style={{ color: "#FFFFFF" }}>{previewBatch?.name || "Trading Course"}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(245,158,11,0.2)" }}>
                    <div className="text-left">
                      <p className="text-xs font-mono" style={{ color: "#64748B" }}>{previewCert.certificateNo}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>Certificate No.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-px h-8 mx-auto mb-1" style={{ background: "rgba(245,158,11,0.3)" }} />
                      <p className="text-xs" style={{ color: "#64748B" }}>Director's Sign</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "#64748B" }}>{previewCert.issuedAt ? new Date(previewCert.issuedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>Date of Issue</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setPreviewCertId(null)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: SURFACE, color: MUTED }}>Close</button>
                <button onClick={() => toast("PDF download available in production build", "info")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2563EB" }}>
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
