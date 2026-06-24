import {
  LayoutDashboard, BookOpen, FileText, HelpCircle, Calendar,
  Users, BarChart2, PlayCircle, Bell, GraduationCap,
  Upload, Video, Plus, Link2, ChevronDown, CheckCircle, AlertCircle, X
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
const PRIMARY = "#2563EB";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "My Batches" },
  { icon: Upload, label: "Upload Lecture", active: true },
  { icon: HelpCircle, label: "Create Quiz" },
  { icon: FileText, label: "Assignments" },
  { icon: Video, label: "Live Session" },
  { icon: Users, label: "Attendance" },
  { icon: BarChart2, label: "Progress" },
  { icon: Bell, label: "Notifications" },
];

const recentLectures = [
  { title: "Options Chain Analysis — Part 1", batch: "Advanced Trading A", module: "Module 3", duration: "1h 24m", status: "Published", views: 38 },
  { title: "Support & Resistance Mastery", batch: "Advanced Trading A", module: "Module 2", duration: "58m", status: "Published", views: 42 },
  { title: "Intro to Risk Management", batch: "Fundamentals B", module: "Module 2", duration: "44m", status: "Published", views: 22 },
  { title: "Candlestick Patterns Deep Dive", batch: "Options Trading C", module: "Module 1", duration: "1h 10m", status: "Draft", views: 0 },
];

export function FacultyUploadLecture() {
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
              style={item.active
                ? { background: "rgba(13,148,136,0.15)", color: TEAL2, borderLeft: `3px solid ${TEAL2}` }
                : { color: MUTED }}>
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
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Upload Lecture</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Add a new lecture to a batch module using a YouTube Unlisted link</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Form */}
            <div className="col-span-3 space-y-5">
              <div className="rounded-2xl p-6 space-y-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Lecture Details</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Lecture Title *</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}`, boxShadow: "0 0 0 3px rgba(13,148,136,0.1)" }}>
                      <span className="text-sm" style={{ color: TEXT }}>Volume Profile Trading — Advanced Concepts</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Batch *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Module *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Module 3 — Technical Analysis</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                </div>

                {/* YouTube URL */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>YouTube Unlisted URL *</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${TEAL}` }}>
                    <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: TEAL2 }} />
                    <span className="text-sm flex-1" style={{ color: TEXT }}>https://youtu.be/dQw4w9WgXcQ</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>✓ Valid</span>
                  </div>
                  <p className="text-[10px] mt-1.5 flex items-center gap-1" style={{ color: MUTED }}>
                    <AlertCircle className="w-3 h-3" /> Use YouTube Unlisted links only — Public links are NOT allowed for security reasons
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Duration</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>1h 10m</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Lecture Number</label>
                    <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Lecture 6</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Description (Optional)</label>
                  <div className="px-4 py-3 rounded-xl h-20" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm" style={{ color: MUTED }}>In this lecture, students will learn about Volume Profile analysis, POC levels, Value Area, and how to use volume nodes for trading decisions...</span>
                  </div>
                </div>

                {/* Notes attachment */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Attach Notes (Optional)</label>
                  <div className="flex items-center gap-3 p-4 rounded-xl border-dashed" style={{ background: "rgba(13,148,136,0.05)", border: `2px dashed rgba(13,148,136,0.3)` }}>
                    <Upload className="w-5 h-5" style={{ color: TEAL2 }} />
                    <div>
                      <p className="text-xs font-medium" style={{ color: TEAL2 }}>VolumeProfile_Notes.pdf</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>PDF · 1.4 MB · Uploaded</p>
                    </div>
                    <button className="ml-auto" style={{ color: MUTED }}><X className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: TEAL }}>
                    Publish Lecture
                  </button>
                  <button className="px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
                    Save Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Right: recent & preview */}
            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-1" style={{ color: TEXT }}>Preview</p>
                <p className="text-[10px] mb-3" style={{ color: MUTED }}>How this lecture will appear to students</p>
                <div className="rounded-xl overflow-hidden mb-3" style={{ background: SURFACE }}>
                  <div className="aspect-video flex items-center justify-center" style={{ background: "#0F2027" }}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(13,148,136,0.2)" }}>
                        <PlayCircle className="w-7 h-7" style={{ color: TEAL2 }} />
                      </div>
                      <p className="text-xs" style={{ color: MUTED }}>Video preview available after publish</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: TEXT }}>Volume Profile Trading — Advanced Concepts</p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Advanced Trading A · Module 3 · 1h 10m</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(13,148,136,0.1)", color: TEAL2 }}>Lecture 6</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(245,158,11,0.1)", color: AMBER }}>Notes attached</span>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>Recent Lectures</p>
                <div className="space-y-2.5">
                  {recentLectures.map((l, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl" style={{ background: SURFACE }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,148,136,0.1)" }}>
                        <PlayCircle className="w-4 h-4" style={{ color: TEAL2 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: TEXT }}>{l.title}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>{l.batch} · {l.duration} · {l.views} views</p>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{ background: l.status === "Published" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: l.status === "Published" ? EMERALD : AMBER }}>
                        {l.status}
                      </span>
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
