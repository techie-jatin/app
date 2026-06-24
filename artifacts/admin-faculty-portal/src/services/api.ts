import type {
  Student, Batch, Faculty, Course, Assignment, Quiz,
  LiveClass, Notification, Certificate, AttendanceRecord, Lecture,
} from "../context/types";

const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("tc_token");
}

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface LoginResponse {
  token: string;
  user: { id: string; name: string; email: string; role: string; avatar: string; facultyId?: string | null };
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      req<LoginResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  },

  students: {
    list: () => req<Student[]>("/students"),
    create: (data: Omit<Student, "id">) =>
      req<Student>("/students", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Student>) =>
      req<Student>(`/students/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/students/${id}`, { method: "DELETE" }),
    assignBatch: (id: string, batchId: string) =>
      req<Student>(`/students/${id}/assign-batch`, { method: "POST", body: JSON.stringify({ batchId }) }),
  },

  faculty: {
    list: () => req<Faculty[]>("/faculty"),
    create: (data: Omit<Faculty, "id">) =>
      req<Faculty>("/faculty", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Faculty>) =>
      req<Faculty>(`/faculty/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/faculty/${id}`, { method: "DELETE" }),
  },

  batches: {
    list: () => req<Batch[]>("/batches"),
    create: (data: Omit<Batch, "id">) =>
      req<Batch>("/batches", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Batch>) =>
      req<Batch>(`/batches/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/batches/${id}`, { method: "DELETE" }),
  },

  courses: {
    list: () => req<Course[]>("/courses"),
    create: (data: Omit<Course, "id">) =>
      req<Course>("/courses", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Course>) =>
      req<Course>(`/courses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/courses/${id}`, { method: "DELETE" }),
  },

  assignments: {
    list: () => req<Assignment[]>("/assignments"),
    create: (data: Omit<Assignment, "id" | "submissions" | "createdAt">) =>
      req<Assignment>("/assignments", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Assignment>) =>
      req<Assignment>(`/assignments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    grade: (id: string, studentId: string, marks: number, remarks: string) =>
      req<Assignment>(`/assignments/${id}/grade`, { method: "POST", body: JSON.stringify({ studentId, marks, remarks }) }),
  },

  quizzes: {
    list: () => req<Quiz[]>("/quizzes"),
    create: (data: Omit<Quiz, "id" | "submissions" | "createdAt" | "totalMarks">) =>
      req<Quiz>("/quizzes", { method: "POST", body: JSON.stringify(data) }),
    updateStatus: (id: string, status: Quiz["status"]) =>
      req<Quiz>(`/quizzes/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    delete: (id: string) => req<{ ok: boolean }>(`/quizzes/${id}`, { method: "DELETE" }),
  },

  liveClasses: {
    list: () => req<LiveClass[]>("/live-classes"),
    create: (data: Omit<LiveClass, "id" | "recordingUrl">) =>
      req<LiveClass>("/live-classes", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<LiveClass>) =>
      req<LiveClass>(`/live-classes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/live-classes/${id}`, { method: "DELETE" }),
  },

  notifications: {
    list: () => req<Notification[]>("/notifications"),
    send: (data: Omit<Notification, "id" | "readByIds" | "sentAt">) =>
      req<Notification>("/notifications", { method: "POST", body: JSON.stringify(data) }),
  },

  certificates: {
    list: () => req<Certificate[]>("/certificates"),
    create: (data: Omit<Certificate, "id" | "issuedAt">) =>
      req<Certificate>("/certificates", { method: "POST", body: JSON.stringify(data) }),
    issue: (id: string) => req<Certificate>(`/certificates/${id}/issue`, { method: "POST" }),
  },

  attendance: {
    list: () => req<AttendanceRecord[]>("/attendance"),
    get: (batchId: string, date: string) =>
      req<AttendanceRecord | null>(`/attendance/${batchId}/${date}`),
    mark: (data: { date: string; batchId: string; records: Record<string, boolean>; markedBy: string }) =>
      req<AttendanceRecord>("/attendance", { method: "POST", body: JSON.stringify(data) }),
  },

  lectures: {
    list: () => req<Lecture[]>("/lectures"),
    create: (data: Omit<Lecture, "id" | "createdAt">) =>
      req<Lecture>("/lectures", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Lecture>) =>
      req<Lecture>(`/lectures/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => req<{ ok: boolean }>(`/lectures/${id}`, { method: "DELETE" }),
  },

  seed: () => req<{ ok: boolean; message: string }>("/seed", { method: "POST" }),
};
