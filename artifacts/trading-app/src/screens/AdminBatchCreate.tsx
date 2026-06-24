import {
  TrendingUp, Users, BarChart2, BookOpen, Calendar, Bell,
  Award, GraduationCap, Layers, Settings, ChevronLeft,
  ChevronDown, ChevronRight, Plus, Trash2, Clock,
  CheckCircle, AlertCircle, Search, X, Upload
} from "lucide-react";
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
  { icon: GraduationCap, label: "Faculty", path: "/admin/faculty" }, { icon: Layers, label: "Batches", active: true, path: "/admin/batches" },
  { icon: BookOpen, label: "Courses", path: "/admin/courses" }, { icon: Calendar, label: "Schedule", path: "/admin/live" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" }, { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: TrendingUp, label: "Reports", path: "/admin/reports" },
];

const steps = [
  { id: 1, label: "Basic Info", done: true },
  { id: 2, label: "Schedule", done: true },
  { id: 3, label: "Faculty & Course", done: false, active: true },
  { id: 4, label: "Students", done: false },
  { id: 5, label: "Review", done: false },
];

const existingStudents = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", avatar: "RS" },
  { name: "Priya Mehta", email: "priya@gmail.com", avatar: "PM" },
  { name: "Arjun Kapoor", email: "arjun@gmail.com", avatar: "AK" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AdminBatchCreate() {
  const [, navigate] = useLocation();
  return (
    <div className="flex h-screen overflow-hidden font-['Poppins']" style={{ background: BG, color: TEXT }}>
      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0" style={{ background: CARD, borderRight: `1px solid ${BORDER}` }}>
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}>AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TEXT }}>Admin</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4" style={{ color: MUTED }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-3.5 flex items-center gap-4 flex-shrink-0" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ cursor: "pointer" }}><ChevronLeft className="w-4 h-4" /> Batches
          </button>
          <div className="w-px h-4" style={{ background: BORDER2 }} />
          <p className="font-semibold text-lg flex-1" style={{ color: TEXT }}>Create New Batch</p>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: SURFACE, border: `1px solid ${BORDER2}`, color: TEXT2 }}>
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl" style={{ background: PRIMARY }}>
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Progress stepper */}
        <div className="px-6 py-4 flex items-center gap-0 flex-shrink-0" style={{ background: "#0D1526", borderBottom: `1px solid ${BORDER}` }}>
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={step.done ? { background: EMERALD, color: "#fff" } : step.active ? { background: PRIMARY, color: "#fff" } : { background: SURFACE, color: MUTED, border: `1px solid ${BORDER2}` }}>
                  {step.done ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: step.active ? TEXT : step.done ? EMERALD : MUTED }}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-3" style={{ background: i < 2 ? EMERALD : BORDER2 }} />
              )}
            </div>
          ))}
        </div>

        {/* Form area */}
        <div className="flex-1 overflow-y-auto p-6" style={{ background: "#0D1526" }}>
          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Left: Main form (step 3 - Faculty & Course) */}
            <div className="col-span-2 space-y-5">
              {/* Basic info summary (completed) */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
                    <h3 className="font-semibold text-sm" style={{ color: TEXT }}>Basic Info</h3>
                  </div>
                  <button className="text-xs" style={{ color: PRIMARY }}>Edit</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Batch Name", value: "Advanced Trading Batch D" },
                    { label: "Max Students", value: "45" },
                    { label: "Fee", value: "₹24,999" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-xl px-3 py-2.5" style={{ background: SURFACE }}>
                      <p className="text-[10px]" style={{ color: MUTED }}>{f.label}</p>
                      <p className="text-sm font-medium" style={{ color: TEXT2 }}>{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule summary (completed) */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: EMERALD }} />
                    <h3 className="font-semibold text-sm" style={{ color: TEXT }}>Schedule</h3>
                  </div>
                  <button className="text-xs" style={{ color: PRIMARY }}>Edit</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Start Date", value: "Jul 1, 2026" },
                    { label: "End Date", value: "Sep 30, 2026" },
                    { label: "Live Class", value: "Mon, Wed, Fri" },
                    { label: "Time", value: "6:00 PM IST" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-xl px-3 py-2.5" style={{ background: SURFACE }}>
                      <p className="text-[10px]" style={{ color: MUTED }}>{f.label}</p>
                      <p className="text-sm font-medium" style={{ color: TEXT2 }}>{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 — active: Faculty & Course */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1.5px solid ${PRIMARY}` }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: PRIMARY }}>3</div>
                  <h3 className="font-semibold text-sm" style={{ color: TEXT }}>Faculty & Course Assignment</h3>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Lead faculty */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ color: MUTED }}>
                      Lead Faculty <span style={{ color: RED }}>*</span>
                    </label>
                    <div className="rounded-xl px-3 py-3 flex items-center gap-3" style={{ background: SURFACE, border: `1.5px solid ${PRIMARY}` }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>AK</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: TEXT }}>Dr. Anand Kumar</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>Adv. Trading Specialist</p>
                      </div>
                      <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
                    </div>
                  </div>

                  {/* Guest faculty */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ color: MUTED }}>Guest Faculty (optional)</label>
                    <div className="rounded-xl px-3 py-3 flex items-center gap-2" style={{ background: SURFACE, border: `1px solid ${BORDER2}` }}>
                      <Plus className="w-4 h-4" style={{ color: MUTED }} />
                      <span className="text-sm" style={{ color: MUTED }}>Add guest faculty…</span>
                    </div>
                  </div>

                  {/* Course */}
                  <div className="col-span-2">
                    <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ color: MUTED }}>
                      Course / Curriculum <span style={{ color: RED }}>*</span>
                    </label>
                    <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: SURFACE, border: `1.5px solid ${PRIMARY}` }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: TEXT }}>Advanced Options & Derivatives Mastery</p>
                        <p className="text-xs mt-0.5" style={{ color: MUTED }}>19 lectures · 4 modules · 3 months</p>
                      </div>
                      <ChevronDown className="w-4 h-4" style={{ color: MUTED }} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                      <p className="text-xs" style={{ color: EMERALD }}>19 lectures ready · 3 quizzes · 4 assignments</p>
                    </div>
                  </div>

                  {/* Certificate */}
                  <div className="col-span-2">
                    <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ color: MUTED }}>Certificate Eligibility</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Min Attendance", value: "80%", note: "Below = no certificate" },
                        { label: "Min Quiz Avg", value: "60%", note: "Average of all quizzes" },
                        { label: "Assignments", value: "All required", note: "Must submit all" },
                      ].map((c) => (
                        <div key={c.label} className="rounded-xl p-3" style={{ background: SURFACE }}>
                          <p className="text-[10px]" style={{ color: MUTED }}>{c.label}</p>
                          <p className="text-sm font-bold mt-1" style={{ color: EMERALD }}>{c.value}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{c.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 (upcoming) */}
              <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}`, opacity: 0.5 }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: SURFACE, color: MUTED, border: `1px solid ${BORDER2}` }}>4</div>
                  <h3 className="font-semibold text-sm" style={{ color: MUTED }}>Add Students — next step</h3>
                </div>
              </div>
            </div>

            {/* Right: Summary card */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden sticky top-0" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="font-semibold text-sm" style={{ color: TEXT }}>Batch Preview</p>
                </div>
                <div className="p-5 space-y-4">
                  {/* Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>D</div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: TEXT }}>Adv. Trading Batch D</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: AMBER }}>Upcoming</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    {[
                      { icon: Calendar, label: "Start", value: "Jul 1, 2026" },
                      { icon: Clock, label: "Duration", value: "3 months" },
                      { icon: Users, label: "Capacity", value: "45 students" },
                      { icon: GraduationCap, label: "Faculty", value: "Dr. Anand Kumar" },
                      { icon: BookOpen, label: "Lectures", value: "19 lectures" },
                    ].map((d) => (
                      <div key={d.label} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: SURFACE }}>
                        <d.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTED }} />
                        <span className="text-[10px] flex-1" style={{ color: MUTED }}>{d.label}</span>
                        <span className="text-xs font-medium" style={{ color: TEXT2 }}>{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Completion */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px]" style={{ color: MUTED }}>Setup Progress</span>
                      <span className="text-xs font-bold" style={{ color: PRIMARY }}>60%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: SURFACE }}>
                      <div className="h-full rounded-full" style={{ width: "60%", background: PRIMARY }} />
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: MUTED }}>3 of 5 steps complete</p>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start gap-2 rounded-xl p-2.5" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
                    <p className="text-[10px] leading-snug" style={{ color: MUTED }}>Add at least 1 student before publishing the batch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
