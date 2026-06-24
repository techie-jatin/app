
import { AlertCircle, Award, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Clock, Download, Eye, FileText, Filter, GraduationCap, Layers, Menu, MessageSquare, MoreVertical, Paperclip, Search, Send, Settings, Star, TrendingUp, Users, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

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
  { icon: BarChart2, label: "Dashboard", path: "/admin/dashboard" }, { icon: Users, label: "Students", path: "/admin/students" },
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", active: true, path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: "Pending Review", color: AMBER, bg: "rgba(245,158,11,0.1)", icon: Clock },
  reviewed: { label: "Reviewed", color: EMERALD, bg: "rgba(16,185,129,0.1)", icon: CheckCircle },
  rejected: { label: "Needs Revision", color: RED, bg: "rgba(239,68,68,0.1)", icon: AlertCircle },
  late: { label: "Late Submission", color: PURPLE, bg: "rgba(139,92,246,0.1)", icon: Clock },
};

const submissions = [
  { id: 1, student: "Rahul Sharma", avatar: "RS", color: PRIMARY, assignment: "Iron Condor Trade Journal – Week 2", batch: "Batch A", submitted: "Jun 22, 10:14 AM", status: "pending", fileType: "PDF", pages: 6, grade: null, selected: true },
  { id: 2, student: "Priya Mehta", avatar: "PM", color: PURPLE, assignment: "Iron Condor Trade Journal – Week 2", batch: "Batch A", submitted: "Jun 22, 11:30 AM", status: "reviewed", fileType: "PDF", pages: 8, grade: 87, selected: false },
  { id: 3, student: "Arjun Kapoor", avatar: "AK", color: AMBER, assignment: "Iron Condor Trade Journal – Week 2", batch: "Batch A", submitted: "Jun 21, 9:45 PM", status: "late", fileType: "DOCX", pages: 5, grade: null, selected: false },
  { id: 4, student: "Sneha Joshi", avatar: "SJ", color: "#EC4899", assignment: "Iron Condor Trade Journal – Week 2", batch: "Batch A", submitted: "Jun 23, 2:00 PM", status: "rejected", fileType: "PDF", pages: 4, grade: null, selected: false },
  { id: 5, student: "Mohit Singh", avatar: "MS", color: RED, assignment: "Iron Condor Trade Journal – Week 2", batch: "Batch A", submitted: "Jun 22, 6:30 PM", status: "pending", fileType: "PDF", pages: 7, grade: null, selected: false },
];

const rubric = [
  { criterion: "Trade Setup Documentation", maxMarks: 25, awarded: null },
  { criterion: "Entry & Exit Justification", maxMarks: 25, awarded: null },
  { criterion: "Risk Management Analysis", maxMarks: 20, awarded: null },
  { criterion: "Reflection & Learning", maxMarks: 20, awarded: null },
  { criterion: "Presentation & Clarity", maxMarks: 10, awarded: null },
];

