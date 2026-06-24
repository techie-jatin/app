import {
  ChevronLeft, Shield, CheckCircle, ChevronDown, ChevronRight,
  CreditCard, Smartphone, Building2, Tag, Lock, TrendingUp,
  BookOpen, Calendar, BarChart2, Award
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

const methods = [
  { id: "upi", icon: Smartphone, label: "UPI", sub: "GPay, PhonePe, Paytm", selected: true },
  { id: "card", icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", selected: false },
  { id: "netbanking", icon: Building2, label: "Net Banking", sub: "All major banks", selected: false },
  { id: "emi", icon: Calendar, label: "EMI — No Cost", sub: "₹6,667/month × 3 months", selected: false },
];

const upiApps = [
  { name: "GPay", color: "#4285F4", letter: "G" },
  { name: "PhonePe", color: "#5F259F", letter: "P" },
  { name: "Paytm", color: "#00B9F1", letter: "P" },
  { name: "Other", color: "#64748B", letter: "+" },
];

export function Payment() {
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
      <div className="px-4 pt-3 pb-4 flex items-center gap-3 flex-shrink-0" style={{ background: NAVY }}>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white font-semibold text-base">Payment</p>
          <p className="text-xs" style={{ color: "#64748B" }}>Secure checkout · SSL encrypted</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)" }}>
          <Lock className="w-3 h-3" style={{ color: EMERALD }} />
          <span className="text-[10px] font-bold" style={{ color: EMERALD }}>SECURE</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4">

        {/* Order summary */}
        <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug" style={{ color: TEXT }}>Advanced Options & Derivatives Mastery</p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>Batch A · Dr. Anand Kumar · 3 months</p>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2">
            {[
              { label: "Course Fee", value: "₹29,999" },
              { label: "Discount (33%)", value: "−₹9,999", color: EMERALD },
              { label: "GST (18%)", value: "+₹3,600" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TEXT2 }}>{row.label}</span>
                <span className="text-sm font-medium" style={{ color: row.color ?? TEXT2 }}>{row.value}</span>
              </div>
            ))}
            <div className="pt-2 mt-1 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}` }}>
              <span className="text-sm font-bold" style={{ color: TEXT }}>Total Payable</span>
              <span className="text-xl font-black" style={{ color: PRIMARY }}>₹23,600</span>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <Tag className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            <span className="text-sm" style={{ color: MUTED }}>Enter coupon code</span>
          </div>
          <button className="px-4 py-3 rounded-xl text-sm font-bold text-white" style={{ background: PRIMARY }}>Apply</button>
        </div>

        {/* Payment method */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3 px-1" style={{ color: MUTED }}>Choose Payment Method</p>
          <div className="space-y-2">
            {methods.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl px-4 py-3.5 cursor-pointer"
                style={{ background: CARD, border: `1.5px solid ${m.selected ? PRIMARY : BORDER}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: m.selected ? "rgba(37,99,235,0.1)" : "#F1F5F9" }}>
                  <m.icon className="w-4.5 h-4.5" style={{ color: m.selected ? PRIMARY : MUTED }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: m.selected ? TEXT : TEXT2 }}>{m.label}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{m.sub}</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: m.selected ? PRIMARY : BORDER, background: m.selected ? PRIMARY : "transparent" }}>
                  {m.selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI quick select */}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1.5px solid ${PRIMARY}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: TEXT }}>Quick Pay with UPI</p>
          <div className="flex gap-2 mb-3">
            {upiApps.map((app) => (
              <button key={app.name} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl"
                style={{ background: "#F8FAFC", border: `1px solid ${BORDER}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ background: app.color }}>{app.letter}</div>
                <span className="text-[9px] font-medium" style={{ color: MUTED }}>{app.name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl" style={{ background: "#F8FAFC", border: `1px solid ${BORDER}` }}>
              <Smartphone className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
              <span className="text-sm" style={{ color: MUTED }}>Enter UPI ID</span>
            </div>
            <button className="px-3 py-2.5 rounded-xl text-sm font-bold" style={{ background: "rgba(37,99,235,0.1)", color: PRIMARY }}>Verify</button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 py-2">
          {[
            { icon: Shield, text: "256-bit SSL" },
            { icon: Lock, text: "PCI DSS" },
            { icon: CheckCircle, text: "100% Refund*" },
          ].map((b) => (
            <div key={b.text} className="flex flex-col items-center gap-1">
              <b.icon className="w-4 h-4" style={{ color: MUTED }} />
              <span className="text-[10px]" style={{ color: MUTED }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="flex-shrink-0 px-4 py-4" style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base shadow-lg"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
          <Lock className="w-4 h-4" /> Pay ₹23,600 Securely
        </button>
        <p className="text-center text-[10px] mt-2" style={{ color: MUTED }}>
          By paying you agree to our <span style={{ color: PRIMARY }}>Terms & Refund Policy</span>
        </p>
      </div>
    </div>
  );
}
