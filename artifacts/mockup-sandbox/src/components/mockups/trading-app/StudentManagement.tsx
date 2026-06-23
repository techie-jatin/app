import {
  Users, Search, Filter, MoreVertical, ChevronDown, TrendingUp,
  GraduationCap, Layers, Bell, BookOpen, Award, BarChart2,
  Calendar, UserCheck, Plus, Download, CheckCircle, Clock,
  XCircle, AlertCircle, Eye, Edit2, Shield, Settings, FileText
} from "lucide-react";

const students = [
  { id: "TC-001", name: "Rahul Sharma", email: "rahul@email.com", mobile: "+91 98765 43210", dob: "12 Mar 1999", batch: "Advanced Trading A", batchColor: "bg-violet-500/15 text-violet-400", status: "Active", attendance: 91, quiz: 88, joined: "12 Jan 2026", avatar: "RS", avatarColor: "from-violet-500 to-purple-600" },
  { id: "TC-002", name: "Priya Mehta", email: "priya@email.com", mobile: "+91 87654 32109", dob: "5 Jul 2000", batch: "Unassigned", batchColor: "bg-amber-500/15 text-amber-400", status: "Pending", attendance: 0, quiz: 0, joined: "20 Jun 2026", avatar: "PM", avatarColor: "from-pink-500 to-rose-600" },
  { id: "TC-003", name: "Arjun Kapoor", email: "arjun@email.com", mobile: "+91 76543 21098", dob: "22 Nov 1998", batch: "Fundamentals B", batchColor: "bg-blue-500/15 text-blue-400", status: "Active", attendance: 78, quiz: 72, joined: "3 Feb 2026", avatar: "AK", avatarColor: "from-blue-500 to-cyan-600" },
  { id: "TC-004", name: "Sneha Joshi", email: "sneha@email.com", mobile: "+91 65432 10987", dob: "18 Apr 2001", batch: "Unassigned", batchColor: "bg-amber-500/15 text-amber-400", status: "Pending", attendance: 0, quiz: 0, joined: "22 Jun 2026", avatar: "SJ", avatarColor: "from-amber-500 to-orange-600" },
  { id: "TC-005", name: "Vikram Patel", email: "vikram@email.com", mobile: "+91 54321 09876", dob: "9 Sep 1997", batch: "Options Trading C", batchColor: "bg-emerald-500/15 text-emerald-400", status: "Active", attendance: 94, quiz: 95, joined: "8 Dec 2025", avatar: "VP", avatarColor: "from-emerald-500 to-teal-600" },
  { id: "TC-006", name: "Kavya Nair", email: "kavya@email.com", mobile: "+91 43210 98765", dob: "30 Jan 2000", batch: "Advanced Trading A", batchColor: "bg-violet-500/15 text-violet-400", status: "Suspended", attendance: 55, quiz: 60, joined: "1 Mar 2026", avatar: "KN", avatarColor: "from-slate-500 to-slate-600" },
  { id: "TC-007", name: "Mohit Singh", email: "mohit@email.com", mobile: "+91 32109 87654", dob: "14 Jun 1999", batch: "Fundamentals B", batchColor: "bg-blue-500/15 text-blue-400", status: "Active", attendance: 82, quiz: 79, joined: "15 Jan 2026", avatar: "MS", avatarColor: "from-indigo-500 to-blue-600" },
];

const batches = ["All Batches", "Advanced Trading A", "Fundamentals B", "Options Trading C", "Unassigned"];

const navItems = [
  { icon: BarChart2, label: "Dashboard" },
  { icon: Users, label: "Students", active: true },
  { icon: GraduationCap, label: "Faculty" },
  { icon: Layers, label: "Batches" },
  { icon: BookOpen, label: "Courses" },
  { icon: Calendar, label: "Schedule" },
  { icon: Bell, label: "Notifications" },
  { icon: Award, label: "Certificates" },
  { icon: BarChart2, label: "Reports" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-500/15 text-emerald-400",
    Pending: "bg-amber-500/15 text-amber-400",
    Suspended: "bg-red-500/15 text-red-400",
  };
  const icons: Record<string, typeof CheckCircle> = {
    Active: CheckCircle, Pending: Clock, Suspended: XCircle,
  };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

function AttendanceBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-slate-400 text-xs w-8 text-right">{value}%</span>
    </div>
  );
}

export function StudentManagement() {
  return (
    <div className="flex h-screen bg-slate-950 font-['Inter'] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">TradeCoach</p>
              <p className="text-slate-500 text-[10px] mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                item.active
                  ? "bg-amber-500/15 text-amber-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">Admin</p>
              <p className="text-slate-500 text-xs truncate">admin@tradecoach.in</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-semibold text-lg">Student Management</h1>
            <p className="text-slate-500 text-xs">248 students · 6 unassigned</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-lg">
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                placeholder="Search by name, email or ID..."
                readOnly
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-400 text-sm cursor-pointer hover:border-slate-600">
              <Filter className="w-4 h-4" /> Filter
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-400 text-sm cursor-pointer hover:border-slate-600">
              All Batches <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-400 text-sm cursor-pointer hover:border-slate-600">
              All Status <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Unassigned Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3.5 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-amber-300 text-sm"><span className="font-semibold">6 students</span> are waiting for batch assignment. Assign them to unlock course access.</p>
            <button className="ml-auto text-amber-400 text-sm font-semibold bg-amber-500/20 px-3 py-1.5 rounded-lg hover:bg-amber-500/30 flex-shrink-0">
              Assign Now
            </button>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded border-slate-700 bg-slate-800 accent-amber-400" readOnly />
                  </th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Student</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Batch</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Attendance</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Quiz Score</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Joined</th>
                  <th className="px-4 py-3 text-left text-slate-500 text-xs font-medium uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <input type="checkbox" className="rounded border-slate-700 bg-slate-800 accent-amber-400" readOnly />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${s.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {s.avatar}
                        </div>
                        <div>
                          <p className="text-slate-200 text-sm font-medium">{s.name}</p>
                          <p className="text-slate-500 text-xs">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${s.batchColor}`}>
                        {s.batch}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3.5 w-32">
                      {s.attendance > 0 ? <AttendanceBar value={s.attendance} /> : <span className="text-slate-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      {s.quiz > 0 ? (
                        <span className={`text-sm font-semibold ${s.quiz >= 80 ? "text-emerald-400" : s.quiz >= 60 ? "text-amber-400" : "text-red-400"}`}>
                          {s.quiz}%
                        </span>
                      ) : <span className="text-slate-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{s.joined}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {s.status === "Pending" ? (
                          <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-400 font-medium">
                            <Layers className="w-3 h-3" /> Assign
                          </button>
                        ) : (
                          <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10">
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-5 py-3.5 border-t border-slate-800 flex items-center justify-between">
              <p className="text-slate-500 text-sm">Showing 7 of 248 students</p>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, "...", 35].map((p, i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${
                    p === 1 ? "bg-amber-500 text-white font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
