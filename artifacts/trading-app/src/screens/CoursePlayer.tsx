import {
  ChevronLeft, PlayCircle, CheckCircle, Lock, Clock,
  FileText, HelpCircle, ClipboardList, BookOpen,
  TrendingUp, BarChart2, Award, Calendar, Share2, Download
} from "lucide-react";
import { useLocation } from "wouter";

const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const NAVY = "#0F172A";
const TEXT = "#0F172A";
const TEXT2 = "#475569";
const MUTED = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#DC2626";
const BORDER = "#E2E8F0";

const lectures = [
  { num: 1, title: "Market Structure Overview", duration: "1h 24m", done: true },
  { num: 2, title: "Candlestick Patterns", duration: "58m", done: true },
  { num: 3, title: "Support & Resistance", duration: "1h 10m", active: true },
  { num: 4, title: "Volume Profile Trading", duration: "1h 35m", done: false },
  { num: 5, title: "Options Chain Analysis", duration: "1h 20m", done: false },
  { num: 6, title: "Advanced Derivatives", duration: "1h 40m", locked: true },
];

const tabs = ["Overview", "Notes", "Quiz", "Assignment"];

export function CoursePlayer() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar + Video — navy bg */}
      <div style={{ background: NAVY }}>
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[11px] font-medium text-white opacity-60">9:41</span>
          <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
            <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
          </div>
        </div>

        {/* Video */}
        <div className="relative" style={{ aspectRatio: "16/9", width: "100%" }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#0a0f1a" }}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 shadow-2xl" style={{ background: RED }}>
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs" style={{ color: MUTED }}>YouTube · Unlisted</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
            <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full rounded-full" style={{ width: "38%", background: RED }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-[10px]">32:14</span>
              <div className="flex items-center gap-3">
                <Share2 className="w-3.5 h-3.5 text-white/70" />
                <Download className="w-3.5 h-3.5 text-white/70" />
                <span className="text-white/70 text-[10px]">1:24:00</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: BG }}>
        {/* Title */}
        <div className="px-5 py-4 bg-white" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs mb-1" style={{ color: MUTED }}>Lecture 3 · Advanced Trading A</p>
              <h2 className="font-bold text-base leading-snug" style={{ color: TEXT }}>Support & Resistance Levels</h2>
            </div>
            <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>IN PROGRESS</span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: MUTED }}><Clock className="w-3.5 h-3.5" /> 1h 10m</span>
            <span className="text-xs" style={{ color: MUTED }}>Dr. Anand Kumar</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-medium" style={{ color: EMERALD }}>
              <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                <div className="h-full rounded-full" style={{ width: "38%", background: EMERALD }} />
              </div>
              38%
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white" style={{ borderBottom: `1px solid ${BORDER}` }}>
          {tabs.map((tab, i) => (
            <button key={tab} className="flex-1 py-3 text-xs font-semibold transition-colors"
              style={i === 0 ? { color: PRIMARY, borderBottom: `2px solid ${PRIMARY}` } : { color: MUTED }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Lecture list */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Course Lectures</p>
          <div className="space-y-2">
            {lectures.map((l) => (
              <div key={l.num} className="flex items-center gap-3 rounded-xl px-3 py-3"
                style={{ background: l.active ? "rgba(37,99,235,0.06)" : CARD, border: `1px solid ${l.active ? "rgba(37,99,235,0.2)" : BORDER}`, opacity: l.locked ? 0.5 : 1 }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={l.done ? { background: "rgba(16,185,129,0.1)", color: EMERALD } : l.active ? { background: "rgba(37,99,235,0.1)", color: PRIMARY } : { background: "#F1F5F9", color: MUTED }}>
                  {l.locked ? <Lock className="w-3.5 h-3.5" /> : l.done ? <CheckCircle className="w-4 h-4" /> : l.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: l.active ? PRIMARY : TEXT }}>{l.title}</p>
                  <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: MUTED }}><Clock className="w-2.5 h-2.5" /> {l.duration}</p>
                </div>
                {l.active && <PlayCircle className="w-5 h-5 flex-shrink-0" style={{ color: PRIMARY }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="px-4 pt-2 pb-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Resources</p>
          <div className="space-y-2">
            {[
              { icon: FileText, label: "Lecture 3 Notes — PDF", size: "1.8 MB", color: { background: "rgba(245,158,11,0.1)", color: "#F59E0B" } },
              { icon: HelpCircle, label: "Quiz 3 — Support & Resistance", size: "15 questions", color: { background: "rgba(16,185,129,0.1)", color: EMERALD } },
              { icon: ClipboardList, label: "Assignment 1 — Chart Reading", size: "Due: Jun 28", color: { background: "rgba(139,92,246,0.1)", color: "#8B5CF6" } },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={r.color}>
                  <r.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: TEXT }}>{r.label}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{r.size}</p>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 flex-shrink-0" style={{ color: MUTED }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", path: "/home" }, { icon: BookOpen, label: "Courses", path: "/course", active: true }, { icon: Calendar, label: "Schedule", path: "/schedule" }, { icon: BarChart2, label: "Progress", path: "/progress" }, { icon: Award, label: "Profile", path: "/profile" }].map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
