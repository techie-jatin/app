export type StudentStatus = "Active" | "Pending" | "Inactive" | "Suspended";
export type BatchStatus = "Active" | "Upcoming" | "Completed" | "Paused";
export type FacultyStatus = "Active" | "Inactive";
export type AssignmentStatus = "open" | "closed" | "graded";
export type SubmissionStatus = "submitted" | "graded" | "late" | "pending";
export type LiveClassStatus = "scheduled" | "live" | "ended" | "cancelled";
export type NotifTarget = "all" | string;
export type CertStatus = "pending" | "issued" | "revoked";
export type UserRole = "admin" | "faculty";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  batchId: string | null;
  status: StudentStatus;
  avatar: string;
  joinDate: string;
  progress: number;
  attendance: number;
  avgScore: number;
  totalQuizzes: number;
  address: string;
  parentName: string;
  parentPhone: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  facultyId: string;
  startDate: string;
  endDate: string;
  status: BatchStatus;
  studentIds: string[];
  schedule: string;
  description: string;
  maxStudents: number;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  batchIds: string[];
  status: FacultyStatus;
  avatar: string;
  joinDate: string;
  totalStudents: number;
  rating: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  modules: number;
  duration: string;
  level: string;
  batchIds: string[];
}

export interface Submission {
  studentId: string;
  submittedAt: string | null;
  marks: number | null;
  status: SubmissionStatus;
  remarks: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  batchId: string;
  facultyId: string;
  dueDate: string;
  totalMarks: number;
  status: AssignmentStatus;
  submissions: Submission[];
  createdAt: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  marks: number;
}

export interface QuizSubmission {
  studentId: string;
  score: number;
  total: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export interface Quiz {
  id: string;
  title: string;
  batchId: string;
  facultyId: string;
  questions: QuizQuestion[];
  totalMarks: number;
  duration: number;
  status: "draft" | "published" | "closed";
  dueDate: string;
  submissions: QuizSubmission[];
  createdAt: string;
}

export interface LiveClass {
  id: string;
  title: string;
  batchId: string;
  facultyId: string;
  scheduledAt: string;
  duration: number;
  status: LiveClassStatus;
  meetLink: string;
  description: string;
  recordingUrl: string | null;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  targetBatch: NotifTarget;
  sentAt: string;
  sentBy: string;
  type: "announcement" | "reminder" | "alert" | "update";
  readByIds: string[];
}

export interface Certificate {
  id: string;
  studentId: string;
  batchId: string;
  issuedAt: string | null;
  status: CertStatus;
  certificateNo: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  batchId: string;
  records: Record<string, boolean>;
  markedBy: string;
}

export interface Lecture {
  id: string;
  title: string;
  batchId: string;
  facultyId: string;
  moduleTitle: string;
  youtubeUrl: string;
  description: string;
  duration: string;
  status: "draft" | "published";
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}
