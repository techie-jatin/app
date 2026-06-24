import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type {
  Student, Batch, Faculty, Course, Assignment, Quiz, LiveClass,
  Notification, Certificate, AttendanceRecord
} from "./types";

const SEED_STUDENTS: Student[] = [
  { id: "s1", name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 9876543210", batchId: "b1", status: "Active", avatar: "RS", joinDate: "2024-01-15", progress: 78, attendance: 88, avgScore: 74, totalQuizzes: 8, address: "Andheri West, Mumbai", parentName: "Suresh Sharma", parentPhone: "+91 9876500001" },
  { id: "s2", name: "Priya Mehta", email: "priya@email.com", phone: "+91 9876543211", batchId: null, status: "Pending", avatar: "PM", joinDate: "2024-06-01", progress: 0, attendance: 0, avgScore: 0, totalQuizzes: 0, address: "Bandra, Mumbai", parentName: "Rakesh Mehta", parentPhone: "+91 9876500002" },
  { id: "s3", name: "Arjun Kapoor", email: "arjun@email.com", phone: "+91 9876543212", batchId: "b2", status: "Active", avatar: "AK", joinDate: "2024-02-10", progress: 65, attendance: 82, avgScore: 68, totalQuizzes: 7, address: "Powai, Mumbai", parentName: "Deepak Kapoor", parentPhone: "+91 9876500003" },
  { id: "s4", name: "Sneha Joshi", email: "sneha@email.com", phone: "+91 9876543213", batchId: null, status: "Pending", avatar: "SJ", joinDate: "2024-06-05", progress: 0, attendance: 0, avgScore: 0, totalQuizzes: 0, address: "Dadar, Mumbai", parentName: "Anil Joshi", parentPhone: "+91 9876500004" },
  { id: "s5", name: "Vikram Patel", email: "vikram@email.com", phone: "+91 9876543214", batchId: "b3", status: "Active", avatar: "VP", joinDate: "2024-03-01", progress: 91, attendance: 95, avgScore: 88, totalQuizzes: 9, address: "Thane, Mumbai", parentName: "Kiran Patel", parentPhone: "+91 9876500005" },
  { id: "s6", name: "Anjali Singh", email: "anjali@email.com", phone: "+91 9876543215", batchId: "b1", status: "Active", avatar: "AS", joinDate: "2024-01-20", progress: 82, attendance: 90, avgScore: 79, totalQuizzes: 8, address: "Vile Parle, Mumbai", parentName: "Ramesh Singh", parentPhone: "+91 9876500006" },
  { id: "s7", name: "Karan Malhotra", email: "karan@email.com", phone: "+91 9876543216", batchId: "b2", status: "Active", avatar: "KM", joinDate: "2024-02-15", progress: 54, attendance: 72, avgScore: 55, totalQuizzes: 6, address: "Borivali, Mumbai", parentName: "Arun Malhotra", parentPhone: "+91 9876500007" },
  { id: "s8", name: "Divya Nair", email: "divya@email.com", phone: "+91 9876543217", batchId: "b3", status: "Active", avatar: "DN", joinDate: "2024-03-05", progress: 73, attendance: 85, avgScore: 71, totalQuizzes: 8, address: "Goregaon, Mumbai", parentName: "Suresh Nair", parentPhone: "+91 9876500008" },
  { id: "s9", name: "Rohan Desai", email: "rohan@email.com", phone: "+91 9876543218", batchId: "b1", status: "Inactive", avatar: "RD", joinDate: "2023-10-01", progress: 30, attendance: 45, avgScore: 42, totalQuizzes: 4, address: "Chembur, Mumbai", parentName: "Vijay Desai", parentPhone: "+91 9876500009" },
  { id: "s10", name: "Pooja Agarwal", email: "pooja@email.com", phone: "+91 9876543219", batchId: "b2", status: "Active", avatar: "PA", joinDate: "2024-02-20", progress: 88, attendance: 92, avgScore: 85, totalQuizzes: 9, address: "Juhu, Mumbai", parentName: "Manoj Agarwal", parentPhone: "+91 9876500010" },
  { id: "s11", name: "Siddharth Rao", email: "siddharth@email.com", phone: "+91 9876543220", batchId: "b3", status: "Active", avatar: "SR", joinDate: "2024-03-10", progress: 60, attendance: 78, avgScore: 62, totalQuizzes: 7, address: "Malad, Mumbai", parentName: "Hari Rao", parentPhone: "+91 9876500011" },
  { id: "s12", name: "Nisha Verma", email: "nisha@email.com", phone: "+91 9876543221", batchId: null, status: "Pending", avatar: "NV", joinDate: "2024-06-10", progress: 0, attendance: 0, avgScore: 0, totalQuizzes: 0, address: "Kandivali, Mumbai", parentName: "Sunil Verma", parentPhone: "+91 9876500012" },
];

const SEED_FACULTY: Faculty[] = [
  { id: "f1", name: "Dr. Anand Kumar", email: "anand@tradecoach.in", phone: "+91 9800000001", specialization: "Technical Analysis & Options", batchIds: ["b1", "b3"], status: "Active", avatar: "AK", joinDate: "2023-06-01", totalStudents: 66, rating: 4.8 },
  { id: "f2", name: "Prof. Priya Gupta", email: "priya.g@tradecoach.in", phone: "+91 9800000002", specialization: "Risk Management & Futures", batchIds: ["b2"], status: "Active", avatar: "PG", joinDate: "2023-08-15", totalStudents: 33, rating: 4.6 },
  { id: "f3", name: "Rahul Saxena", email: "saxena@tradecoach.in", phone: "+91 9800000003", specialization: "Fundamental Analysis", batchIds: [], status: "Active", avatar: "RS", joinDate: "2024-01-10", totalStudents: 0, rating: 4.5 },
  { id: "f4", name: "Dr. Meena Pillai", email: "meena@tradecoach.in", phone: "+91 9800000004", specialization: "Algorithmic Trading", batchIds: [], status: "Inactive", avatar: "MP", joinDate: "2023-09-01", totalStudents: 0, rating: 4.3 },
];

const SEED_BATCHES: Batch[] = [
  { id: "b1", name: "Advanced Trading A", courseId: "c1", facultyId: "f1", startDate: "2024-01-10", endDate: "2024-07-10", status: "Active", studentIds: ["s1", "s6", "s9"], schedule: "Mon/Wed/Fri 6:00 PM", description: "Advanced options and technical analysis.", maxStudents: 30 },
  { id: "b2", name: "Fundamentals B", courseId: "c2", facultyId: "f2", startDate: "2024-02-01", endDate: "2024-08-01", status: "Active", studentIds: ["s3", "s7", "s10"], schedule: "Tue/Thu 5:30 PM", description: "Risk management and futures fundamentals.", maxStudents: 25 },
  { id: "b3", name: "Options Trading C", courseId: "c3", facultyId: "f1", startDate: "2024-03-01", endDate: "2024-09-01", status: "Active", studentIds: ["s5", "s8", "s11"], schedule: "Sat/Sun 7:00 PM", description: "Complete options trading strategies.", maxStudents: 20 },
  { id: "b4", name: "Algo Trading D", courseId: "c4", facultyId: "f3", startDate: "2024-08-01", endDate: "2025-02-01", status: "Upcoming", studentIds: [], schedule: "Mon/Wed 7:30 PM", description: "Algorithmic trading and automation.", maxStudents: 20 },
];

const SEED_COURSES: Course[] = [
  { id: "c1", name: "Advanced Options & Technical Analysis", description: "Master options chain analysis, Greeks, and technical setups.", modules: 12, duration: "6 months", level: "Advanced", batchIds: ["b1"] },
  { id: "c2", name: "Risk Management & Futures", description: "Position sizing, risk-reward ratios, futures contracts.", modules: 10, duration: "6 months", level: "Intermediate", batchIds: ["b2"] },
  { id: "c3", name: "Options Trading Complete", description: "End-to-end options trading from basics to advanced strategies.", modules: 14, duration: "6 months", level: "Beginner-Advanced", batchIds: ["b3"] },
  { id: "c4", name: "Algorithmic Trading & Python", description: "Build automated trading systems with Python.", modules: 16, duration: "6 months", level: "Advanced", batchIds: ["b4"] },
];

const SEED_ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Options Chain Analysis Report", description: "Analyse the Nifty options chain for the upcoming expiry.", batchId: "b1", facultyId: "f1", dueDate: "2024-06-25", totalMarks: 100, status: "open", createdAt: "2024-06-15", submissions: [
    { studentId: "s1", submittedAt: "2024-06-22", marks: 82, status: "graded", remarks: "Good analysis of PCR data." },
    { studentId: "s6", submittedAt: "2024-06-23", marks: 76, status: "graded", remarks: "Needs more detail on OI buildup." },
    { studentId: "s9", submittedAt: null, marks: null, status: "pending", remarks: "" },
  ]},
  { id: "a2", title: "Risk-Reward Calculation Exercise", description: "Calculate position size and risk-reward for 5 trade setups.", batchId: "b2", facultyId: "f2", dueDate: "2024-06-28", totalMarks: 50, status: "open", createdAt: "2024-06-18", submissions: [
    { studentId: "s3", submittedAt: "2024-06-25", marks: 44, status: "graded", remarks: "Excellent work." },
    { studentId: "s7", submittedAt: "2024-06-26", marks: null, status: "submitted", remarks: "" },
    { studentId: "s10", submittedAt: "2024-06-25", marks: 48, status: "graded", remarks: "Perfect calculations." },
  ]},
  { id: "a3", title: "Straddle vs Strangle Comparison", description: "Compare straddle and strangle strategies on 3 stocks.", batchId: "b3", facultyId: "f1", dueDate: "2024-06-30", totalMarks: 75, status: "open", createdAt: "2024-06-20", submissions: [] },
];

