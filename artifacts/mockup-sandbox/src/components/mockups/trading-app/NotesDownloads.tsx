import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2, Award,
  FileText, Download, Eye, Search, Filter, Lock, CheckCircle, File
} from "lucide-react";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const PURPLE = "#8B5CF6";
const BORDER = "#E2E8F0";

const categories = ["All", "PDF", "PPT", "DOCX"];

const notes = [
  {
    title: "Module 1 — Market Structure Notes",
    module: "Module 1", type: "PDF", size: "2.4 MB", pages: 18,
    updated: "Jun 10", downloaded: false, color: RED,
  },
  {
    title: "Technical Analysis — Complete Guide",
    module: "Module 2", type: "PDF", size: "5.1 MB", pages: 42,
    updated: "Jun 14", downloaded: true, color: RED,
  },
  {
    title: "Support & Resistance — Slides",
    module: "Module 2", type: "PPT", size: "3.8 MB", pages: 24,
    updated: "Jun 16", downloaded: true, color: AMBER,
  },
  {
    title: "Volume Profile Trading — Reference",
    module: "Module 3", type: "PDF", size: "4.2 MB", pages: 31,
    updated: "Jun 18", downloaded: false, color: RED,
  },
  {
    title: "Options Chain Analysis Notes",
    module: "Module 3", type: "DOCX", size: "1.1 MB", pages: 12,
    updated: "Jun 20", downloaded: false, color: PRIMARY,
  },
  {
    title: "Risk Management Framework — Slides",
    module: "Module 4", type: "PPT", size: "2.9 MB", pages: 19,
    updated: "Jun 22", downloaded: false, color: AMBER,
  },
  {
    title: "Derivatives & F&O Basics",
    module: "Module 5", type: "PDF", size: "6.3 MB", pages: 54,
    updated: "—", downloaded: false, color: RED, locked: true,
  },
];

const typeColors: Record<string, string> = { PDF: RED, PPT: AMBER, DOCX: PRIMARY };
const typeIcons: Record<string, any> = { PDF: FileText, PPT: File, DOCX: FileText };

export function NotesDownloads() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 mb-3">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <p className="text-white font-semibold text-base">Notes & Downloads</p>
            <p className="text-[11px]" style={{ color: "#64748B" }}>Advanced Trading Batch A</p>
          </div>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          {[
            { label: "Total Files", value: "6", color: "#93C5FD" },
            { label: "Downloaded", value: "2", color: EMERALD },
            { label: "Locked", value: "1", color: AMBER },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px]" style={{ color: "#475569" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {categories.map((c, i) => (
          <button key={c} className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={i === 0 ? { background: PRIMARY, color: "#fff" } : { background: BG, color: MUTED, border: `1px solid ${BORDER}` }}>
            {c}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg" style={{ background: BG, border: `1px solid ${BORDER}`, color: MUTED }}>
          <Filter className="w-3 h-3" /><span className="text-xs">Filter</span>
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 pb-20">
        {notes.map((n, i) => {
          const Icon = typeIcons[n.type] || FileText;
          return (
            <div key={i} className="rounded-2xl p-4"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                opacity: n.locked ? 0.6 : 1,
              }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${typeColors[n.type]}12` }}>
                  {n.locked
                    ? <Lock className="w-5 h-5" style={{ color: MUTED }} />
                    : <Icon className="w-5 h-5" style={{ color: typeColors[n.type] }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight" style={{ color: n.locked ? MUTED : TEXT }}>{n.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: `${typeColors[n.type]}12`, color: typeColors[n.type] }}>{n.type}</span>
                    <span className="text-[10px]" style={{ color: MUTED }}>{n.module}</span>
                    <span className="text-[10px]" style={{ color: MUTED }}>{n.pages} pages</span>
                    <span className="text-[10px]" style={{ color: MUTED }}>{n.size}</span>
                  </div>
                  <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Updated: {n.updated}</p>
                </div>
              </div>

              {!n.locked && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT2 }}>
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white"
                    style={{ background: n.downloaded ? "rgba(16,185,129,0.12)" : PRIMARY }}>
                    {n.downloaded
                      ? <><CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} /><span style={{ color: EMERALD }}>Downloaded</span></>
                      : <><Download className="w-3.5 h-3.5" /> Download</>}
                  </button>
                </div>
              )}

              {n.locked && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: BG }}>
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: AMBER }} />
                  <p className="text-[10px]" style={{ color: MUTED }}>Module 5 not yet unlocked — complete Module 4 first</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses", active: true }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: (item as any).active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
