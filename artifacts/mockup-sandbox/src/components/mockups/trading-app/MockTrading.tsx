import {
  TrendingUp, TrendingDown, ChevronLeft, RefreshCw,
  ArrowUp, ArrowDown, BookOpen, Calendar, BarChart2,
  Award, Activity, AlertCircle, ChevronDown, Zap
} from "lucide-react";

const NAVY = "#0B1120";
const CARD = "#111827";
const SURFACE = "#1F2937";
const BORDER2 = "#374151";
const TEXT = "#FFFFFF";
const TEXT2 = "#CBD5E1";
const MUTED = "#64748B";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const RED = "#EF4444";
const AMBER = "#F59E0B";
const BG_LIGHT = "#F8FAFC";

const indices = [
  { name: "NIFTY 50", val: "22,347.50", chg: "+123.40", pct: "+0.56%", up: true },
  { name: "BANKNIFTY", val: "48,912.30", chg: "-89.20", pct: "-0.18%", up: false },
];

const positions = [
  { symbol: "NIFTY 22400 CE", exp: "26 Jun", qty: 1, ltp: 145.50, avg: 132.00, pnl: 675, pnlPct: 10.23, up: true },
  { symbol: "NIFTY 22200 PE", exp: "26 Jun", qty: 2, ltp: 62.00, avg: 78.50, pnl: -1650, pnlPct: -10.51, up: false },
  { symbol: "BANKNIFTY 49000 CE", exp: "26 Jun", qty: 1, ltp: 210.00, avg: 185.00, pnl: 1250, pnlPct: 13.51, up: true },
];

const orderHistory = [
  { symbol: "NIFTY 22400 CE", type: "BUY", qty: 1, price: 132.00, time: "9:16 AM", status: "executed" },
  { symbol: "NIFTY 22200 PE", type: "BUY", qty: 2, price: 78.50, time: "9:22 AM", status: "executed" },
  { symbol: "BANKNIFTY 49000 CE", type: "BUY", qty: 1, price: 185.00, time: "10:05 AM", status: "executed" },
  { symbol: "NIFTY 22500 CE", type: "BUY", qty: 1, price: 88.00, time: "11:30 AM", status: "rejected" },
];

const totalPnL = positions.reduce((s, p) => s + p.pnl, 0);

