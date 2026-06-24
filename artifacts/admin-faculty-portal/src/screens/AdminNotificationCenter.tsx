
import { Award, BarChart2, Bell, BookOpen, Calendar, CheckCircle, ChevronDown, Clock, Eye, Filter, GraduationCap, Layers, Menu, Plus, Send, Settings, Smartphone, TrendingUp, Users, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const BG = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
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

const templates = [
  { label: "New Lecture", icon: "📚", color: PRIMARY },
  { label: "Assignment Due", icon: "📝", color: AMBER },
  { label: "Quiz Alert", icon: "❓", color: PURPLE },
  { label: "Live Class", icon: "📡", color: RED },
  { label: "Certificate", icon: "🏅", color: EMERALD },
  { label: "Custom", icon: "✏️", color: MUTED },
];

const history = [
  { title: "Live Class Tomorrow at 6 PM", target: "Advanced Trading A", sent: "Jun 23 · 5:00 PM", delivered: 42, read: 38, type: "Live Class" },
  { title: "Assignment 3 deadline reminder", target: "All Batches", sent: "Jun 22 · 10:00 AM", delivered: 84, read: 71, type: "Assignment Due" },
  { title: "Quiz 4 is now live — attempt now!", target: "Advanced Trading A", sent: "Jun 20 · 9:00 AM", delivered: 42, read: 42, type: "Quiz Alert" },
  { title: "New lecture added: Volume Profile", target: "Advanced Trading A", sent: "Jun 18 · 3:00 PM", delivered: 42, read: 35, type: "New Lecture" },
  { title: "Certificate issued: Module 1", target: "Advanced Trading A", sent: "Jun 15 · 6:00 PM", delivered: 10, read: 10, type: "Certificate" },
];

const typeColors: Record<string, string> = {
  "Live Class": RED, "Assignment Due": AMBER, "Quiz Alert": PURPLE,
  "New Lecture": PRIMARY, "Certificate": EMERALD,
};

export function AdminNotificationCenter() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div className="w-full min-h-screen flex overflow-hidden font-['Inter']" style={{ background: BG }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 flex flex-col py-5 px-3" style={{ background: CARD, borderRight: `1px solid ${BORDER2}` }}>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PRIMARY }}>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: TEXT }}>TradeCoach</p>
            <p className="text-[10px]" style={{ color: MUTED }}>Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => item.path && navigate(item.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={item.active ? { background: "rgba(37,99,235,0.15)", color: "#60A5FA", borderLeft: `3px solid ${PRIMARY}` } : { color: MUTED }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER2}` }}>
          <div>
            <h1 className="text-xl font-black" style={{ color: TEXT }}>Notification Center</h1>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Send push notifications to students via Firebase Cloud Messaging</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Smartphone className="w-3.5 h-3.5" style={{ color: EMERALD }} />
            <span className="text-xs font-semibold" style={{ color: EMERALD }}>FCM Connected</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Compose form */}
            <div className="col-span-3 space-y-4">
              <div className="rounded-2xl p-6 space-y-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-sm font-bold" style={{ color: TEXT }}>Compose Notification</p>

                {/* Templates */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Quick Templates</label>
                  <div className="grid grid-cols-3 gap-2">
                    {templates.map((t) => (
                      <button key={t.label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left"
                        style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                        <span className="text-base">{t.icon}</span>
                        <span className="text-xs font-medium" style={{ color: TEXT2 }}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Notification Title *</label>
                  <div className="px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${PRIMARY}`, boxShadow: "0 0 0 3px rgba(37,99,235,0.08)" }}>
                    <span className="text-sm" style={{ color: TEXT }}>Live Class Tonight at 6:00 PM — Don't Miss It!</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Message Body *</label>
                  <div className="px-4 py-3 h-20 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                    <span className="text-sm" style={{ color: TEXT2 }}>Dr. Anand Kumar is hosting a live session on Options Chain Analysis tonight at 6 PM. Join on time. Link will be available in the app.</span>
                  </div>
                  <p className="text-[10px] mt-1 text-right" style={{ color: MUTED }}>147 / 200 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Target Audience *</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Advanced Trading A</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: MUTED }}>42 students will receive this</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: TEXT2 }}>Delivery</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <span className="text-sm" style={{ color: TEXT }}>Send Immediately</span>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: SURFACE }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: TEXT2 }}>Link to screen in app</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>Tapping notification will open Live Class screen</p>
                  </div>
                  <div className="w-10 h-5 rounded-full relative" style={{ background: PRIMARY }}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white" style={{ background: PRIMARY }}>
                    <Send className="w-4 h-4" /> Send Now
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: SURFACE, color: TEXT2, border: `1px solid ${BORDER2}` }}>
                    <Clock className="w-4 h-4" /> Schedule
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <p className="text-xs font-semibold mb-3" style={{ color: MUTED }}>DEVICE PREVIEW</p>
                <div className="max-w-xs mx-auto rounded-2xl p-4" style={{ background: "#1C1C1E" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: PRIMARY }}>
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white">TradeCoach</p>
                        <p className="text-[10px]" style={{ color: "#64748B" }}>now</p>
                      </div>
                      <p className="text-xs font-semibold text-white mt-0.5">Live Class Tonight at 6:00 PM — Don't Miss It!</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>Dr. Anand Kumar is hosting a live session on Options Chain Analysis tonight at 6 PM...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold" style={{ color: TEXT }}>Sent History</p>
                  <Filter className="w-4 h-4" style={{ color: MUTED }} />
                </div>
                <div className="space-y-3">
                  {history.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: SURFACE }}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-xs font-semibold leading-snug" style={{ color: TEXT }}>{h.title}</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ background: `${typeColors[h.type] || MUTED}15`, color: typeColors[h.type] || MUTED }}>
                          {h.type}
                        </span>
                      </div>
                      <p className="text-[10px]" style={{ color: MUTED }}>{h.target} · {h.sent}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Send className="w-3 h-3" style={{ color: MUTED }} />
                          <span className="text-[10px]" style={{ color: MUTED }}>{h.delivered} delivered</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" style={{ color: EMERALD }} />
                          <span className="text-[10px]" style={{ color: EMERALD }}>{h.read} read</span>
                        </div>
                      </div>
                      <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: BORDER2 }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round((h.read / h.delivered) * 100)}%`, background: EMERALD }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
