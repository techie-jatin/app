import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  Users, BarChart2, Bell, GraduationCap,
  Upload, Video, Calendar, Clock, CheckCircle, Circle, X, Plus, ChevronDown, Paperclip
} from "lucide-react";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const TEAL = "#0D9488";
const TEAL2 = "#14B8A6";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "My Batches" },
  { icon: Upload, label: "Upload Lecture" },
  { icon: HelpCircle, label: "Create Quiz" },
  { icon: FileText, label: "Assignments", active: true },
  { icon: Video, label: "Live Session" },
  { icon: Users, label: "Attendance" },
  { icon: BarChart2, label: "Progress" },
  { icon: Bell, label: "Notifications" },
];

const recentAssignments = [
  { title: "Chart Analysis — Nifty 50", batch: "Advanced Trading A", submissions: "38/42", deadline: "Jun 20", status: "Closed" },
  { title: "Fundamental Analysis Report", batch: "Fundamentals B", submissions: "20/24", deadline: "Jun 22", status: "Closed" },
  { title: "Options Strategy Paper", batch: "Options Trading C", submissions: "10/18", deadline: "Jun 28", status: "Open" },
];

export function FacultyCreateAssignment() {
  return (
    <div className="w-[1280px] h-[800px] flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: TEAL }}>
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: TEAL2 }}>Faculty Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-4" style={{ background: SURFACE }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: TEAL }}>AK</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: TEXT }}>Dr. Anand Kumar</p>
            <p className="text-[10px] truncate" style={{ color: TEAL2 }}>Senior Mentor</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(13,148,136,0.15)", color: TEAL2, borderLeft: `3px solid ${TEAL2}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Create Assignment</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Upload an assignment brief and set deadline for a batch</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>Save Draft</button>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: TEAL }}>Publish Assignment</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 space-y-5">
              <div className="rounded-2xl p-6 space-y-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Assignment Details</p>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assignment Title *</label>
                  <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}`, boxShadow: "0 0 0 3px rgba(13,148,136,0.1)" }}>
                    <span className="text-sm" style={{ color: TEXT }}>Volume Profile Chart Analysis — Assignment 3</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Batch *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Total Marks *</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>20 marks</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Submission Deadline *</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Calendar className="w-4 h-4" style={{ color: AMBER }} />
                      <span className="text-sm" style={{ color: TEXT }}>Jun 28, 2025 · 11:59 PM</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Submission Type</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>PDF / Image upload</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Instructions *</label>
                  <div className="px-4 py-3 rounded-xl h-28" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
                      1. Open the Nifty 50 daily chart on TradingView.<br />
                      2. Identify the Volume Profile POC, VAH, and VAL zones.<br />
                      3. Mark key support/resistance from volume nodes.<br />
                      4. Write a brief 200-word analysis explaining your entry/exit strategy.
                    </span>
                  </div>
                </div>

                {/* File upload */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Assignment Brief (PDF) *</label>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(13,148,136,0.05)", border: `2px dashed rgba(13,148,136,0.3)` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)" }}>
                        <Paperclip className="w-5 h-5" style={{ color: TEAL2 }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: TEAL2 }}>Assignment3_VolumeProfile.pdf</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>PDF · 2.1 MB · Uploaded successfully</p>
                      </div>
                      <button className="ml-auto" style={{ color: MUTED }}><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                {/* Late submission */}
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: SURFACE }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: TEXT2 }}>Allow late submissions</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>Students can submit after deadline (marked late)</p>
                  </div>
                  <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: TEAL }}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-4" style={{ color: TEXT }}>Checklist</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Title added", done: true },
                    { label: "Batch selected", done: true },
                    { label: "Marks set", done: true },
                    { label: "Deadline set", done: true },
                    { label: "Instructions written", done: true },
                    { label: "Brief PDF uploaded", done: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: EMERALD }} />
                      <span className="text-xs" style={{ color: TEXT2 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[10px] font-bold" style={{ color: EMERALD }}>✓ Ready to publish — all fields complete</p>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Past Assignments</p>
                <div className="space-y-3">
                  {recentAssignments.map((a, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: SURFACE }}>
                      <p className="text-xs font-medium" style={{ color: TEXT }}>{a.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px]" style={{ color: MUTED }}>{a.batch} · {a.submissions} submitted</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: a.status === "Open" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)", color: a.status === "Open" ? EMERALD : MUTED }}>
                          {a.status}
                        </span>
                      </div>
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
