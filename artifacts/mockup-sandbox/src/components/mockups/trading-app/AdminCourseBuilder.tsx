import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, Plus, Upload,
  PlayCircle, HelpCircle, ClipboardList, Trash2, Edit2,
  GripVertical, ChevronDown, CheckCircle, Link, FileVideo,
  Eye, Save, AlertCircle
} from "lucide-react";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER = "#1F2937";
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
  { icon: BarChart2, label: "Dashboard" }, { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Faculty" }, { icon: Layers, label: "Batches" },
  { icon: BookOpen, label: "Courses", active: true }, { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" }, { icon: Award, label: "Certificates" },
  { icon: TrendingUp, label: "Reports" },
];

const modules = [
  {
    id: 1, title: "Market Structure & Basics", published: true,
    items: [
      { type: "lecture", title: "What is the Stock Market?", duration: "42 min", status: "published" },
      { type: "lecture", title: "Bull & Bear Market Cycles", duration: "38 min", status: "published" },
      { type: "quiz", title: "Quiz 1 — Basics Check", questions: 10, status: "published" },
      { type: "assignment", title: "Assignment: Chart Identification", status: "published" },
    ],
  },
  {
    id: 2, title: "Technical Analysis", published: true,
    items: [
      { type: "lecture", title: "Support & Resistance", duration: "50 min", status: "published" },
      { type: "lecture", title: "Chart Patterns & Trendlines", duration: "58 min", status: "published" },
      { type: "lecture", title: "RSI, MACD, Moving Averages", duration: "1h 12m", status: "draft" },
      { type: "quiz", title: "Quiz 2 — Technical Analysis", questions: 15, status: "draft" },
    ],
  },
  {
    id: 3, title: "Options & Derivatives", published: false,
    items: [
      { type: "lecture", title: "Options Fundamentals", duration: "—", status: "empty" },
    ],
  },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  lecture: { icon: PlayCircle, color: PRIMARY, bg: "rgba(37,99,235,0.12)", label: "Lecture" },
  quiz: { icon: HelpCircle, color: EMERALD, bg: "rgba(16,185,129,0.12)", label: "Quiz" },
  assignment: { icon: ClipboardList, color: AMBER, bg: "rgba(245,158,11,0.12)", label: "Assignment" },
};

const statusStyle: Record<string, { label: string; color: string; bg: string }> = {
  published: { label: "Published", color: EMERALD, bg: "rgba(16,185,129,0.1)" },
  draft: { label: "Draft", color: AMBER, bg: "rgba(245,158,11,0.1)" },
  empty: { label: "Empty", color: MUTED, bg: "rgba(100,116,139,0.1)" },
};

export function AdminCourseBuilder() {
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
        <div className="px-5 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Course builder area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Course Builder</h1>
              <p className="text-xs" style={{ color: MUTED }}>Adv. Options & Derivatives Mastery · Batch A</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: EMERALD }}>
                <CheckCircle className="w-4 h-4" /> Publish All
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
                <Save className="w-4 h-4" /> Save Draft
              </button>
            </div>
          </header>

          {/* Progress bar */}
          <div className="px-6 py-3 flex items-center gap-4 flex-shrink-0" style={{ background: "#0D1526", borderBottom: `1px solid ${BORDER}` }}>
            {[
              { label: "Modules", value: "3 / 4", color: PRIMARY },
              { label: "Lectures", value: "7 / 19", color: EMERALD },
              { label: "Published", value: "62%", color: EMERALD },
              { label: "Draft Items", value: "5", color: AMBER },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
                <span className="text-xs" style={{ color: MUTED }}>{s.label}</span>
                {i < 3 && <div className="w-px h-4 mx-2" style={{ background: BORDER2 }} />}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <div className="h-2 w-40 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                <div className="h-full rounded-full" style={{ width: "62%", background: "linear-gradient(90deg, #2563EB, #10B981)" }} />
              </div>
              <span className="text-xs font-bold" style={{ color: EMERALD }}>62% done</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: "#0D1526" }}>
            {modules.map((mod) => (
              <div key={mod.id} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                {/* Module header */}
                <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <GripVertical className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background: "rgba(37,99,235,0.15)", color: PRIMARY }}>
                    {mod.id}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: TEXT }}>{mod.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{mod.items.length} items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={mod.published ? { background: "rgba(16,185,129,0.1)", color: EMERALD } : { background: "rgba(245,158,11,0.1)", color: AMBER }}>
                      {mod.published ? "Published" : "Draft"}
                    </span>
                    <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><ChevronDown className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y" style={{ borderColor: BORDER }}>
                  {mod.items.map((item: any, ii) => {
                    const tc = typeConfig[item.type];
                    const sc = statusStyle[item.status];
                    return (
                      <div key={ii} className="flex items-center gap-3 px-5 py-3">
                        <GripVertical className="w-3.5 h-3.5 flex-shrink-0" style={{ color: BORDER2 }} />
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tc.bg }}>
                          <tc.icon className="w-3.5 h-3.5" style={{ color: tc.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: item.status === "empty" ? MUTED : TEXT2 }}>{item.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px]" style={{ color: tc.color }}>{tc.label}</span>
                            {item.duration && <span className="text-[10px]" style={{ color: MUTED }}>· {item.duration}</span>}
                            {item.questions && <span className="text-[10px]" style={{ color: MUTED }}>· {item.questions} questions</span>}
                          </div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: sc.bg, color: sc.color }}>
                          {sc.label}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3 h-3" /></button>
                          <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add item row */}
                <div className="px-5 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${BORDER}` }}>
                  {[
                    { icon: PlayCircle, label: "Add Lecture", color: PRIMARY },
                    { icon: HelpCircle, label: "Add Quiz", color: EMERALD },
                    { icon: ClipboardList, label: "Add Assignment", color: AMBER },
                  ].map((btn) => (
                    <button key={btn.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                      style={{ background: SURFACE, border: `1px dashed ${BORDER2}`, color: btn.color }}>
                      <btn.icon className="w-3.5 h-3.5" /> {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Module */}
            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold"
              style={{ background: "rgba(37,99,235,0.07)", border: "2px dashed rgba(37,99,235,0.25)", color: PRIMARY }}>
              <Plus className="w-4 h-4" /> Add New Module
            </button>
          </div>
        </div>

        {/* Right: Upload / item editor panel */}
        <div className="w-80 flex flex-col flex-shrink-0" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
          <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Upload Lecture</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Module 3 — Options & Derivatives</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Drag & drop */}
            <div className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-8 gap-3 cursor-pointer"
              style={{ borderColor: PRIMARY, background: "rgba(37,99,235,0.04)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.12)" }}>
                <Upload className="w-6 h-6" style={{ color: PRIMARY }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: TEXT }}>Drop video here</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>MP4, MOV · Max 4 GB</p>
              </div>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: PRIMARY }}>Browse File</button>
            </div>

            {/* OR YouTube */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: BORDER2 }} />
              <span className="text-xs" style={{ color: MUTED }}>or paste YouTube URL</span>
              <div className="flex-1 h-px" style={{ background: BORDER2 }} />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <Link className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                <span className="text-sm" style={{ color: MUTED }}>https://youtube.com/…</span>
              </div>
              <button className="px-3 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: PRIMARY }}>Add</button>
            </div>

            {/* Recent upload */}
            <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.12)" }}>
                <FileVideo className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: TEXT2 }}>options_fundamentals_v2.mp4</p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Uploading · 64%</p>
                <div className="h-1.5 w-full rounded-full overflow-hidden mt-1" style={{ background: BORDER2 }}>
                  <div className="h-full rounded-full" style={{ width: "64%", background: PRIMARY }} />
                </div>
              </div>
            </div>

            {/* Lecture metadata */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Lecture Title</label>
              <div className="mt-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1.5px solid ${PRIMARY}` }}>
                <span className="text-sm" style={{ color: TEXT }}>Options Fundamentals — Call & Put</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Duration</label>
                <div className="mt-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                  <span className="text-sm" style={{ color: TEXT2 }}>48 min</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Access</label>
                <div className="mt-2 px-3 py-2.5 rounded-xl flex items-center justify-between" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                  <span className="text-sm" style={{ color: TEXT2 }}>Enrolled</span>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Description</label>
              <div className="mt-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, minHeight: 60 }}>
                <span className="text-sm leading-relaxed" style={{ color: MUTED }}>Brief overview of what this lecture covers…</span>
              </div>
            </div>

            {/* Free preview toggle */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
              <div>
                <p className="text-sm font-medium" style={{ color: TEXT2 }}>Free Preview</p>
                <p className="text-[10px]" style={{ color: MUTED }}>Allow non-enrolled students to watch</p>
              </div>
              <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: BORDER2 }}>
                <div className="w-4 h-4 rounded-full absolute top-0.5 left-0.5" style={{ background: MUTED }} />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full py-3 rounded-2xl text-white font-bold text-sm" style={{ background: EMERALD }}>
                <CheckCircle className="w-4 h-4 inline mr-2" />Publish Lecture
              </button>
              <button className="w-full py-3 rounded-2xl text-sm font-semibold" style={{ background: SURFACE, color: TEXT2 }}>
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
