import { Award, BarChart2, Bell, BookOpen, Calendar, GraduationCap, Layers, LogOut, Menu, Settings, TrendingUp, Users, X } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

const BG = "#0B1120";
const CARD = "#111827";
const BORDER = "#1F2937";
const TEXT = "#FFFFFF";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";

const NAV = [
  { icon: BarChart2,    label: "Dashboard",     path: "/admin/dashboard" },
  { icon: Users,        label: "Students",       path: "/admin/students" },
  { icon: GraduationCap,label: "Faculty",        path: "/admin/faculty" },
  { icon: Layers,       label: "Batches",        path: "/admin/batches" },
  { icon: BookOpen,     label: "Courses",        path: "/admin/courses" },
  { icon: Calendar,     label: "Schedule",       path: "/admin/live" },
  { icon: Bell,         label: "Notifications",  path: "/admin/notifications" },
  { icon: Award,        label: "Certificates",   path: "/admin/certificates" },
  { icon: BarChart2,    label: "Reports",        path: "/admin/reports" },
];

interface Props { mobileOpen: boolean; setMobileOpen: (v: boolean) => void; }

export function AdminSidebar({ mobileOpen, setMobileOpen }: Props) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  const NavItems = () => (
    <>
      {NAV.map((item) => (
        <button key={item.label} onClick={() => { navigate(item.path); setMobileOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          style={isActive(item.path) ? { background: "rgba(37,99,235,0.15)", color: "#3B82F6", fontWeight: 600 } : { color: MUTED }}>
          <item.icon className="w-4 h-4 flex-shrink-0" />{item.label}
        </button>
      ))}
    </>
  );

  return (
    <>
      <aside className="hidden md:flex w-60 flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
        <div className="px-5 py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto"><NavItems /></nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>{user?.avatar || "AD"}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{user?.name || "Admin"}</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>{user?.email}</p>
            </div>
            <button onClick={logout} title="Logout"><LogOut className="w-4 h-4" style={{ color: MUTED }} /></button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-72 flex flex-col h-full" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}><TrendingUp className="w-4 h-4 text-white" /></div>
                <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach</p>
              </div>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" style={{ color: MUTED }} /></button>
            </div>
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto"><NavItems /></nav>
            <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: MUTED }}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function MobileMenuBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="md:hidden p-2 rounded-lg mr-2" style={{ background: "rgba(255,255,255,0.05)" }} onClick={onClick}>
      <Menu className="w-5 h-5" style={{ color: "#94A3B8" }} />
    </button>
  );
}
