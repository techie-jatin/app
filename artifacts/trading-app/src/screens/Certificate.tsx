import {
  ChevronLeft, Award, Download, Share2, TrendingUp,
  BookOpen, Calendar, BarChart2, CheckCircle, Star,
  ExternalLink
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
const GOLD = "#D4AF37";
const AMBER = "#F59E0B";
const BORDER = "#E2E8F0";

const earned = [
  { title: "Advanced Trading Programme", date: "Jun 23, 2026", batch: "Advanced Trading A", score: 91, unlocked: true, id: "TC-CERT-2026-001" },
  { title: "Technical Analysis Foundation", date: "Mar 15, 2026", batch: "Fundamentals B", score: 88, unlocked: true, id: "TC-CERT-2026-002" },
];

const locked = [
  { title: "Options & Derivatives Expert", desc: "Complete Options Trading module with ≥ 80% quiz avg" },
  { title: "Live Trading Practitioner", desc: "Attend 20+ live sessions and submit all assignments" },
];

const stats = [
  { label: "Courses Completed", value: "2" },
  { label: "Avg Quiz Score", value: "88%" },
  { label: "Attendance", value: "91%" },
  { label: "Assignments", value: "4/4" },
];

export function Certificate() {
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
      <div className="flex items-center gap-3 px-4 pt-3 pb-5 flex-shrink-0" style={{ background: NAVY }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <p className="text-white font-semibold text-base">My Certificates</p>
          <p className="text-[11px]" style={{ color: "#64748B" }}>2 earned · 2 in progress</p>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-20">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-base font-black" style={{ color: PRIMARY }}>{s.value}</p>
              <p className="text-[9px] leading-tight mt-0.5" style={{ color: MUTED }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Earned certificates */}
        <div>
          <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: TEXT }}>
            <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} /> Earned Certificates
          </p>
          <div className="space-y-4">
            {earned.map((cert, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(212,175,55,0.12)", border: `1px solid rgba(212,175,55,0.2)` }}>
                {/* Certificate visual */}
                <div className="relative px-5 py-6 text-center"
                  style={{ background: `linear-gradient(160deg, ${NAVY}, #1E293B)` }}>
                  {/* Gold border accent top */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${GOLD}, ${AMBER}, ${GOLD})` }} />

                  {/* Logo */}
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>

                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: GOLD }}>Certificate of Completion</p>
                  <p className="text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>This certifies that</p>
                  <p className="text-lg font-extrabold text-white mb-1">Rahul Sharma</p>
                  <p className="text-[11px] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>has successfully completed</p>
                  <p className="text-base font-bold text-white leading-snug mb-4">{cert.title}</p>

                  {/* Divider with stars */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px" style={{ background: `rgba(212,175,55,0.2)` }} />
                    <div className="flex gap-1">
                      {[0,1,2].map(j => <Star key={j} className="w-3 h-3" style={{ color: GOLD }} fill={GOLD} />)}
                    </div>
                    <div className="flex-1 h-px" style={{ background: `rgba(212,175,55,0.2)` }} />
                  </div>

                  <div className="flex items-center justify-center gap-6 text-center">
                    <div>
                      <p className="text-base font-black" style={{ color: GOLD }}>{cert.score}%</p>
                      <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Overall Score</p>
                    </div>
                    <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <div>
                      <p className="text-[11px] font-semibold text-white">{cert.date}</p>
                      <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Date Issued</p>
                    </div>
                    <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <div>
                      <p className="text-[10px] font-mono font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{cert.id}</p>
                      <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Certificate ID</p>
                    </div>
                  </div>

                  {/* Bottom gold bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 p-3" style={{ background: CARD }}>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white"
                    style={{ background: PRIMARY }}>
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
                    style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT2 }}>
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button className="flex items-center justify-center px-3 py-2.5 rounded-xl"
                    style={{ background: BG, border: `1px solid ${BORDER}`, color: MUTED }}>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked certificates */}
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: TEXT }}>Unlock Next</p>
          <div className="space-y-3">
            {locked.map((cert, i) => (
              <div key={i} className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: CARD, border: `1px solid ${BORDER}`, opacity: 0.7 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#F1F5F9", border: `1px solid ${BORDER}` }}>
                  <Award className="w-5 h-5" style={{ color: MUTED }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: MUTED }}>{cert.title}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: MUTED }}>{cert.desc}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: "#F1F5F9", color: MUTED }}>LOCKED</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home", path: "/home" }, { icon: BookOpen, label: "Courses", path: "/course" }, { icon: Calendar, label: "Schedule", path: "/schedule" }, { icon: BarChart2, label: "Progress", path: "/progress" }, { icon: Award, label: "Profile", path: "/profile", active: true }].map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="flex flex-col items-center gap-1 px-3 py-1"
              style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
