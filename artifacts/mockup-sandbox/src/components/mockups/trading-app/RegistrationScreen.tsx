import { TrendingUp, User, Phone, Mail, Calendar, MapPin, Users, ChevronDown, ChevronLeft } from "lucide-react";

const fields = [
  { icon: User, label: "Full Name", value: "Rahul Sharma", type: "text" },
  { icon: Phone, label: "Mobile Number", value: "+91 98765 43210", type: "tel" },
  { icon: Mail, label: "Email Address", value: "rahul.sharma@gmail.com", type: "email" },
  { icon: Calendar, label: "Date of Birth", value: "12 March 1999", type: "date" },
];

const selectFields = [
  { icon: Users, label: "Gender", value: "Male" },
  { icon: MapPin, label: "City / State", value: "Mumbai, Maharashtra" },
];

export function RegistrationScreen() {
  return (
    <div
      className="w-[390px] h-[844px] flex flex-col overflow-hidden font-['Inter']"
      style={{ background: "#0C0C0C", color: "#FFFFFF" }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 flex-shrink-0">
        <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>9:41</span>
        <div className="w-4 h-2 border rounded-[2px] relative" style={{ borderColor: "#555" }}>
          <div className="absolute inset-[2px] left-[2px] rounded-[1px] w-1/2" style={{ background: "#9CA3AF" }} />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-3 pb-5 flex-shrink-0">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#1E1E1E", border: "1px solid #2A2A2A" }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "#9CA3AF" }} />
        </button>
        <div>
          <h1 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Create Account</h1>
          <p className="text-xs" style={{ color: "#6B7280" }}>Step 1 of 2 · Personal Details</p>
        </div>
        <div
          className="ml-auto w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)" }}
        >
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Step indicator */}
      <div className="px-5 mb-5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "#FFBF00" }} />
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "#2A2A2A" }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: "#6B7280" }}>Personal Info · Parent Info</p>
      </div>

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-6">
        {/* Text fields */}
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{f.label}</label>
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: "#161616", border: "1px solid #FFBF00", boxShadow: "0 0 0 2px rgba(255,191,0,0.08)" }}
            >
              <f.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#FFBF00" }} />
              <span className="text-sm" style={{ color: "#FFFFFF" }}>{f.value}</span>
            </div>
          </div>
        ))}

        {/* Select fields */}
        {selectFields.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{f.label}</label>
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: "#1E1E1E", border: "1px solid #2E2E2E" }}
            >
              <f.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#6B7280" }} />
              <span className="text-sm flex-1" style={{ color: "#FFFFFF" }}>{f.value}</span>
              <ChevronDown className="w-4 h-4" style={{ color: "#6B7280" }} />
            </div>
          </div>
        ))}

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Full Address</label>
          <div
            className="px-4 py-3.5 rounded-2xl"
            style={{ background: "#1E1E1E", border: "1px solid #2E2E2E", minHeight: "72px" }}
          >
            <p className="text-sm" style={{ color: "#FFFFFF" }}>Flat 402, Sai Niwas, Andheri West, Mumbai - 400058</p>
          </div>
        </div>

        {/* Notice */}
        <div
          className="rounded-2xl px-4 py-3 flex items-start gap-3"
          style={{ background: "rgba(255,191,0,0.06)", border: "1px solid rgba(255,191,0,0.15)" }}
        >
          <span style={{ color: "#FFBF00", fontSize: 18 }}>ℹ️</span>
          <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
            Your account is created immediately. Course access is unlocked once our admin assigns you to a batch.
          </p>
        </div>

        {/* CTA */}
        <button
          className="w-full py-4 rounded-2xl text-sm font-extrabold tracking-wide shadow-lg mt-2"
          style={{ background: "linear-gradient(135deg, #FFBF00, #FF8C00)", color: "#0C0C0C" }}
        >
          CONTINUE →
        </button>

        <p className="text-center text-sm" style={{ color: "#6B7280" }}>
          Already have an account?{" "}
          <span className="font-bold" style={{ color: "#FFBF00" }}>Login</span>
        </p>
      </div>
    </div>
  );
}
