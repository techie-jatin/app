import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface ToastMsg { id: number; message: string; type: ToastType; }

const ToastContext = createContext<{ toast: (msg: string, type?: ToastType) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
    success: { bg: "#052e16", border: "#16a34a", icon: "#22c55e" },
    error:   { bg: "#1f0808", border: "#dc2626", icon: "#ef4444" },
    info:    { bg: "#0c1a3a", border: "#2563eb", icon: "#3b82f6" },
  };

  const Icons = { success: CheckCircle, error: XCircle, info: Info };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => {
          const c = colors[t.type];
          const Icon = Icons[t.type];
          return (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[260px]"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: c.icon }} />
              <p className="text-sm flex-1 text-white">{t.message}</p>
              <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}>
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx.toast;
}
