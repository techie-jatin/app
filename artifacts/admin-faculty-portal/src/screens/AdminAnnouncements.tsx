
import { AlertCircle, Award, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronDown, Clock, Edit2, Eye, Filter, GraduationCap, Info, Layers, Megaphone, Menu, Plus, Send, Settings, Trash2, TrendingUp, Users, X, Zap } from "lucide-react";
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
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", active: true, path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const sentAnnouncements = [
  { id: 1, title: "Live Class Rescheduled — Jun 25", body: "The Jun 24 session has been rescheduled to Jun 25 at 7:00 PM due to faculty availability.", target: "All Batches", targetColor: PRIMARY, sent: "Jun 22, 10:30 AM", reach: 248, read: 196, type: "info" },
  { id: 2, title: "Quiz 4 Now Live — Attempt Today", body: "Risk Management & Position Sizing quiz is now available. Deadline: Jun 28, 11:59 PM.", target: "Adv. Trading A", targetColor: PURPLE, sent: "Jun 21, 9:00 AM", reach: 42, read: 38, type: "quiz" },
  { id: 3, title: "Assignment 2 Feedback Published", body: "Grades and faculty feedback for Assignment 2 are now visible in your portal.", target: "Adv. Trading A", targetColor: PURPLE, sent: "Jun 20, 5:00 PM", reach: 42, read: 42, type: "success" },
  { id: 4, title: "Reminder: Assignment 3 Due Jun 28", body: "Submit your Chart Analysis Exercise before the deadline to avoid a late penalty.", target: "Fundamentals B", targetColor: "#3B82F6", sent: "Jun 19, 8:00 AM", reach: 38, read: 30, type: "warning" },
];

const typeIcon: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  info: { icon: Info, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  quiz: { icon: Zap, color: EMERALD, bg: "rgba(16,185,129,0.12)" },
  success: { icon: CheckCircle, color: EMERALD, bg: "rgba(16,185,129,0.12)" },
  warning: { icon: AlertCircle, color: AMBER, bg: "rgba(245,158,11,0.12)" },
  urgent: { icon: Bell, color: RED, bg: "rgba(239,68,68,0.12)" },
};

export function AdminAnnouncements() {
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Compose + list */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <button className="md:hidden p-2 rounded-lg mr-2" style={{ background: "rgba(255,255,255,0.05)" }} onClick={() => setMobileOpen(v => !v)}><Menu className="w-5 h-5" style={{ color: "#94A3B8" }} /></button>
            <div>
              <h1 className="font-semibold text-lg" style={{ color: TEXT }}>Notifications & Announcements</h1>
              <p className="text-xs" style={{ color: MUTED }}>248 students across 3 active batches</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                <Filter className="w-4 h-4" /> Filter <ChevronDown className="w-4 h-4" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
                <Plus className="w-4 h-4" /> New Announcement
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: "#0D1526" }}>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Sent This Month", value: "24", icon: Send, color: PRIMARY, bg: "rgba(37,99,235,0.12)" },
                { label: "Avg Open Rate", value: "86%", icon: Eye, color: EMERALD, bg: "rgba(16,185,129,0.12)" },
                { label: "Scheduled", value: "3", icon: Clock, color: AMBER, bg: "rgba(245,158,11,0.12)" },
                { label: "Total Reach", value: "5.9K", icon: Megaphone, color: PURPLE, bg: "rgba(139,92,246,0.12)" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sent list */}
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <h2 className="font-semibold text-sm" style={{ color: TEXT }}>Sent Announcements</h2>
                <span className="text-xs" style={{ color: MUTED }}>24 total</span>
              </div>
              {sentAnnouncements.map((ann, i) => {
                const t = typeIcon[ann.type];
                const readPct = Math.round((ann.read / ann.reach) * 100);
                return (
                  <div key={ann.id} className="px-5 py-4 flex items-start gap-4"
                    style={{ borderBottom: i < sentAnnouncements.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: t.bg }}>
                      <t.icon className="w-5 h-5" style={{ color: t.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: TEXT }}>{ann.title}</p>
                          <p className="text-xs mt-0.5 leading-relaxed line-clamp-1" style={{ color: MUTED }}>{ann.body}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Edit2 className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg" style={{ color: MUTED }}><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(37,99,235,0.1)", color: ann.targetColor }}>
                          {ann.target}
                        </span>
                        <span className="text-[10px] flex items-center gap-1" style={{ color: MUTED }}>
                          <Clock className="w-2.5 h-2.5" /> {ann.sent}
                        </span>
                        <span className="text-[10px] flex items-center gap-1" style={{ color: MUTED }}>
                          <Send className="w-2.5 h-2.5" /> {ann.reach} sent
                        </span>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <Eye className="w-3 h-3" style={{ color: readPct >= 80 ? EMERALD : AMBER }} />
                          <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                            <div className="h-full rounded-full" style={{ width: `${readPct}%`, background: readPct >= 80 ? EMERALD : AMBER }} />
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: readPct >= 80 ? EMERALD : AMBER }}>{readPct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Compose panel */}
        <div className="w-80 flex flex-col flex-shrink-0" style={{ background: CARD, borderLeft: `1px solid ${BORDER}` }}>
          <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Compose Announcement</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Send push notification to students</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Type */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Type</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[{ label: "Info", icon: Info, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
                  { label: "Alert", icon: AlertCircle, color: AMBER, bg: "rgba(245,158,11,0.12)" },
                  { label: "Urgent", icon: Bell, color: RED, bg: "rgba(239,68,68,0.12)" }].map((t, i) => (
                  <button key={t.label} className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-xs font-medium"
                    style={i === 0 ? { background: t.bg, border: `1.5px solid ${t.color}`, color: t.color } : { background: SURFACE, border: `1px solid ${BORDER2}`, color: MUTED }}>
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Title</label>
              <div className="mt-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1.5px solid ${PRIMARY}` }}>
                <span className="text-sm" style={{ color: TEXT }}>New Lecture Added — Module 4</span>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Message</label>
              <div className="mt-2 px-3 py-2.5 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, minHeight: "80px" }}>
                <span className="text-sm leading-relaxed" style={{ color: TEXT2 }}>
                  Lecture 6 — Advanced Options Strategies has been uploaded. Watch it at your convenience on the app.
                </span>
              </div>
              <p className="text-[10px] text-right mt-1" style={{ color: MUTED }}>128 / 200 chars</p>
            </div>

            {/* Target */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Target Audience</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["All Batches", "Adv. Trading A", "Fundamentals B", "Options C"].map((b, i) => (
                  <button key={b} className="px-3 py-1.5 rounded-xl text-xs font-medium"
                    style={i === 0 ? { background: PRIMARY, color: "#fff" } : { background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Delivery</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Send Now", "Schedule"].map((opt, i) => (
                  <button key={opt} className="py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={i === 0 ? { background: EMERALD, color: "#fff" } : { background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
                    {i === 0 ? <Send className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-4" style={{ background: "#0B1120", border: `1px solid ${BORDER2}` }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Push Preview</p>
              <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: SURFACE }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: TEXT }}>New Lecture Added — Module 4</p>
                  <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: MUTED }}>Lecture 6 — Advanced Options Strategies has been uploaded…</p>
                  <p className="text-[10px] mt-1" style={{ color: MUTED }}>TradeCoach · now</p>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm" style={{ background: PRIMARY }}>
              <Send className="w-4 h-4" /> Send to 248 Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
