
import { Award, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronDown, Clock, Eye, FileText, GraduationCap, Layers, Menu, Paperclip, Plus, TrendingUp, Upload, Users, X } from "lucide-react";
import { useState } from "react";
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
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", active: true, path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const recentAssignments = [
  { title: "Chart Analysis — Nifty 50", batch: "Advanced Trading A", deadline: "Jun 20", submissions: "38/42", status: "Closed" },
  { title: "Fundamental Analysis Report", batch: "Fundamentals B", deadline: "Jun 22", submissions: "20/24", status: "Closed" },
  { title: "Options Strategy Paper", batch: "Options Trading C", deadline: "Jun 28", submissions: "10/18", status: "Open" },
  { title: "Volume Profile Worksheet", batch: "Advanced Trading A", deadline: "Jun 30", submissions: "0/42", status: "Upcoming" },
];

const statusColors: Record<string, string> = { Closed: MUTED, Open: EMERALD, Upcoming: AMBER };

export function AdminAssignmentCreator() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div className="w-full min-h-screen flex overflow-hidden font-['Inter']" style={{ background: BG }}>
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
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Assignment Creator</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Create and publish assignments to any batch · Students download brief & upload submission</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>Save Draft</button>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: PRIMARY }}>Publish Assignment</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Form */}
            <div className="col-span-3 space-y-5">
              <div className="rounded-2xl p-6 space-y-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Assignment Details</p>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assignment Title *</label>
                  <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${PRIMARY}`, boxShadow: "0 0 0 3px rgba(37,99,235,0.08)" }}>
                    <span className="text-sm" style={{ color: TEXT }}>Derivatives & F&O Analysis — Assignment 4</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assign to Batch *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Graded by</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Dr. Anand Kumar (Faculty)</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Total Marks *</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>25 marks</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Submission Type</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>PDF / Image</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Deadline *</label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Clock className="w-4 h-4" style={{ color: AMBER }} />
                      <span className="text-sm" style={{ color: TEXT }}>Jun 30 · 11:59 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Instructions *</label>
                  <div className="px-4 py-3 rounded-xl h-28" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
                      1. Download the assignment brief PDF below.<br />
                      2. Identify 3 F&O opportunities from the Nifty Options Chain.<br />
                      3. Write your entry, exit, stop-loss, and target for each trade.<br />
                      4. Submit your analysis as a PDF or handwritten scanned image.
                    </span>
                  </div>
                </div>

                {/* Brief upload */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assignment Brief (PDF) *</label>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(37,99,235,0.05)", border: "2px dashed rgba(37,99,235,0.25)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.1)" }}>
                        <Paperclip className="w-5 h-5" style={{ color: "#60A5FA" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#60A5FA" }}>Assignment4_FO_Analysis.pdf</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>PDF · 1.8 MB · Uploaded</p>
                      </div>
                      <button className="ml-auto" style={{ color: MUTED }}><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                {/* Extra options */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Allow late submissions", sub: "Submissions after deadline marked 'Late'", on: true },
                    { label: "Send push notification", sub: "Notify batch students on publish", on: true },
                  ].map((opt) => (
                    <div key={opt.label} className="flex items-start justify-between gap-3 p-3 rounded-xl" style={{ background: SURFACE }}>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: TEXT2 }}>{opt.label}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{opt.sub}</p>
                      </div>
                      <div className="w-10 h-5 rounded-full relative flex-shrink-0 mt-0.5" style={{ background: opt.on ? PRIMARY : BORDER2 }}>
                        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white" style={{ left: opt.on ? "22px" : "2px" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: PRIMARY }}>Publish Assignment</button>
                  <button className="px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>Save Draft</button>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Publish Checklist</p>
                <div className="space-y-2.5">
                  {[
                    "Title added", "Batch selected", "Marks set",
                    "Deadline set", "Instructions written", "Brief PDF uploaded",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} />
                      <span className="text-xs" style={{ color: TEXT2 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[10px] font-bold" style={{ color: EMERALD }}>✓ All fields complete — ready to publish</p>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold" style={{ color: TEXT }}>All Assignments</p>
                  <button className="text-xs" style={{ color: "#60A5FA" }}>View All</button>
                </div>
                <div className="space-y-2.5">
                  {recentAssignments.map((a, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: SURFACE }}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold leading-snug" style={{ color: TEXT }}>{a.title}</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ background: `${statusColors[a.status]}18`, color: statusColors[a.status] }}>
                          {a.status}
                        </span>
                      </div>
                      <p className="text-[10px] mt-1" style={{ color: MUTED }}>{a.batch} · Due {a.deadline} · {a.submissions} submitted</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
