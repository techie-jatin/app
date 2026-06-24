import { TrendingUp, User, Phone, Mail, Calendar, MapPin, Users, ChevronDown, ChevronLeft } from "lucide-react";

import { useLocation } from "wouter";
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const TEXT = "#0F172A";
const TEXT2 = "#64748B";
const HINT = "#94A3B8";
const PRIMARY = "#2563EB";
const EMERALD = "#10B981";
const BORDER = "#E2E8F0";

const fields = [
  { icon: User, label: "Full Name", value: "Rahul Sharma", active: true },
  { icon: Phone, label: "Mobile Number", value: "+91 98765 43210", active: false },
  { icon: Mail, label: "Email Address", value: "rahul.sharma@gmail.com", active: false },
  { icon: Calendar, label: "Date of Birth", value: "12 March 1999", active: false },
];

const selectFields = [
  { icon: Users, label: "Gender", value: "Male" },
  { icon: MapPin, label: "City / State", value: "Mumbai, Maharashtra" },
];

export function RegistrationScreen() {
  const [, navigate] = useLocation();
  return (
    <div className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0">
        <span className="text-xs font-medium" style={{ color: TEXT2 }}>9:41</span>
        <div className="w-4 h-2 border rounded-[2px] relative" style={{ borderColor: "#CBD5E1" }}>
          <div className="absolute inset-[2px] left-[2px] rounded-[1px] w-1/2" style={{ background: TEXT2 }} />
        </div>
      </div>

      {/* Top nav */}
      <div className="flex items-center gap-3 px-5 pt-3 pb-4 flex-shrink-0" style={{ background: "#0F172A" }}>
        <button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}><ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-white">Create Account</h1>
          <p className="text-xs" style={{ color: "#64748B" }}>Step 1 of 2 · Personal Details</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Step bar */}
      <div className="px-5 pt-4 pb-4 flex-shrink-0" style={{ background: "#0F172A" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: EMERALD }} />
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>
        <p className="text-xs mt-2" style={{ color: "#64748B" }}>Personal Info → Parent Info</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 space-y-4 pb-6">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: TEXT2 }}>{f.label.toUpperCase()}</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: CARD, border: `1.5px solid ${f.active ? PRIMARY : BORDER}`, boxShadow: f.active ? `0 0 0 3px rgba(37,99,235,0.08)` : "none" }}>
              <f.icon className="w-4 h-4 flex-shrink-0" style={{ color: f.active ? PRIMARY : HINT }} />
              <span className="text-sm" style={{ color: TEXT }}>{f.value}</span>
            </div>
          </div>
        ))}

        {selectFields.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: TEXT2 }}>{f.label.toUpperCase()}</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: CARD, border: `1.5px solid ${BORDER}` }}>
              <f.icon className="w-4 h-4 flex-shrink-0" style={{ color: HINT }} />
              <span className="text-sm flex-1" style={{ color: TEXT }}>{f.value}</span>
              <ChevronDown className="w-4 h-4" style={{ color: HINT }} />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: TEXT2 }}>FULL ADDRESS</label>
          <div className="px-4 py-3.5 rounded-xl" style={{ background: CARD, border: `1.5px solid ${BORDER}`, minHeight: "72px" }}>
            <p className="text-sm" style={{ color: TEXT }}>Flat 402, Sai Niwas, Andheri West, Mumbai - 400058</p>
          </div>
        </div>

        <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
          <span style={{ color: PRIMARY, fontSize: 18 }}>ℹ️</span>
          <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
            Your account is created immediately. Course access is unlocked once our admin assigns you to a batch.
          </p>
        </div>

        <button className="w-full py-4 rounded-xl text-white text-sm font-bold tracking-wide shadow-lg" style={{ background: PRIMARY }}>
          CONTINUE →
        </button>

        <p className="text-center text-sm pb-2" style={{ color: TEXT2 }}>
          Already have an account?{" "}
          <span className="font-bold" style={{ color: PRIMARY }}>Login</span>
        </p>
      </div>
    </div>
  );
}