const SEED_QUIZZES: Quiz[] = [
  { id: "q1", title: "Options Greeks Quiz", batchId: "b1", facultyId: "f1", totalMarks: 20, duration: 20, status: "published", dueDate: "2024-06-26", createdAt: "2024-06-15",
    questions: [
      { id: "qq1", question: "Which Greek measures rate of change of option price w.r.t underlying?", marks: 4, options: [{ id: "o1", text: "Theta", isCorrect: false }, { id: "o2", text: "Delta", isCorrect: true }, { id: "o3", text: "Vega", isCorrect: false }, { id: "o4", text: "Rho", isCorrect: false }] },
      { id: "qq2", question: "A call option with Delta = 0.6 means:", marks: 4, options: [{ id: "o5", text: "Expires in 60 days", isCorrect: false }, { id: "o6", text: "Price moves ₹0.60 per ₹1 underlying move", isCorrect: true }, { id: "o7", text: "60% chance of ITM", isCorrect: false }, { id: "o8", text: "IV is 60%", isCorrect: false }] },
    ],
    submissions: [{ studentId: "s1", score: 16, total: 20, submittedAt: "2024-06-20", answers: {} }]
  },
  { id: "q2", title: "Risk Management Basics", batchId: "b2", facultyId: "f2", totalMarks: 15, duration: 15, status: "published", dueDate: "2024-06-29", createdAt: "2024-06-18",
    questions: [
      { id: "qq6", question: "Maximum recommended risk per trade for retail traders?", marks: 5, options: [{ id: "o21", text: "10%", isCorrect: false }, { id: "o22", text: "1-2%", isCorrect: true }, { id: "o23", text: "20%", isCorrect: false }, { id: "o24", text: "5%", isCorrect: false }] },
    ],
    submissions: [{ studentId: "s3", score: 15, total: 15, submittedAt: "2024-06-22", answers: {} }]
  },
];

