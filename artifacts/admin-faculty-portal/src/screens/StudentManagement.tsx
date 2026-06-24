
import { AlertCircle, Award, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronDown, Clock, Download, Edit2, Eye, Filter, GraduationCap, Layers, Menu, MoreVertical, Plus, Search, Settings, Shield, TrendingUp, UserCheck, Users, X, XCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER = "#1F2937";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";

const students = [
  { id: "TC-001", name: "Rahul Sharma", email: "rahul@email.com", batch: "Advanced Trading A", batchStyle: { background: "rgba(139,92,246,0.12)", color: "#8B5CF6" }, status: "Active", attendance: 91, quiz: 88, joined: "12 Jan 2026", avatar: "RS" },
  { id: "TC-002", name: "Priya Mehta", email: "priya@email.com", batch: "Unassigned", batchStyle: { background: "rgba(245,158,11,0.12)", color: "#F59E0B" }, status: "Pending", attendance: 0, quiz: 0, joined: "20 Jun 2026", avatar: "PM" },
  { id: "TC-003", name: "Arjun Kapoor", email: "arjun@email.com", batch: "Fundamentals B", batchStyle: { background: "rgba(37,99,235,0.12)", color: "#3B82F6" }, status: "Active", attendance: 78, quiz: 72, joined: "3 Feb 2026", avatar: "AK" },
  { id: "TC-004", name: "Sneha Joshi", email: "sneha@email.com", batch: "Unassigned", batchStyle: { background: "rgba(245,158,11,0.12)", color: "#F59E0B" }, status: "Pending", attendance: 0, quiz: 0, joined: "22 Jun 2026", avatar: "SJ" },
  { id: "TC-005", name: "Vikram Patel", email: "vikram@email.com", batch: "Options Trading C", batchStyle: { background: "rgba(16,185,129,0.12)", color: "#10B981" }, status: "Active", attendance: 94, quiz: 95, joined: "8 Dec 2025", avatar: "VP" },
  { id: "TC-006", name: "Kavya Nair", email: "kavya@email.com", batch: "Advanced Trading A", batchStyle: { background: "rgba(139,92,246,0.12)", color: "#8B5CF6" }, status: "Suspended", attendance: 55, quiz: 60, joined: "1 Mar 2026", avatar: "KN" },
  { id: "TC-007", name: "Mohit Singh", email: "mohit@email.com", batch: "Fundamentals B", batchStyle: { background: "rgba(37,99,235,0.12)", color: "#3B82F6" }, status: "Active", attendance: 82, quiz: 79, joined: "15 Jan 2026", avatar: "MS" },
];

const navItems = [
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Students", active: true, path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" },
  { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" },
  { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: BarChart2, label: "Reports", path: "/admin/reports" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { background: string; color: string }> = {
    Active: { background: "rgba(16,185,129,0.12)", color: "#10B981" },
    Pending: { background: "rgba(245,158,11,0.12)", color: "#F59E0B" },
    Suspended: { background: "rgba(239,68,68,0.12)", color: "#EF4444" },
  };
  const icons = { Active: CheckCircle, Pending: Clock, Suspended: XCircle };
  const Icon = icons[status as keyof typeof icons];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={styles[status]}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

function AttendanceBar({ value }: { value: number }) {
  const color = value >= 80 ? EMERALD : value >= 60 ? AMBER : RED;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs w-8 text-right" style={{ color: TEXT2 }}>{value}%</span>
    </div>
  );
}

export function StudentManagement() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins'] w-full" style={{ background: BG, color: TEXT }}>
      <aside className="hidden md:flex w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
        <div className="px-5 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-72 flex flex-col h-full" style={{ background: "#111827", borderRight: "1px solid #1F2937" }}>
            <div className="px-5 py-4 flex items-center justify-between">
              <p className="font-bold text-white">TradeCoach</p>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
              {navItems && navItems.map((item) => (
                <button key={item.label} onClick={() => { item.path && navigate(item.path); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: "#94A3B8" }}>
                  {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <button className="md:hidden p-2 rounded-lg mr-2" style={{ background: "rgba(255,255,255,0.05)" }} onClick={() => setMobileOpen(v => !v)}><Menu className="w-5 h-5" style={{ color: "#94A3B8" }} /></button>
          <div>
            <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Student Management</h1>
            <p className="text-xs" style={{ color: MUTED }}>248 students · 6 unassigned</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER}` }}>
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: "#0D1526" }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: MUTED }} />
              <input className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none" style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT2 }} placeholder="Search students..." readOnly />
            </div>
            {["Filter", "All Batches", "All Status"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}>
                {i === 0 ? <Filter className="w-4 h-4" /> : null}{label}{i > 0 ? <ChevronDown className="w-4 h-4" /> : null}
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-5 py-3.5 flex items-center gap-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: AMBER }} />
            <p className="text-sm" style={{ color: "#FCD34D" }}><span className="font-semibold">6 students</span> are waiting for batch assignment.</p>
            <button className="ml-auto text-sm font-semibold px-3 py-1.5 rounded-xl flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)", color: AMBER }}>Assign Now</button>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <th className="px-4 py-3 text-left"><input type="checkbox" readOnly /></th>
                  {["Student", "Batch", "Status", "Attendance", "Quiz Score", "Joined", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <td className="px-4 py-3.5"><input type="checkbox" readOnly /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: PRIMARY }}>{s.avatar}</div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: TEXT2 }}>{s.name}</p>
                          <p className="text-xs" style={{ color: MUTED }}>{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium" style={s.batchStyle}>{s.batch}</span></td>
                    <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3.5 w-32">{s.attendance > 0 ? <AttendanceBar value={s.attendance} /> : <span className="text-xs" style={{ color: MUTED }}>—</span>}</td>
                    <td className="px-4 py-3.5">
                      {s.quiz > 0 ? <span className="text-sm font-semibold" style={{ color: s.quiz >= 80 ? EMERALD : s.quiz >= 60 ? AMBER : RED }}>{s.quiz}%</span> : <span className="text-xs" style={{ color: MUTED }}>—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-xs" style={{ color: MUTED }}>{s.joined}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {s.status === "Pending" ? (
                          <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl font-medium text-white" style={{ background: PRIMARY }}>
                            <Layers className="w-3 h-3" /> Assign
                          </button>
                        ) : (
                          <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Eye className="w-3.5 h-3.5" /></button>
                        )}
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Shield className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="text-sm" style={{ color: MUTED }}>Showing 7 of 248 students</p>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, "...", 35].map((p, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg text-sm flex items-center justify-center" style={p === 1 ? { background: PRIMARY, color: "#fff", fontWeight: 600 } : { color: MUTED }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