export function MockTrading() {
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: NAVY, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-[11px] text-white opacity-40">9:41</span>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" style={{ color: EMERALD }} />
          <span className="text-[10px]" style={{ color: EMERALD }}>MARKET LIVE</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-2 pb-3 flex items-center gap-2 flex-shrink-0" style={{ background: NAVY }}>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white font-bold text-base">Paper Trade</p>
          <p className="text-[10px]" style={{ color: MUTED }}>Simulated portfolio · No real money</p>
        </div>
        <div className="px-2 py-1 rounded-lg flex items-center gap-1" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <Zap className="w-3 h-3" style={{ color: EMERALD }} />
          <span className="text-[10px] font-bold" style={{ color: EMERALD }}>SIMULATION</span>
        </div>
        <button style={{ color: MUTED }}><RefreshCw className="w-4 h-4" /></button>
      </div>

      {/* Index ticker */}
      <div className="flex gap-3 px-4 mb-3 flex-shrink-0">
        {indices.map((idx) => (
          <div key={idx.name} className="flex-1 rounded-xl px-3 py-2" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
            <p className="text-[9px] font-semibold" style={{ color: MUTED }}>{idx.name}</p>
            <p className="text-sm font-black" style={{ color: TEXT }}>{idx.val}</p>
            <p className="text-[10px] font-semibold" style={{ color: idx.up ? EMERALD : RED }}>{idx.chg} ({idx.pct})</p>
          </div>
        ))}
      </div>

      {/* Portfolio summary */}
      <div className="mx-4 mb-3 rounded-2xl p-4 flex-shrink-0 relative overflow-hidden"
        style={{ background: totalPnL >= 0 ? "linear-gradient(135deg,#064E3B,#065F46)" : "linear-gradient(135deg,#7F1D1D,#991B1B)", border: `1px solid ${totalPnL >= 0 ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}` }}>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6"
          style={{ background: totalPnL >= 0 ? EMERALD : RED }} />
        <div className="relative z-10">
          <p className="text-xs font-medium text-white/60 mb-1">Today's P&L</p>
          <div className="flex items-end gap-2 mb-2">
            <p className="text-3xl font-black text-white">{totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString("en-IN")}</p>
            <div className="flex items-center gap-1 mb-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
              {totalPnL >= 0 ? <TrendingUp className="w-3 h-3 text-white" /> : <TrendingDown className="w-3 h-3 text-white" />}
              <span className="text-xs font-bold text-white">{totalPnL >= 0 ? "+2.1%" : "-2.1%"}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-[9px] text-white/50">Virtual Capital</p>
              <p className="text-sm font-bold text-white">₹5,00,000</p>
            </div>
            <div>
              <p className="text-[9px] text-white/50">Used Margin</p>
              <p className="text-sm font-bold text-white">₹62,400</p>
            </div>
            <div>
              <p className="text-[9px] text-white/50">Available</p>
              <p className="text-sm font-bold text-white">₹4,37,600</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 mb-3 gap-2 flex-shrink-0">
        {[{ label: "Positions", count: 3, active: true }, { label: "Orders", count: 4, active: false }, { label: "Analytics", count: null, active: false }].map((tab) => (
          <button key={tab.label} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={tab.active ? { background: PRIMARY, color: "#fff" } : { background: SURFACE, color: MUTED }}>
            {tab.label}
            {tab.count !== null && <span className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
              style={{ background: tab.active ? "rgba(255,255,255,0.2)" : BORDER2 }}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Positions list */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-2">
        {positions.map((pos) => (
          <div key={pos.symbol} className="rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-bold" style={{ color: TEXT }}>{pos.symbol}</p>
                <p className="text-[10px]" style={{ color: MUTED }}>Exp: {pos.exp} · Qty: {pos.qty} lot</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black" style={{ color: pos.up ? EMERALD : RED }}>
                  {pos.up ? "+" : ""}₹{pos.pnl.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] font-semibold" style={{ color: pos.up ? EMERALD : RED }}>
                  {pos.up ? "▲" : "▼"} {Math.abs(pos.pnlPct).toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(Math.abs(pos.pnlPct) * 4, 100)}%`, background: pos.up ? EMERALD : RED }} />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-[9px]" style={{ color: MUTED }}>Avg Price</p>
                <p className="text-xs font-semibold" style={{ color: TEXT2 }}>₹{pos.avg}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px]" style={{ color: MUTED }}>LTP</p>
                <p className="text-xs font-semibold" style={{ color: TEXT2 }}>₹{pos.ltp}</p>
              </div>
              <div className="flex gap-1">
                <button className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: "rgba(239,68,68,0.15)", color: RED }}>EXIT</button>
                <button className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: "rgba(16,185,129,0.1)", color: EMERALD }}>ADD</button>
              </div>
            </div>
          </div>
        ))}

        {/* Place new order CTA */}
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "rgba(37,99,235,0.06)", border: "1.5px dashed rgba(37,99,235,0.25)" }}>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: TEXT }}>Place Paper Order</p>
            <p className="text-xs" style={{ color: MUTED }}>Search options chain to add positions</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white" style={{ background: PRIMARY }}>
            <ArrowUp className="w-3.5 h-3.5" /> BUY
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold" style={{ background: "rgba(239,68,68,0.12)", color: RED }}>
            <ArrowDown className="w-3.5 h-3.5" /> SELL
          </button>
        </div>

        {/* Lesson badge */}
        <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: CARD, border: `1px solid ${BORDER2}` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.1)" }}>
            <AlertCircle className="w-4.5 h-4.5" style={{ color: AMBER }} />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: TEXT2 }}>
            <span className="font-semibold" style={{ color: AMBER }}>Coach Tip:</span> Your NIFTY PE is losing. Check if the support level held from Lecture 4 before adding more.
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex-shrink-0 px-2 pb-4 pt-2" style={{ background: CARD, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-around">
          {[{ icon: TrendingUp, label: "Home" }, { icon: BookOpen, label: "Courses" }, { icon: Activity, label: "Trade", active: true }, { icon: BarChart2, label: "Progress" }, { icon: Award, label: "Profile" }].map((item) => (
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
