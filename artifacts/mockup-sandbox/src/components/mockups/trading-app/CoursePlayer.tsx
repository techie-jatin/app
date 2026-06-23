import {
  ChevronLeft, PlayCircle, CheckCircle, Lock, Clock,
  FileText, HelpCircle, ClipboardList, BookOpen,
  ThumbsUp, MessageSquare, ChevronDown, TrendingUp,
  BarChart2, Award, Calendar, Share2, Download
} from "lucide-react";

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
  return (
    <div className="w-[390px] h-[844px] bg-slate-950 font-['Inter'] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0 bg-black">
        <span className="text-slate-400 text-[11px] font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 border border-slate-500 rounded-[2px] relative"><div className="absolute inset-0.5 left-0.5 bg-slate-400 rounded-[1px] w-2/3" /></div>
        </div>
      </div>

      {/* Video player area */}
      <div className="bg-black flex-shrink-0 relative" style={{ aspectRatio: "16/9", width: "100%" }}>
        {/* Fake YouTube thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-2xl">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-400 text-xs">YouTube · Unlisted</p>
          </div>
        </div>
        {/* Scrubber bar */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-4 bg-gradient-to-t from-black/80">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-red-500 rounded-full" style={{ width: "38%" }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-[10px]">32:14</span>
            <div className="flex items-center gap-3">
              <Share2 className="w-3.5 h-3.5 text-slate-300" />
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-300 text-[10px]">1:24:00</span>
            </div>
          </div>
        </div>
        {/* Back button */}
        <button className="absolute top-2 left-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Title */}
        <div className="px-5 py-4 border-b border-slate-800">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-slate-500 text-xs mb-1">Lecture 3 · Advanced Trading A</p>
              <h2 className="text-white font-bold text-base leading-snug">Support & Resistance Levels</h2>
            </div>
            <div className="flex-shrink-0 bg-amber-500/15 text-amber-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl">IN PROGRESS</div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock className="w-3.5 h-3.5" /> 1h 10m
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <ThumbsUp className="w-3.5 h-3.5" /> Dr. Anand Kumar
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[38%]" />
              </div>
              38%
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 flex-shrink-0">
          {tabs.map((tab, i) => (
            <button key={tab} className={`flex-1 py-3 text-xs font-medium transition-colors ${
              i === 0
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-slate-500 hover:text-slate-300"
            }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Lecture list */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Course Lectures</p>
          <div className="space-y-2">
            {lectures.map((l) => (
              <div
                key={l.num}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 border transition-colors ${
                  l.active
                    ? "bg-amber-500/10 border-amber-500/30"
                    : l.locked
                    ? "bg-slate-900/50 border-slate-800/50 opacity-50"
                    : "bg-slate-900 border-slate-800/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  l.done ? "bg-emerald-500/20 text-emerald-400" :
                  l.active ? "bg-amber-500/20 text-amber-400" :
                  "bg-slate-800 text-slate-500"
                }`}>
                  {l.locked ? <Lock className="w-3.5 h-3.5" /> :
                   l.done ? <CheckCircle className="w-4 h-4" /> : l.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${l.active ? "text-amber-300" : l.locked ? "text-slate-600" : "text-slate-300"}`}>
                    {l.title}
                  </p>
                  <p className="text-slate-600 text-xs flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" /> {l.duration}
                  </p>
                </div>
                {l.active && <PlayCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="px-4 pt-2 pb-6">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Resources</p>
          <div className="space-y-2">
            {[
              { icon: FileText, label: "Lecture 3 Notes — PDF", size: "1.8 MB", color: "text-amber-400 bg-amber-500/10" },
              { icon: HelpCircle, label: "Quiz 3 — Support & Resistance", size: "15 questions", color: "text-emerald-400 bg-emerald-500/10" },
              { icon: ClipboardList, label: "Assignment 1 — Chart Reading", size: "Due: Jun 28", color: "text-violet-400 bg-violet-500/10" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.color}`}>
                  <r.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm truncate">{r.label}</p>
                  <p className="text-slate-600 text-xs">{r.size}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600 rotate-[-90deg] flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 px-2 pb-4 pt-2">
        <div className="flex items-center justify-around">
          {[
            { icon: TrendingUp, label: "Home" },
            { icon: BookOpen, label: "Courses", active: true },
            { icon: Calendar, label: "Schedule" },
            { icon: BarChart2, label: "Progress" },
            { icon: Award, label: "Profile" },
          ].map((item) => (
            <button key={item.label} className={`flex flex-col items-center gap-1 px-3 py-1 ${item.active ? "text-amber-400" : "text-slate-600"}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
