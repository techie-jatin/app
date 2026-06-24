import {
  ChevronLeft, TrendingUp, BookOpen, Calendar, BarChart2, Award,
  Download, Share2, ZoomIn, ZoomOut, ChevronRight, RotateCw, Search, Bookmark
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
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const pageContent = [
  {
    heading: "What is Volume Profile?",
    body: "Volume Profile is an advanced charting study that displays trading activity over a specified time period at specified price levels. Unlike standard volume bars which show volume per time, Volume Profile shows volume per price level.",
    items: [],
  },
  {
    heading: "Key Components",
    body: "",
    items: [
      { term: "POC (Point of Control)", desc: "The price level with the highest traded volume — acts as a strong magnet for price." },
      { term: "VAH (Value Area High)", desc: "The upper boundary of the Value Area — price where 70% of trading occurred." },
      { term: "VAL (Value Area Low)", desc: "The lower boundary of the Value Area — acts as key support." },
      { term: "HVN (High Volume Node)", desc: "Price levels with high traded volume — act as support/resistance." },
      { term: "LVN (Low Volume Node)", desc: "Price levels with low traded volume — price tends to move quickly through these." },
    ],
  },
  {
    heading: "How to Use Volume Profile",
    body: "Volume Profile helps traders identify key support and resistance zones with high precision. When price approaches a POC or VAH/VAL, it often reacts strongly because these levels represent areas of previous high market participation.",
    items: [],
  },
];

export function NotesPdfViewer() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: "#1A1A2E", color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* PDF viewer topbar */}
      <div className="flex items-center justify-between px-3 py-2.5 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-white text-xs font-semibold">Volume Profile Trading</p>
          <p className="text-[10px]" style={{ color: "#64748B" }}>Page 4 of 31</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Search className="w-3.5 h-3.5 text-white" />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Share2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* PDF Controls */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0" style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ZoomOut className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
          </button>
          <span className="text-[11px] font-bold" style={{ color: "#CBD5E1" }}>100%</span>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ZoomIn className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Bookmark className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <RotateCw className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
          </button>
        </div>
      </div>

      {/* PDF Page View */}
      <div className="flex-1 overflow-y-auto" style={{ background: "#2D2D2D" }}>
        {/* Simulated PDF page */}
        <div className="mx-3 my-3 rounded-lg overflow-hidden shadow-2xl" style={{ background: CARD }}>
          {/* Page header */}
          <div className="px-6 pt-5 pb-2 flex items-center justify-between" style={{ borderBottom: `2px solid ${PRIMARY}` }}>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: PRIMARY }}>TradeCoach Academy</p>
              <p className="text-xs font-semibold" style={{ color: TEXT }}>Volume Profile Trading — Advanced Concepts</p>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.1)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: PRIMARY }} />
            </div>
          </div>

          {/* Page content */}
          <div className="px-6 pt-4 pb-6 space-y-4">
            {pageContent.map((section, i) => (
              <div key={i}>
                <p className="text-sm font-bold mb-2" style={{ color: TEXT }}>{section.heading}</p>
                {section.body && (
                  <p className="text-[11px] leading-relaxed" style={{ color: TEXT2 }}>{section.body}</p>
                )}
                {section.items.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: PRIMARY }} />
                        <div>
                          <span className="text-[11px] font-bold" style={{ color: PRIMARY }}>{item.term} — </span>
                          <span className="text-[11px]" style={{ color: TEXT2 }}>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Diagram placeholder */}
            <div className="rounded-xl p-4 text-center" style={{ background: "rgba(37,99,235,0.04)", border: `1px dashed rgba(37,99,235,0.2)` }}>
              <div className="flex items-center justify-center gap-4 mb-2">
                {/* Simple volume profile bar chart simulation */}
                {[40, 65, 90, 100, 80, 55, 35, 20].map((h, i) => (
                  <div key={i} className="flex-1" style={{ height: "60px", display: "flex", alignItems: "flex-end" }}>
                    <div className="w-full rounded-t-sm" style={{
                      height: `${h}%`,
                      background: i === 3 ? PRIMARY : i === 2 || i === 4 ? `rgba(37,99,235,0.5)` : "rgba(37,99,235,0.2)"
                    }} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-1">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ background: PRIMARY }} /><span className="text-[9px]" style={{ color: MUTED }}>POC</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ background: "rgba(37,99,235,0.5)" }} /><span className="text-[9px]" style={{ color: MUTED }}>Value Area</span></div>
              </div>
              <p className="text-[9px] mt-1" style={{ color: MUTED }}>Fig 1. Volume Profile showing POC and Value Area</p>
            </div>
          </div>

          {/* Page footer */}
          <div className="px-6 py-2 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-[9px]" style={{ color: MUTED }}>© TradeCoach Academy · Confidential</p>
            <p className="text-[9px]" style={{ color: MUTED }}>Page 4</p>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between" style={{ background: "#111827", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-4 h-4" /><span className="text-xs font-medium">Prev</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(p => (
              <div key={p} className="w-1.5 h-1.5 rounded-full" style={{ background: p === 4 ? PRIMARY : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: "#64748B" }}>4 of 31</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white" style={{ background: PRIMARY }}>
          <span className="text-xs font-medium">Next</span><ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Download bar */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2 flex gap-2" style={{ background: "#111827" }}>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-white" style={{ background: PRIMARY }}>
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button className="px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.08)", color: "#CBD5E1" }}>
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