const SEED_LIVE_CLASSES: LiveClass[] = [
  { id: "lc1", title: "Options Chain Analysis — Live Session", batchId: "b1", facultyId: "f1", scheduledAt: "2024-06-24T18:00:00", duration: 90, status: "live", meetLink: "https://meet.google.com/abc-defg-hij", description: "Live analysis of Nifty options chain.", recordingUrl: null },
  { id: "lc2", title: "Risk Management Fundamentals", batchId: "b2", facultyId: "f2", scheduledAt: "2024-06-25T17:30:00", duration: 60, status: "scheduled", meetLink: "https://meet.google.com/klm-nopq-rst", description: "Position sizing and stop-loss strategies.", recordingUrl: null },
  { id: "lc3", title: "Technical Analysis Deep Dive", batchId: "b3", facultyId: "f1", scheduledAt: "2024-06-25T19:00:00", duration: 90, status: "scheduled", meetLink: "https://meet.google.com/uvw-xyz-123", description: "Chart patterns and trading setups.", recordingUrl: null },
  { id: "lc4", title: "Iron Condor Strategy Workshop", batchId: "b1", facultyId: "f1", scheduledAt: "2024-06-20T18:00:00", duration: 120, status: "ended", meetLink: "https://meet.google.com/abc-123-xyz", description: "Complete iron condor setup.", recordingUrl: "https://drive.google.com/rec/1" },
];

