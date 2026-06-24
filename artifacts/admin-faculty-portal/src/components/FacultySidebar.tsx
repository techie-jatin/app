import { BookOpen, Calendar, ClipboardList, HelpCircle, LogOut, Menu, TrendingUp, Upload, Users, X } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

const CARD = "#111827";
const BORDER = "#1F2937";
const TEXT = "#FFFFFF";
const MUTED = "#64748B";

const NAV = [
  { icon: TrendingUp,   label: "Dashboard",   path: "/faculty/dashboard" },
  { icon: Upload,       label: "Upload Lecture",path: "/faculty/upload" },
  { icon: HelpCircle,   label: "Create Quiz",  path: "/faculty/quiz" },
  { icon: ClipboardList,label: "Assignment",   path: "/faculty/assignment" },
  { icon: Calendar,     label: "Live Class",   path: "/faculty/live" },
  { icon: BookOpen,     label: "Attendance",   path: "/faculty/attendance" },
  { icon: Users,        label: "Progress",     path: "/faculty/progress" },
];

interface Props { mobileOpen: boolean; setMobileOpen: (v: boolean) => void; }

export function FacultySidebar({ mobileOpen, setMobileOpen }: Props) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path;

  const NavItems = () => (
    <>
      {NAV.map((item) => (
        <button key={item.label} onClick={() => { navigate(item.path); setMobileOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          style={isActive(item.path) ? { background: "rgba(20,184,166,0.15)", color: "#14B8A6", fontWeight: 600 } : { color: MUTED }}>
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Faculty Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto"><NavItems /></nav>
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>{user?.avatar || "FA"}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>{user?.name}</p>
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
            <div className="px-5 py-4 flex items-center justify-between">
              <p className="font-bold text-sm" style={{ color: TEXT }}>TradeCoach Faculty</p>
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
