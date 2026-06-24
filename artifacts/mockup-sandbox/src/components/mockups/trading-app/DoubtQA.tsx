import {
  ChevronLeft, Search, ThumbsUp, MessageCircle, Send,
  ChevronDown, CheckCircle, Clock, Filter, TrendingUp,
  BookOpen, Calendar, BarChart2, Award, Mic, Image,
  MoreVertical, Pin, Star
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
const BORDER = "#E2E8F0";
const PURPLE = "#8B5CF6";

const doubts = [
  {
    id: 1, author: "Rahul S.", avatar: "RS", avatarColor: PRIMARY,
    time: "2h ago", lecture: "Lecture 6 — Options Chain",
    question: "In the Iron Condor strategy, how do we decide the strike price selection when IV is above 20? Dr. Anand showed a rule but I'm not fully clear on the distance from ATM.",
    upvotes: 14, replies: 3, answered: true, pinned: true,
    tags: ["Options", "IV", "Iron Condor"],
    topReply: {
      author: "Dr. Anand Kumar", avatar: "AK", avatarColor: EMERALD, isFaculty: true,
      text: "Great question Rahul! When IV > 20, increase your wing width by 1.5x the standard distance. For Nifty at 22,000, use ~300 pts on each side instead of 200. This gives a better risk-reward given the wider expected move.",
      time: "1h ago", upvotes: 22,
    },
  },
  {
    id: 2, author: "Priya M.", avatar: "PM", avatarColor: PURPLE,
    time: "5h ago", lecture: "Lecture 5 — RSI & MACD",
    question: "When RSI shows divergence but MACD hasn't crossed yet, should we enter early or wait for confirmation? I got stopped out twice waiting.",
    upvotes: 8, replies: 2, answered: false, pinned: false,
    tags: ["RSI", "MACD", "Entry"],
    topReply: null,
  },
  {
    id: 3, author: "Arjun K.", avatar: "AK2", avatarColor: AMBER,
    time: "Yesterday", lecture: "Lecture 4 — Support & Resistance",
    question: "Is there a rule for how many times a support level needs to be tested before it becomes significant? I see some charts where S/R is drawn after just 2 touches.",
    upvotes: 6, replies: 1, answered: true, pinned: false,
    tags: ["Support", "Resistance"],
    topReply: null,
  },
];

export function DoubtQA() {
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
            <p className="text-white font-semibold text-base">Doubts & Q&A</p>
            <p className="text-xs" style={{ color: "#64748B" }}>Advanced Trading Batch A</p>
          </div>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#64748B" }} />
          <span className="text-sm" style={{ color: "#475569" }}>Search doubts…</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {[
          { label: "All Doubts", count: 24, active: true },
          { label: "Unanswered", count: 6, active: false },
          { label: "My Doubts", count: 4, active: false },
        ].map((tab) => (
          <button key={tab.label} className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2"
            style={{ borderColor: tab.active ? PRIMARY : "transparent", color: tab.active ? PRIMARY : MUTED }}>
            {tab.label}
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: tab.active ? "rgba(37,99,235,0.12)" : "#F1F5F9", color: tab.active ? PRIMARY : MUTED }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lecture filter chip */}
      <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ background: BG }}>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY, border: "1px solid rgba(37,99,235,0.2)" }}>
          Lecture 6 — Options Chain <ChevronDown className="w-3 h-3" />
        </button>
        <button className="px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: CARD, color: MUTED, border: `1px solid ${BORDER}` }}>
          All Lectures
        </button>
      </div>

      {/* Doubts list */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3">
        {doubts.map((d) => (
          <div key={d.id} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${d.pinned ? "rgba(37,99,235,0.3)" : BORDER}` }}>
            {/* Pinned banner */}
            {d.pinned && (
              <div className="flex items-center gap-1.5 px-4 py-2" style={{ background: "rgba(37,99,235,0.07)" }}>
                <Pin className="w-3 h-3" style={{ color: PRIMARY }} />
                <span className="text-[10px] font-bold" style={{ color: PRIMARY }}>PINNED BY FACULTY</span>
              </div>
            )}

            <div className="p-4">
              {/* Author row */}
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: d.avatarColor }}>{d.avatar.replace("2","")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold" style={{ color: TEXT }}>{d.author}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{d.time}</p>
                    {d.answered && (
                      <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>
                        <CheckCircle className="w-2.5 h-2.5" /> Answered
                      </span>
                    )}
                  </div>
                  <p className="text-[10px]" style={{ color: PRIMARY }}>{d.lecture}</p>
                </div>
                <button style={{ color: MUTED }}><MoreVertical className="w-4 h-4" /></button>
              </div>

              {/* Question */}
              <p className="text-sm leading-relaxed mb-3" style={{ color: TEXT2 }}>{d.question}</p>

              {/* Tags */}
              <div className="flex gap-1.5 mb-3">
                {d.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "#F1F5F9", color: MUTED }}>{tag}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: MUTED }}>
                  <ThumbsUp className="w-3.5 h-3.5" /> {d.upvotes}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: MUTED }}>
                  <MessageCircle className="w-3.5 h-3.5" /> {d.replies} {d.replies === 1 ? "reply" : "replies"}
                </button>
              </div>

              {/* Faculty reply */}
              {d.topReply && (
                <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ background: d.topReply.avatarColor }}>{d.topReply.avatar}</div>
                    <p className="text-xs font-semibold" style={{ color: d.topReply.avatarColor }}>{d.topReply.author}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.15)", color: EMERALD }}>FACULTY</span>
                    <p className="text-[10px] ml-auto" style={{ color: MUTED }}>{d.topReply.time}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>{d.topReply.text}</p>
                  <button className="flex items-center gap-1 mt-2 text-[10px] font-medium" style={{ color: MUTED }}>
                    <ThumbsUp className="w-3 h-3" /> {d.topReply.upvotes} helpful
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Ask a doubt nudge */}
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "rgba(37,99,235,0.05)", border: "1.5px dashed rgba(37,99,235,0.25)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.1)" }}>
            <MessageCircle className="w-4.5 h-4.5" style={{ color: PRIMARY }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Have a doubt?</p>
            <p className="text-xs" style={{ color: MUTED }}>Faculty replies within 24 hours</p>
          </div>
          <button className="px-3 py-2 rounded-xl text-xs font-bold text-white" style={{ background: PRIMARY }}>Ask</button>
        </div>
      </div>

      {/* Compose bar */}
      <div className="flex-shrink-0 px-4 py-3" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5" style={{ background: BG, border: `1.5px solid ${PRIMARY}` }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: PRIMARY }}>RS</div>
          <span className="flex-1 text-sm" style={{ color: MUTED }}>Ask a doubt from this lecture…</span>
          <div className="flex items-center gap-1.5">
            <button style={{ color: MUTED }}><Image className="w-4 h-4" /></button>
            <button style={{ color: MUTED }}><Mic className="w-4 h-4" /></button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: PRIMARY }}>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses", active: true }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: item.active ? PRIMARY : MUTED }}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
