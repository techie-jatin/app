import {
  ChevronLeft, Download, CreditCard, CheckCircle,
  Clock, AlertCircle, ChevronRight, Receipt, Tag,
  TrendingUp, BookOpen, Calendar, BarChart2, Award,
  Wallet, ArrowDownLeft, ArrowUpRight, Gift
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

const transactions = [
  {
    id: "TXN-20240601-001",
    title: "Advanced Trading Batch A",
    sub: "Full payment · Batch fee",
    amount: -24999,
    date: "Jun 1, 2026",
    method: "UPI · PhonePe",
    status: "success",
    icon: CreditCard,
    iconColor: PRIMARY,
  },
  {
    id: "TXN-20240601-002",
    title: "Referral Bonus Credit",
    sub: "Rahul referred Vikram P.",
    amount: +1000,
    date: "Jun 3, 2026",
    method: "Wallet credit",
    status: "credit",
    icon: Gift,
    iconColor: EMERALD,
  },
  {
    id: "TXN-20240512-001",
    title: "Options Basics Module",
    sub: "Add-on module purchase",
    amount: -4999,
    date: "May 12, 2026",
    method: "Debit Card · HDFC",
    status: "success",
    icon: CreditCard,
    iconColor: PRIMARY,
  },
  {
    id: "TXN-20240510-001",
    title: "Study Material (PDF Pack)",
    sub: "Physical delivery cancelled",
    amount: -799,
    date: "May 10, 2026",
    method: "UPI · GPay",
    status: "refunded",
    icon: Receipt,
    iconColor: AMBER,
  },
  {
    id: "TXN-20240415-001",
    title: "Foundation Batch Fee",
    sub: "Previous batch · completed",
    amount: -12999,
    date: "Apr 15, 2026",
    method: "Net Banking · SBI",
    status: "success",
    icon: CreditCard,
    iconColor: PRIMARY,
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  success: { label: "Paid", color: EMERALD, bg: "rgba(16,185,129,0.1)", icon: CheckCircle },
  credit: { label: "Credited", color: EMERALD, bg: "rgba(16,185,129,0.1)", icon: ArrowDownLeft },
  refunded: { label: "Refunded", color: AMBER, bg: "rgba(245,158,11,0.1)", icon: ArrowUpRight },
  pending: { label: "Pending", color: AMBER, bg: "rgba(245,158,11,0.1)", icon: Clock },
  failed: { label: "Failed", color: RED, bg: "rgba(239,68,68,0.1)", icon: AlertCircle },
};

export function StudentWallet() {
  const totalSpent = Math.abs(transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0));
  const walletBalance = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);

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
      <div className="px-4 pt-3 pb-6 flex-shrink-0" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 mb-5">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white font-semibold text-base flex-1">Payments & Wallet</p>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Wallet card */}
        <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-10 -translate-y-8 translate-x-8" style={{ background: PRIMARY }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4" style={{ color: EMERALD }} />
              <p className="text-sm text-white/70">TradeCoach Wallet</p>
            </div>
            <p className="text-3xl font-black text-white mb-3">₹{walletBalance.toLocaleString("en-IN")}</p>
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] text-white/40">Total Spent</p>
                <p className="text-sm font-bold text-white">₹{totalSpent.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40">Referral Earned</p>
                <p className="text-sm font-bold" style={{ color: EMERALD }}>₹1,000</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40">Transactions</p>
                <p className="text-sm font-bold text-white">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-3 flex gap-3 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        {[
          { icon: Gift, label: "Refer & Earn", color: EMERALD },
          { icon: Receipt, label: "Download GST", color: PRIMARY },
          { icon: Tag, label: "Apply Coupon", color: PURPLE },
        ].map((a) => (
          <button key={a.label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl"
            style={{ background: BG, border: `1px solid ${BORDER}` }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${a.color}12` }}>
              <a.icon className="w-4 h-4" style={{ color: a.color }} />
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: TEXT2 }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: TEXT }}>Transaction History</p>
            <button className="text-xs font-medium" style={{ color: PRIMARY }}>Filter</button>
          </div>
        </div>

        <div className="px-4 pb-20 space-y-2.5">
          {transactions.map((txn) => {
            const sc = statusConfig[txn.status];
            return (
              <div key={txn.id} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${txn.iconColor}12` }}>
                    <txn.icon className="w-4.5 h-4.5" style={{ color: txn.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-sm font-semibold leading-tight" style={{ color: TEXT }}>{txn.title}</p>
                      <p className="text-sm font-black flex-shrink-0 ml-2"
                        style={{ color: txn.amount > 0 ? EMERALD : TEXT }}>
                        {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{txn.sub}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]" style={{ color: MUTED }}>{txn.date}</span>
                        <span className="text-[10px]" style={{ color: MUTED }}>·</span>
                        <span className="text-[10px]" style={{ color: MUTED }}>{txn.method}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}>
                        <sc.icon className="w-2.5 h-2.5" /> {sc.label}
                      </span>
                    </div>
                    <p className="text-[9px] mt-1 font-mono" style={{ color: MUTED }}>{txn.id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Calendar, label: "Schedule" }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile", active: true }].map((item) => (
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
