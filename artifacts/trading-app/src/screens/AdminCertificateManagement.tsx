import {
  BarChart2, Users, GraduationCap, Layers, BookOpen, Calendar,
  Bell, Award, TrendingUp, Upload, Download, Eye, Plus,
  CheckCircle, Clock, Search, ChevronDown, FileText, Star
} from "lucide-react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const GOLD = "#D4AF37";
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", active: true, path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const issued = [
  { student: "Vikram Patel", avatar: "VP", batch: "Advanced Trading A", course: "Module 1 Completion", date: "Jun 23", status: "Issued", downloaded: true },
  { student: "Arjun Kapoor", avatar: "AK", batch: "Advanced Trading A", course: "Module 1 Completion", date: "Jun 23", status: "Issued", downloaded: true },
  { student: "Priya Mehta", avatar: "PM", batch: "Advanced Trading A", course: "Module 1 Completion", date: "Jun 21", status: "Issued", downloaded: false },
  { student: "Sneha Joshi", avatar: "SJ", batch: "Fundamentals B", course: "Module 2 Completion", date: "Jun 18", status: "Issued", downloaded: true },
  { student: "Rahul Sharma", avatar: "RS", batch: "Advanced Trading A", course: "Module 1 Completion", date: "Jun 15", status: "Pending", downloaded: false },
  { student: "Kavya Reddy", avatar: "KR", batch: "Options Trading C", course: "Module 1 Completion", date: "—", status: "Not Issued", downloaded: false },
];

export function AdminCertificateManagement() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PRIMARY }}>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#60A5FA", borderLeft: `3px solid ${PRIMARY}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Certificate Management</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Upload, generate, and assign certificates to students</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
              <Upload className="w-3.5 h-3.5" /> Upload Template
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: PRIMARY }}>
              <Plus className="w-3.5 h-3.5" /> Issue Certificate
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Issued", value: "28", color: GOLD, icon: Award },
              { label: "This Month", value: "10", color: EMERALD, icon: CheckCircle },
              { label: "Pending Issue", value: "3", color: AMBER, icon: Clock },
              { label: "Downloaded", value: "24", color: PRIMARY, icon: Download },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-6">
            {/* Certificate table */}
            <div className="col-span-3 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>All Certificates</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: SURFACE }}>
                    <Search className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    <span className="text-xs" style={{ color: MUTED }}>Search...</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: SURFACE }}>
                    <span className="text-xs" style={{ color: TEXT }}>All Batches</span>
                    <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                  </div>
                </div>
              </div>

              {/* Header row */}
              <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: SURFACE, borderBottom: `1px solid ${BORDER2}`, color: MUTED }}>
                <div className="col-span-3">Student</div>
                <div className="col-span-3">Course / Module</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {issued.map((c, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-5 py-3" style={{ borderBottom: `1px solid ${BORDER2}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: c.status === "Issued" ? GOLD : c.status === "Pending" ? AMBER : SURFACE }}>
                      {c.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: TEXT }}>{c.student}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>{c.batch}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs" style={{ color: TEXT2 }}>{c.course}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs" style={{ color: MUTED }}>{c.date}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg"
                      style={{
                        background: c.status === "Issued" ? "rgba(212,175,55,0.1)" : c.status === "Pending" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)",
                        color: c.status === "Issued" ? GOLD : c.status === "Pending" ? AMBER : MUTED,
                      }}>
                      {c.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    {c.status === "Issued" && <button style={{ color: MUTED }}><Eye className="w-4 h-4" /></button>}
                    {c.status === "Not Issued" && (
                      <button className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>Issue</button>
                    )}
                    {c.status === "Pending" && (
                      <button className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>Approve</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: issue form + template */}
            <div className="col-span-2 space-y-4">
              {/* Certificate preview */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Certificate Preview</p>
                <div className="rounded-xl p-4 text-center" style={{ background: "linear-gradient(135deg,#1E3A8A,#0F172A)", border: "2px solid rgba(212,175,55,0.3)" }}>
                  <div className="text-2xl mb-2">🏅</div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: GOLD }}>Certificate of Completion</p>
                  <p className="text-white font-bold text-sm">Vikram Patel</p>
                  <p className="text-[10px] mt-1" style={{ color: "#93C5FD" }}>Module 1 — Market Structure & Basics</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#64748B" }}>Advanced Trading Batch A</p>
                  <div className="mt-3 pt-2 flex items-center justify-between" style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                    <p className="text-[8px]" style={{ color: "#64748B" }}>Jun 23, 2025</p>
                    <p className="text-[8px]" style={{ color: GOLD }}>TradeCoach Academy</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2 }}>
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white" style={{ background: PRIMARY }}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>

              {/* Issue to student form */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Issue Certificate</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Student</label>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: TEXT }}>Rahul Sharma</span>
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Certificate For</label>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-xs" style={{ color: TEXT }}>Module 1 Completion</span>
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold mb-1.5" style={{ color: MUTED }}>Upload Signed PDF (optional)</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-dashed" style={{ background: "rgba(37,99,235,0.04)", border: `1.5px dashed rgba(37,99,235,0.25)` }}>
                      <Upload className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
                      <span className="text-xs" style={{ color: MUTED }}>Upload PDF or auto-generate</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-white" style={{ background: GOLD }}>
                    <Award className="w-3.5 h-3.5" /> Issue & Notify Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