const SEED_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Exam Schedule Update", message: "The Options Greeks Quiz has been rescheduled to June 26.", targetBatch: "b1", sentAt: "2024-06-20T10:00:00", sentBy: "admin", type: "announcement", readByIds: ["s1"] },
  { id: "n2", title: "Assignment Deadline Reminder", message: "Risk-Reward Exercise is due on June 28. Submit before 11:59 PM.", targetBatch: "b2", sentAt: "2024-06-22T09:00:00", sentBy: "f2", type: "reminder", readByIds: [] },
  { id: "n3", title: "New Batch Starting Soon", message: "Algo Trading Batch D starts August 1. Limited seats available.", targetBatch: "all", sentAt: "2024-06-23T11:00:00", sentBy: "admin", type: "announcement", readByIds: [] },
  { id: "n4", title: "Live Session Tonight at 6 PM", message: "Options Chain Analysis live session starts at 6:00 PM today.", targetBatch: "b1", sentAt: "2024-06-24T08:00:00", sentBy: "f1", type: "reminder", readByIds: [] },
  { id: "n5", title: "Platform Maintenance", message: "The platform will be under maintenance on June 28 from 2-4 AM.", targetBatch: "all", sentAt: "2024-06-24T14:00:00", sentBy: "admin", type: "alert", readByIds: [] },
];

const SEED_CERTIFICATES: Certificate[] = [
  { id: "cert1", studentId: "s5", batchId: "b3", issuedAt: "2024-06-01", status: "issued", certificateNo: "TCA-2024-001" },
  { id: "cert2", studentId: "s10", batchId: "b2", issuedAt: "2024-06-05", status: "issued", certificateNo: "TCA-2024-002" },
  { id: "cert3", studentId: "s1", batchId: "b1", issuedAt: null, status: "pending", certificateNo: "TCA-2024-003" },
  { id: "cert4", studentId: "s6", batchId: "b1", issuedAt: null, status: "pending", certificateNo: "TCA-2024-004" },
  { id: "cert5", studentId: "s3", batchId: "b2", issuedAt: null, status: "pending", certificateNo: "TCA-2024-005" },
];

const SEED_ATTENDANCE: AttendanceRecord[] = [
  { id: "att1", date: "2024-06-20", batchId: "b1", records: { s1: true, s6: true, s9: false }, markedBy: "f1" },
  { id: "att2", date: "2024-06-20", batchId: "b2", records: { s3: true, s7: false, s10: true }, markedBy: "f2" },
  { id: "att3", date: "2024-06-22", batchId: "b1", records: { s1: true, s6: false, s9: false }, markedBy: "f1" },
  { id: "att4", date: "2024-06-22", batchId: "b3", records: { s5: true, s8: true, s11: true }, markedBy: "f1" },
];

interface AppContextValue {
  students: Student[];
  batches: Batch[];
  faculty: Faculty[];
  courses: Course[];
  assignments: Assignment[];
  quizzes: Quiz[];
  liveClasses: LiveClass[];
  notifications: Notification[];
  certificates: Certificate[];
  attendance: AttendanceRecord[];

  addStudent: (s: Omit<Student, "id">) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  assignBatch: (studentId: string, batchId: string) => void;

  addBatch: (b: Omit<Batch, "id">) => void;
  updateBatch: (id: string, updates: Partial<Batch>) => void;
  deleteBatch: (id: string) => void;

