import {
  ChevronLeft, Upload, FileText, Image, Clock, CheckCircle,
  AlertCircle, TrendingUp, BookOpen, Calendar, BarChart2,
  Award, ChevronRight, Download, Star, MessageSquare, Paperclip, X
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
const RED = "#EF4444";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const criteria = [
  { label: "Chart Analysis Quality", weight: "40%" },
  { label: "Entry / Exit Identification", weight: "30%" },
  { label: "Risk:Reward Calculation", weight: "20%" },
  { label: "Write-up Clarity", weight: "10%" },
];

const previousSubmissions = [
  { title: "Assignment 1 — Market Structure", submitted: "Feb 5, 2026", grade: 88, feedback: "Excellent chart reading. Improve entry precision.", status: "graded" },
];

export function AssignmentSubmission() {
  const [, navigate] = useLocation();
  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']"
      style={{ background: BG, color: TEXT }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: NAVY }}>
        <span className="text-[11px] text-white opacity-50">9:41</span>
        <div className="w-4 h-2 border border-white/30 rounded-[2px] relative">
          <div className="absolute inset-[2px] left-[2px] bg-white/60 rounded-[1px] w-2/3" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-4 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Assignment 2</p>
          <p className="text-[11px]" style={{ color: "#64748B" }}>Advanced Trading A · Due Jun 28</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(245,158,11,0.15)" }}>
          <Clock className="w-3.5 h-3.5" style={{ color: AMBER }} />
          <span className="text-xs font-bold" style={{ color: AMBER }}>5d left</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">

        {/* Assignment brief */}
        <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: "rgba(37,99,235,0.06)", borderBottom: `1px solid ${BORDER}` }}>
            <FileText className="w-4 h-4" style={{ color: PRIMARY }} />
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Chart Reading Exercise</p>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
              Analyse the <span className="font-semibold" style={{ color: TEXT }}>Nifty 50 daily chart</span> for the month of May 2026. Identify:
            </p>
            <ul className="space-y-1.5">
              {["Key support & resistance levels", "At least 2 valid entry setups with R:R ≥ 1:2", "Stop-loss placement with reasoning", "A brief 150-word write-up"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TEXT2 }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grading criteria */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Grading Criteria</p>
          <div className="space-y-2">
            {criteria.map((c) => (
              <div key={c.label} className="flex items-center justify-between">
                <p className="text-xs" style={{ color: TEXT2 }}>{c.label}</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(37,99,235,0.08)", color: PRIMARY }}>{c.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload zone */}
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Your Submission</p>

          {/* Main upload */}
          <div className="rounded-2xl p-5 flex flex-col items-center text-center mb-3"
            style={{ background: "rgba(37,99,235,0.04)", border: `2px dashed rgba(37,99,235,0.25)` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "rgba(37,99,235,0.1)" }}>
              <Upload className="w-6 h-6" style={{ color: PRIMARY }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Upload Chart Screenshot</p>
            <p className="text-xs mt-1" style={{ color: MUTED }}>PNG, JPG, PDF · Max 10 MB</p>
            <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: PRIMARY }}>
              Choose File
            </button>
          </div>

          {/* Attached file */}
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(16,185,129,0.1)" }}>
              <Image className="w-5 h-5" style={{ color: EMERALD }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>nifty_may_chart_analysis.png</p>
              <p className="text-xs" style={{ color: MUTED }}>2.4 MB · Added just now</p>
            </div>
            <button style={{ color: MUTED }}><X className="w-4 h-4" /></button>
          </div>

          {/* Write-up box */}
          <div className="mt-3 rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: TEXT2 }}>
              <MessageSquare className="w-3.5 h-3.5" /> WRITE-UP (150+ words)
            </p>
            <div className="min-h-[80px] text-sm leading-relaxed" style={{ color: TEXT2 }}>
              The Nifty 50 chart shows a clear consolidation zone between 22,400–22,800 acting as strong support. I identified two setups: a breakout retest at 22,800 with a target of 23,400 (R:R 1:2.5) and a reversal bounce at the 22,400 support zone…
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px]" style={{ color: MUTED }}>168 / 150 words min</span>
              <span className="text-[10px] flex items-center gap-1" style={{ color: EMERALD }}>
                <CheckCircle className="w-3 h-3" /> Minimum met
              </span>
            </div>
          </div>
        </div>

        {/* Previous submission */}
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Previous Submissions</p>
          {previousSubmissions.map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>Submitted {s.submitted}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black" style={{ color: s.grade >= 80 ? EMERALD : AMBER }}>{s.grade}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>/ 100</p>
                </div>
              </div>
              <div className="rounded-xl px-3 py-2.5 flex items-start gap-2"
                style={{ background: "rgba(16,185,129,0.06)", border: `1px solid rgba(16,185,129,0.15)` }}>
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
                  <span className="font-semibold" style={{ color: EMERALD }}>Faculty feedback:</span> {s.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <div className="flex-shrink-0 px-4 py-4" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <button className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
          style={{ background: PRIMARY }}>
          <Upload className="w-4 h-4" /> Submit Assignment
        </button>
        <p className="text-center text-[11px] mt-2" style={{ color: MUTED }}>
          You can resubmit until the deadline · Jun 28, 2026
        </p>
      </div>
    </div>
  );
}
