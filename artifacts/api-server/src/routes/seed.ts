import { Router } from "express";
import { db } from "@workspace/db";
import {
  usersTable, studentsTable, facultyTable, batchesTable, coursesTable,
  assignmentsTable, assignmentSubmissionsTable, quizzesTable, quizQuestionsTable,
  quizOptionsTable, quizSubmissionsTable, liveClassesTable, notificationsTable,
  certificatesTable, attendanceRecordsTable, attendanceEntriesTable, lecturesTable,
} from "@workspace/db/schema";
import { hashPassword } from "../lib/auth.js";

const router = Router();

router.post("/seed", async (_req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.status(403).json({ error: "Seed not allowed in production" });
    return;
  }
  try {
    await db.delete(attendanceEntriesTable);
    await db.delete(attendanceRecordsTable);
    await db.delete(notificationsTable);
    await db.delete(certificatesTable);
    await db.delete(quizSubmissionsTable);
    await db.delete(quizOptionsTable);
    await db.delete(quizQuestionsTable);
    await db.delete(quizzesTable);
    await db.delete(assignmentSubmissionsTable);
    await db.delete(assignmentsTable);
    await db.delete(liveClassesTable);
    await db.delete(lecturesTable);
    await db.delete(studentsTable);
    await db.delete(batchesTable);
    await db.delete(facultyTable);
    await db.delete(coursesTable);
    await db.delete(usersTable);

    const pw = hashPassword("Admin@123");
    const fpw = hashPassword("Faculty@123");

    await db.insert(usersTable).values([
      { id: "admin1", email: "admin@tradecoach.in", password: pw, role: "admin", name: "Admin", avatar: "AD", facultyId: null },
      { id: "u-f1", email: "anand@tradecoach.in", password: fpw, role: "faculty", name: "Dr. Anand Kumar", avatar: "AK", facultyId: "f1" },
      { id: "u-f2", email: "priya.g@tradecoach.in", password: fpw, role: "faculty", name: "Prof. Priya Gupta", avatar: "PG", facultyId: "f2" },
      { id: "u-f3", email: "saxena@tradecoach.in", password: fpw, role: "faculty", name: "Rahul Saxena", avatar: "RS", facultyId: "f3" },
    ]);

    await db.insert(facultyTable).values([
      { id: "f1", name: "Dr. Anand Kumar", email: "anand@tradecoach.in", phone: "+91 9800000001", specialization: "Technical Analysis & Options", status: "Active", avatar: "AK", joinDate: "2023-06-01", totalStudents: 66, rating: 4.8 },
      { id: "f2", name: "Prof. Priya Gupta", email: "priya.g@tradecoach.in", phone: "+91 9800000002", specialization: "Risk Management & Futures", status: "Active", avatar: "PG", joinDate: "2023-08-15", totalStudents: 33, rating: 4.6 },
      { id: "f3", name: "Rahul Saxena", email: "saxena@tradecoach.in", phone: "+91 9800000003", specialization: "Fundamental Analysis", status: "Active", avatar: "RS", joinDate: "2024-01-10", totalStudents: 0, rating: 4.5 },
      { id: "f4", name: "Dr. Meena Pillai", email: "meena@tradecoach.in", phone: "+91 9800000004", specialization: "Algorithmic Trading", status: "Inactive", avatar: "MP", joinDate: "2023-09-01", totalStudents: 0, rating: 4.3 },
    ]);

    await db.insert(coursesTable).values([
      { id: "c1", name: "Advanced Options & Technical Analysis", description: "Master options chain analysis, Greeks, and technical setups.", modules: 12, duration: "6 months", level: "Advanced" },
      { id: "c2", name: "Risk Management & Futures", description: "Position sizing, risk-reward ratios, futures contracts.", modules: 10, duration: "6 months", level: "Intermediate" },
      { id: "c3", name: "Options Trading Complete", description: "End-to-end options trading from basics to advanced strategies.", modules: 14, duration: "6 months", level: "Beginner-Advanced" },
      { id: "c4", name: "Algorithmic Trading & Python", description: "Build automated trading systems with Python.", modules: 16, duration: "6 months", level: "Advanced" },
    ]);

    await db.insert(batchesTable).values([
      { id: "b1", name: "Advanced Trading A", courseId: "c1", facultyId: "f1", startDate: "2024-01-10", endDate: "2024-07-10", status: "Active", schedule: "Mon/Wed/Fri 6:00 PM", description: "Advanced options and technical analysis.", maxStudents: 30 },
      { id: "b2", name: "Fundamentals B", courseId: "c2", facultyId: "f2", startDate: "2024-02-01", endDate: "2024-08-01", status: "Active", schedule: "Tue/Thu 5:30 PM", description: "Risk management and futures fundamentals.", maxStudents: 25 },
      { id: "b3", name: "Options Trading C", courseId: "c3", facultyId: "f1", startDate: "2024-03-01", endDate: "2024-09-01", status: "Active", schedule: "Sat/Sun 7:00 PM", description: "Complete options trading strategies.", maxStudents: 20 },
      { id: "b4", name: "Algo Trading D", courseId: "c4", facultyId: "f3", startDate: "2024-08-01", endDate: "2025-02-01", status: "Upcoming", schedule: "Mon/Wed 7:30 PM", description: "Algorithmic trading and automation.", maxStudents: 20 },
    ]);

    await db.insert(studentsTable).values([
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
    ]);

    await db.insert(assignmentsTable).values([
      { id: "a1", title: "Options Chain Analysis Report", description: "Analyse the Nifty options chain for the upcoming expiry.", batchId: "b1", facultyId: "f1", dueDate: "2024-06-25", totalMarks: 100, status: "open", createdAt: "2024-06-15" },
      { id: "a2", title: "Risk-Reward Calculation Exercise", description: "Calculate position size and risk-reward for 5 trade setups.", batchId: "b2", facultyId: "f2", dueDate: "2024-06-28", totalMarks: 50, status: "open", createdAt: "2024-06-18" },
      { id: "a3", title: "Straddle vs Strangle Comparison", description: "Compare straddle and strangle strategies on 3 stocks.", batchId: "b3", facultyId: "f1", dueDate: "2024-06-30", totalMarks: 75, status: "open", createdAt: "2024-06-20" },
    ]);
    await db.insert(assignmentSubmissionsTable).values([
      { id: "as1", assignmentId: "a1", studentId: "s1", submittedAt: "2024-06-22", marks: 82, status: "graded", remarks: "Good analysis of PCR data." },
      { id: "as2", assignmentId: "a1", studentId: "s6", submittedAt: "2024-06-23", marks: 76, status: "graded", remarks: "Needs more detail on OI buildup." },
      { id: "as3", assignmentId: "a1", studentId: "s9", submittedAt: null, marks: null, status: "pending", remarks: "" },
      { id: "as4", assignmentId: "a2", studentId: "s3", submittedAt: "2024-06-25", marks: 44, status: "graded", remarks: "Excellent work." },
      { id: "as5", assignmentId: "a2", studentId: "s7", submittedAt: "2024-06-26", marks: null, status: "submitted", remarks: "" },
      { id: "as6", assignmentId: "a2", studentId: "s10", submittedAt: "2024-06-25", marks: 48, status: "graded", remarks: "Perfect calculations." },
    ]);

    await db.insert(quizzesTable).values([
      { id: "q1", title: "Options Greeks Quiz", batchId: "b1", facultyId: "f1", totalMarks: 20, duration: 20, status: "published", dueDate: "2024-06-26", createdAt: "2024-06-15" },
      { id: "q2", title: "Risk Management Basics", batchId: "b2", facultyId: "f2", totalMarks: 15, duration: 15, status: "published", dueDate: "2024-06-29", createdAt: "2024-06-18" },
    ]);
    await db.insert(quizQuestionsTable).values([
      { id: "qq1", quizId: "q1", question: "Which Greek measures rate of change of option price w.r.t underlying?", marks: 4 },
      { id: "qq2", quizId: "q1", question: "A call option with Delta = 0.6 means:", marks: 4 },
      { id: "qq6", quizId: "q2", question: "Maximum recommended risk per trade for retail traders?", marks: 5 },
    ]);
    await db.insert(quizOptionsTable).values([
      { id: "o1", questionId: "qq1", text: "Theta", isCorrect: false }, { id: "o2", questionId: "qq1", text: "Delta", isCorrect: true },
      { id: "o3", questionId: "qq1", text: "Vega", isCorrect: false }, { id: "o4", questionId: "qq1", text: "Rho", isCorrect: false },
      { id: "o5", questionId: "qq2", text: "Expires in 60 days", isCorrect: false }, { id: "o6", questionId: "qq2", text: "Price moves ₹0.60 per ₹1 underlying move", isCorrect: true },
      { id: "o7", questionId: "qq2", text: "60% chance of ITM", isCorrect: false }, { id: "o8", questionId: "qq2", text: "IV is 60%", isCorrect: false },
      { id: "o21", questionId: "qq6", text: "10%", isCorrect: false }, { id: "o22", questionId: "qq6", text: "1-2%", isCorrect: true },
      { id: "o23", questionId: "qq6", text: "20%", isCorrect: false }, { id: "o24", questionId: "qq6", text: "5%", isCorrect: false },
    ]);
    await db.insert(quizSubmissionsTable).values([
      { id: "qs1", quizId: "q1", studentId: "s1", score: 16, total: 20, submittedAt: "2024-06-20" },
      { id: "qs2", quizId: "q2", studentId: "s3", score: 15, total: 15, submittedAt: "2024-06-22" },
    ]);

    await db.insert(liveClassesTable).values([
      { id: "lc1", title: "Options Chain Analysis — Live Session", batchId: "b1", facultyId: "f1", scheduledAt: "2024-06-24T18:00:00", duration: 90, status: "live", meetLink: "https://meet.google.com/abc-defg-hij", description: "Live analysis of Nifty options chain.", recordingUrl: null },
      { id: "lc2", title: "Risk Management Fundamentals", batchId: "b2", facultyId: "f2", scheduledAt: "2024-06-25T17:30:00", duration: 60, status: "scheduled", meetLink: "https://meet.google.com/klm-nopq-rst", description: "Position sizing and stop-loss strategies.", recordingUrl: null },
      { id: "lc3", title: "Technical Analysis Deep Dive", batchId: "b3", facultyId: "f1", scheduledAt: "2024-06-25T19:00:00", duration: 90, status: "scheduled", meetLink: "https://meet.google.com/uvw-xyz-123", description: "Chart patterns and trading setups.", recordingUrl: null },
      { id: "lc4", title: "Iron Condor Strategy Workshop", batchId: "b1", facultyId: "f1", scheduledAt: "2024-06-20T18:00:00", duration: 120, status: "ended", meetLink: "https://meet.google.com/abc-123-xyz", description: "Complete iron condor setup.", recordingUrl: "https://drive.google.com/rec/1" },
    ]);

    await db.insert(notificationsTable).values([
      { id: "n1", title: "Exam Schedule Update", message: "The Options Greeks Quiz has been rescheduled to June 26.", targetBatch: "b1", sentAt: "2024-06-20T10:00:00", sentBy: "admin", type: "announcement" },
      { id: "n2", title: "Assignment Deadline Reminder", message: "Risk-Reward Exercise is due on June 28.", targetBatch: "b2", sentAt: "2024-06-22T09:00:00", sentBy: "f2", type: "reminder" },
      { id: "n3", title: "New Batch Starting Soon", message: "Algo Trading Batch D starts August 1. Limited seats available.", targetBatch: "all", sentAt: "2024-06-23T11:00:00", sentBy: "admin", type: "announcement" },
    ]);
    await db.insert(notificationReadsTable).values([{ notificationId: "n1", studentId: "s1" }]);

    await db.insert(certificatesTable).values([
      { id: "cert1", studentId: "s5", batchId: "b3", issuedAt: "2024-06-01", status: "issued", certificateNo: "TCA-2024-001" },
      { id: "cert2", studentId: "s10", batchId: "b2", issuedAt: "2024-06-05", status: "issued", certificateNo: "TCA-2024-002" },
      { id: "cert3", studentId: "s1", batchId: "b1", issuedAt: null, status: "pending", certificateNo: "TCA-2024-003" },
      { id: "cert4", studentId: "s6", batchId: "b1", issuedAt: null, status: "pending", certificateNo: "TCA-2024-004" },
      { id: "cert5", studentId: "s3", batchId: "b2", issuedAt: null, status: "pending", certificateNo: "TCA-2024-005" },
    ]);

    await db.insert(attendanceRecordsTable).values([
      { id: "att1", date: "2024-06-20", batchId: "b1", markedBy: "f1" },
      { id: "att2", date: "2024-06-20", batchId: "b2", markedBy: "f2" },
      { id: "att3", date: "2024-06-22", batchId: "b1", markedBy: "f1" },
      { id: "att4", date: "2024-06-22", batchId: "b3", markedBy: "f1" },
    ]);
    await db.insert(attendanceEntriesTable).values([
      { recordId: "att1", studentId: "s1", present: true }, { recordId: "att1", studentId: "s6", present: true }, { recordId: "att1", studentId: "s9", present: false },
      { recordId: "att2", studentId: "s3", present: true }, { recordId: "att2", studentId: "s7", present: false }, { recordId: "att2", studentId: "s10", present: true },
      { recordId: "att3", studentId: "s1", present: true }, { recordId: "att3", studentId: "s6", present: false }, { recordId: "att3", studentId: "s9", present: false },
      { recordId: "att4", studentId: "s5", present: true }, { recordId: "att4", studentId: "s8", present: true }, { recordId: "att4", studentId: "s11", present: true },
    ]);

    await db.insert(lecturesTable).values([
      { id: "l1", title: "Options Chain Analysis — Part 1", batchId: "b1", facultyId: "f1", moduleTitle: "Module 1: Options Basics", youtubeUrl: "https://youtu.be/example1", description: "Introduction to options chain, OI, PCR and key Greeks.", duration: "48 min", status: "published", createdAt: "2024-06-10" },
      { id: "l2", title: "Support & Resistance Mastery", batchId: "b1", facultyId: "f1", moduleTitle: "Module 2: Technical Analysis", youtubeUrl: "https://youtu.be/example2", description: "Identifying key S/R levels on Nifty charts.", duration: "52 min", status: "published", createdAt: "2024-06-12" },
      { id: "l3", title: "Risk Management Fundamentals", batchId: "b2", facultyId: "f2", moduleTitle: "Module 1: Risk Basics", youtubeUrl: "https://youtu.be/example3", description: "Position sizing, stop-loss placement and RR ratios.", duration: "44 min", status: "published", createdAt: "2024-06-11" },
    ]);

    res.json({ ok: true, message: "Database seeded successfully" });
  } catch (err: any) {
    console.error("Seed error:", err);
    res.status(500).json({ error: err.message ?? "Seed failed" });
  }
});

export default router;