  addFaculty: (f: Omit<Faculty, "id">) => void;
  updateFaculty: (id: string, updates: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;

  addCourse: (c: Omit<Course, "id">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  addAssignment: (a: Omit<Assignment, "id" | "submissions" | "createdAt">) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  gradeSubmission: (assignmentId: string, studentId: string, marks: number, remarks: string) => void;

  addQuiz: (q: Omit<Quiz, "id" | "submissions" | "createdAt" | "totalMarks">) => void;
  updateQuizStatus: (id: string, status: Quiz["status"]) => void;

  addLiveClass: (lc: Omit<LiveClass, "id" | "recordingUrl">) => void;
  updateLiveClass: (id: string, updates: Partial<LiveClass>) => void;
  deleteLiveClass: (id: string) => void;

  sendNotification: (n: Omit<Notification, "id" | "readByIds">) => void;

  issueCertificate: (certId: string) => void;
  addCertificate: (c: Omit<Certificate, "id" | "issuedAt">) => void;

  markAttendance: (date: string, batchId: string, records: Record<string, boolean>, markedBy: string) => void;
  getAttendance: (batchId: string, date: string) => AttendanceRecord | undefined;

  getBatchStudents: (batchId: string) => Student[];
  getStudentBatch: (studentId: string) => Batch | undefined;
  getFacultyBatches: (facultyId: string) => Batch[];
}

const AppContext = createContext<AppContextValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(() => load("tc_students", SEED_STUDENTS));
  const [batches, setBatches] = useState<Batch[]>(() => load("tc_batches", SEED_BATCHES));
  const [faculty, setFaculty] = useState<Faculty[]>(() => load("tc_faculty", SEED_FACULTY));
  const [courses, setCourses] = useState<Course[]>(() => load("tc_courses", SEED_COURSES));
  const [assignments, setAssignments] = useState<Assignment[]>(() => load("tc_assignments", SEED_ASSIGNMENTS));
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => load("tc_quizzes", SEED_QUIZZES));
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(() => load("tc_live", SEED_LIVE_CLASSES));
  const [notifications, setNotifications] = useState<Notification[]>(() => load("tc_notifs", SEED_NOTIFICATIONS));
  const [certificates, setCertificates] = useState<Certificate[]>(() => load("tc_certs", SEED_CERTIFICATES));
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => load("tc_attendance", SEED_ATTENDANCE));

  useEffect(() => { save("tc_students", students); }, [students]);
  useEffect(() => { save("tc_batches", batches); }, [batches]);
  useEffect(() => { save("tc_faculty", faculty); }, [faculty]);
  useEffect(() => { save("tc_courses", courses); }, [courses]);
  useEffect(() => { save("tc_assignments", assignments); }, [assignments]);
  useEffect(() => { save("tc_quizzes", quizzes); }, [quizzes]);
  useEffect(() => { save("tc_live", liveClasses); }, [liveClasses]);
  useEffect(() => { save("tc_notifs", notifications); }, [notifications]);
  useEffect(() => { save("tc_certs", certificates); }, [certificates]);
  useEffect(() => { save("tc_attendance", attendance); }, [attendance]);

  const uid = () => Math.random().toString(36).slice(2, 10);

  const addStudent = (s: Omit<Student, "id">) => setStudents(p => [...p, { ...s, id: uid() }]);
  const updateStudent = (id: string, u: Partial<Student>) => setStudents(p => p.map(s => s.id === id ? { ...s, ...u } : s));
  const deleteStudent = (id: string) => setStudents(p => p.filter(s => s.id !== id));
  const assignBatch = (studentId: string, batchId: string) => {
    updateStudent(studentId, { batchId, status: "Active" });
    setBatches(p => p.map(b => b.id === batchId ? { ...b, studentIds: [...new Set([...b.studentIds, studentId])] } : b));
  };

  const addBatch = (b: Omit<Batch, "id">) => setBatches(p => [...p, { ...b, id: uid() }]);
  const updateBatch = (id: string, u: Partial<Batch>) => setBatches(p => p.map(b => b.id === id ? { ...b, ...u } : b));
  const deleteBatch = (id: string) => setBatches(p => p.filter(b => b.id !== id));

  const addFaculty = (f: Omit<Faculty, "id">) => setFaculty(p => [...p, { ...f, id: uid() }]);
  const updateFaculty = (id: string, u: Partial<Faculty>) => setFaculty(p => p.map(f => f.id === id ? { ...f, ...u } : f));
  const deleteFaculty = (id: string) => setFaculty(p => p.filter(f => f.id !== id));

  const addCourse = (c: Omit<Course, "id">) => setCourses(p => [...p, { ...c, id: uid() }]);
  const updateCourse = (id: string, u: Partial<Course>) => setCourses(p => p.map(c => c.id === id ? { ...c, ...u } : c));
  const deleteCourse = (id: string) => setCourses(p => p.filter(c => c.id !== id));

  const addAssignment = (a: Omit<Assignment, "id" | "submissions" | "createdAt">) =>
    setAssignments(p => [...p, { ...a, id: uid(), submissions: [], createdAt: new Date().toISOString().split("T")[0] }]);
  const updateAssignment = (id: string, u: Partial<Assignment>) => setAssignments(p => p.map(a => a.id === id ? { ...a, ...u } : a));
  const gradeSubmission = (assignmentId: string, studentId: string, marks: number, remarks: string) =>
    setAssignments(p => p.map(a => a.id === assignmentId ? { ...a, submissions: a.submissions.map(s => s.studentId === studentId ? { ...s, marks, remarks, status: "graded" as const } : s) } : a));

  const addQuiz = (q: Omit<Quiz, "id" | "submissions" | "createdAt" | "totalMarks">) =>
    setQuizzes(p => [...p, { ...q, id: uid(), submissions: [], createdAt: new Date().toISOString().split("T")[0], totalMarks: (q.questions || []).reduce((sum, qu) => sum + qu.marks, 0) }]);
  const updateQuizStatus = (id: string, status: Quiz["status"]) =>
    setQuizzes(p => p.map(q => q.id === id ? { ...q, status } : q));

  const addLiveClass = (lc: Omit<LiveClass, "id" | "recordingUrl">) =>
    setLiveClasses(p => [...p, { ...lc, id: uid(), recordingUrl: null }]);
  const updateLiveClass = (id: string, u: Partial<LiveClass>) =>
    setLiveClasses(p => p.map(lc => lc.id === id ? { ...lc, ...u } : lc));
  const deleteLiveClass = (id: string) => setLiveClasses(p => p.filter(lc => lc.id !== id));

  const sendNotification = (n: Omit<Notification, "id" | "readByIds">) =>
    setNotifications(p => [{ ...n, id: uid(), readByIds: [], sentAt: new Date().toISOString() }, ...p]);

  const issueCertificate = (certId: string) =>
    setCertificates(p => p.map(c => c.id === certId ? { ...c, status: "issued" as const, issuedAt: new Date().toISOString().split("T")[0] } : c));
  const addCertificate = (c: Omit<Certificate, "id" | "issuedAt">) =>
    setCertificates(p => [...p, { ...c, id: uid(), issuedAt: new Date().toISOString().split("T")[0] }]);

  const markAttendance = (date: string, batchId: string, records: Record<string, boolean>, markedBy: string) => {
    setAttendance(p => {
      const existing = p.findIndex(a => a.date === date && a.batchId === batchId);
      if (existing >= 0) {
        const updated = [...p];
        updated[existing] = { ...updated[existing], records, markedBy };
        return updated;
      }
      return [...p, { id: uid(), date, batchId, records, markedBy }];
    });
  };
  const getAttendance = (batchId: string, date: string) => attendance.find(a => a.batchId === batchId && a.date === date);

  const getBatchStudents = (batchId: string) => students.filter(s => s.batchId === batchId);
  const getStudentBatch = (studentId: string) => {
    const s = students.find(st => st.id === studentId);
    return s?.batchId ? batches.find(b => b.id === s.batchId) : undefined;
  };
  const getFacultyBatches = (facultyId: string) => batches.filter(b => b.facultyId === facultyId);

  return (
    <AppContext.Provider value={{
      students, batches, faculty, courses, assignments, quizzes, liveClasses,
      notifications, certificates, attendance,
      addStudent, updateStudent, deleteStudent, assignBatch,
      addBatch, updateBatch, deleteBatch,
      addFaculty, updateFaculty, deleteFaculty,
      addCourse, updateCourse, deleteCourse,
      addAssignment, updateAssignment, gradeSubmission,
      addQuiz, updateQuizStatus,
      addLiveClass, updateLiveClass, deleteLiveClass,
      sendNotification,
      issueCertificate, addCertificate,
      markAttendance, getAttendance,
      getBatchStudents, getStudentBatch, getFacultyBatches,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