export function AdminAssignmentReview() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins'] w-full" style={{ background: BG, color: TEXT }}>
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
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
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-72 flex flex-col h-full" style={{ background: "#111827", borderRight: "1px solid #1F2937" }}>
            <div className="px-5 py-4 flex items-center justify-between">
              <p className="font-bold text-white">TradeCoach</p>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
              {navItems && navItems.map((item) => (
                <button key={item.label} onClick={() => { item.path && navigate(item.path); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: "#94A3B8" }}>
                  {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-3.5 flex items-center gap-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <button className="md:hidden p-2 rounded-lg mr-2" style={{ background: "rgba(255,255,255,0.05)" }} onClick={() => setMobileOpen(v => !v)}><Menu className="w-5 h-5" style={{ color: "#94A3B8" }} /></button>
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: TEXT }}>Assignment Review</p>
            <p className="text-xs" style={{ color: MUTED }}>Iron Condor Trade Journal – Week 2 · Advanced Batch A</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Stats chips */}
            {[
              { label: "Total", val: "45", color: TEXT2 },
              { label: "Pending", val: "18", color: AMBER },
              { label: "Reviewed", val: "22", color: EMERALD },
              { label: "Late", val: "5", color: PURPLE },
            ].map((s) => (
              <div key={s.label} className="px-3 py-1.5 rounded-xl text-center" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <p className="text-xs font-black" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9px]" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </header>

        {/* Body — 2 col */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: submission list */}
          <div className="w-96 flex flex-col flex-shrink-0" style={{ background: "#0D1526", borderRight: `1px solid ${BORDER}` }}>
            {/* Filter bar */}
            <div className="p-3 space-y-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                <Search className="w-3.5 h-3.5" style={{ color: MUTED }} />
                <span className="text-xs" style={{ color: MUTED }}>Search student…</span>
              </div>
              <div className="flex gap-2">
                {["All", "Pending", "Reviewed", "Late"].map((f, i) => (
                  <button key={f} className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold"
                    style={i === 0 ? { background: PRIMARY, color: "#fff" } : { background: SURFACE, color: MUTED }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {submissions.map((sub) => {
                const sc = statusConfig[sub.status];
                return (
                  <div key={sub.id} className="rounded-xl p-3 cursor-pointer"
                    style={{ background: sub.selected ? "rgba(37,99,235,0.1)" : CARD, border: `1.5px solid ${sub.selected ? PRIMARY : BORDER2}` }}>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: sub.color }}>{sub.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold truncate" style={{ color: TEXT }}>{sub.student}</p>
                          <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: sc.bg, color: sc.color }}>
                            <sc.icon className="w-2.5 h-2.5" /> {sc.label}
                          </span>
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{sub.submitted}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded" style={{ background: SURFACE, color: TEXT2 }}>
                            <Paperclip className="w-2.5 h-2.5" /> {sub.fileType} · {sub.pages}p
                          </span>
                          {sub.grade !== null && (
                            <span className="text-[9px] font-bold" style={{ color: EMERALD }}>{sub.grade}/100</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: review panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Preview toolbar */}
            <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: PRIMARY }}>RS</div>
                <div>
                  <p className="text-sm font-bold" style={{ color: TEXT }}>Rahul Sharma</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>Submitted Jun 22, 10:14 AM · PDF · 6 pages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: RED, color: "#fff" }}>
                  <X className="w-3.5 h-3.5" /> Needs Revision
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex gap-0">
              {/* Document preview mock */}
              <div className="flex-1 p-5" style={{ background: "#0D1526" }}>
                <div className="max-w-xl mx-auto rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                  {/* PDF-like header */}
                  <div className="px-6 py-4 flex items-center justify-between" style={{ background: SURFACE, borderBottom: `1px solid ${BORDER2}` }}>
                    <div>
                      <p className="text-sm font-bold" style={{ color: TEXT }}>Iron Condor Trade Journal</p>
                      <p className="text-xs" style={{ color: MUTED }}>Week 2 · Rahul Sharma · Advanced Batch A</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate("/admin/dashboard")} style={{ cursor: "pointer" }}><ChevronLeft className="w-4 h-4" style={{ color: MUTED }} /></button>
                      <span className="text-xs" style={{ color: MUTED }}>1 / 6</span>
                      <button className="w-7 h-7 rounded flex items-center justify-center" style={{ background: BORDER2 }}><ChevronRight className="w-4 h-4" style={{ color: MUTED }} /></button>
                    </div>
                  </div>
                  {/* Content lines */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm font-bold" style={{ color: TEXT }}>Week 2 — Trade Setup Documentation</p>
                    <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
                      Instrument: NIFTY 50 (Spot: 22,347). Strategy: Iron Condor. Expiry: 26-Jun-2025 (weekly). 
                      Market Condition: Rangebound — VIX at 13.4, below 30-day avg of 15.2. IV Rank: 28%.
                    </p>
                    {/* Trade table */}
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER2}` }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 px-3 py-2" style={{ background: SURFACE }}>
                        {["Leg", "Strike", "Action", "Premium"].map(h => (
                          <span key={h} className="text-[9px] font-bold uppercase" style={{ color: MUTED }}>{h}</span>
                        ))}
                      </div>
                      {[
                        ["CE Short", "22,500", "SELL", "₹72"],
                        ["CE Long", "22,700", "BUY", "₹28"],
                        ["PE Short", "22,100", "SELL", "₹65"],
                        ["PE Long", "21,900", "BUY", "₹22"],
                      ].map((row, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 px-3 py-2" style={{ borderTop: `1px solid ${BORDER2}` }}>
                          {row.map((cell, j) => (
                            <span key={j} className="text-xs" style={{ color: j === 1 ? TEXT : j === 2 ? (cell === "SELL" ? RED : EMERALD) : TEXT2 }}>{cell}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
                      Net premium collected: ₹87 × 50 = ₹4,350. Max profit zone: 22,100–22,500. 
                      Break-evens: 22,013 on downside and 22,587 on upside.
                    </p>
                    {/* Highlight annotation */}
                    <div className="rounded-xl px-4 py-3 flex gap-2" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
                      <p className="text-xs" style={{ color: TEXT2 }}><span className="font-semibold" style={{ color: AMBER }}>Faculty note:</span> Good strike selection. Explain why you chose weekly expiry over monthly here.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grading sidebar */}
              <div className="w-72 flex flex-col flex-shrink-0 overflow-y-auto" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
                <div className="px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-bold" style={{ color: TEXT }}>Grade & Feedback</p>
                </div>

                <div className="p-4 space-y-4 flex-1">
                  {/* Rubric */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Rubric</p>
                    <div className="space-y-2">
                      {rubric.map((r) => (
                        <div key={r.criterion} className="rounded-xl p-3" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-medium leading-tight" style={{ color: TEXT2 }}>{r.criterion}</p>
                            <span className="text-[10px]" style={{ color: MUTED }}>/ {r.maxMarks}</span>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <button key={i} className="flex-1 h-6 rounded flex items-center justify-center text-[9px] font-bold"
                                style={{ background: i < 3 ? "rgba(37,99,235,0.15)" : BORDER2, color: i < 3 ? PRIMARY : MUTED }}>
                                {Math.round((i + 1) * r.maxMarks / 5)}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total score */}
                  <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: "rgba(37,99,235,0.08)", border: `1px solid rgba(37,99,235,0.2)` }}>
                    <p className="text-sm font-bold" style={{ color: TEXT }}>Total Score</p>
                    <p className="text-2xl font-black" style={{ color: PRIMARY }}>—<span className="text-sm">/100</span></p>
                  </div>

                  {/* Feedback textarea */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Written Feedback</p>
                    <div className="rounded-xl p-3 min-h-[90px]" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <p className="text-xs italic" style={{ color: MUTED }}>Add feedback for the student…</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
                      <Send className="w-3 h-3" /> Save Draft
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: EMERALD }}>
                      <CheckCircle className="w-3 h-3" /> Submit Grade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
