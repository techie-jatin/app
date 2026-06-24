import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { AppProvider } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";

import { AdminLogin } from "./screens/AdminLogin";
import { AdminDashboard } from "./screens/AdminDashboard";
import { StudentManagement } from "./screens/StudentManagement";
import { AdminStudentDetail } from "./screens/AdminStudentDetail";
import { BatchCourseManagement } from "./screens/BatchCourseManagement";
import { AdminBatchCreate } from "./screens/AdminBatchCreate";
import { AdminCourseBuilder } from "./screens/AdminCourseBuilder";
import { AdminLiveClass } from "./screens/AdminLiveClass";
import { AdminReports } from "./screens/AdminReports";
import { AdminAnnouncements } from "./screens/AdminAnnouncements";
import { AdminFaculty } from "./screens/AdminFaculty";
import { AdminAssignmentReview } from "./screens/AdminAssignmentReview";
import { AdminAssignmentCreator } from "./screens/AdminAssignmentCreator";
import { AdminQuizResults } from "./screens/AdminQuizResults";
import { AdminQuizBuilder } from "./screens/AdminQuizBuilder";
import { AdminNotificationCenter } from "./screens/AdminNotificationCenter";
import { AdminCertificateManagement } from "./screens/AdminCertificateManagement";
import { AdminAttendanceDetail } from "./screens/AdminAttendanceDetail";

import { FacultyLogin } from "./screens/FacultyLogin";
import { FacultyDashboard } from "./screens/FacultyDashboard";
import { FacultyUploadLecture } from "./screens/FacultyUploadLecture";
import { FacultyCreateQuiz } from "./screens/FacultyCreateQuiz";
import { FacultyCreateAssignment } from "./screens/FacultyCreateAssignment";
import { FacultyScheduleLive } from "./screens/FacultyScheduleLive";
import { FacultyAttendance } from "./screens/FacultyAttendance";
import { FacultyStudentProgress } from "./screens/FacultyStudentProgress";

import NotFound from "./pages/not-found";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Redirect to="/admin" />;
  return <>{children}</>;
}

function FacultyGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user || user.role !== "faculty") return <Redirect to="/faculty" />;
  return <>{children}</>;
}

function AdminLoginGuard() {
  const { user } = useAuth();
  if (user?.role === "admin") return <Redirect to="/admin/dashboard" />;
  return <AdminLogin />;
}

function FacultyLoginGuard() {
  const { user } = useAuth();
  if (user?.role === "faculty") return <Redirect to="/faculty/dashboard" />;
  return <FacultyLogin />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/admin" />} />

      <Route path="/admin" component={AdminLoginGuard} />
      <Route path="/admin/dashboard" component={() => <AdminGuard><AdminDashboard /></AdminGuard>} />
      <Route path="/admin/students" component={() => <AdminGuard><StudentManagement /></AdminGuard>} />
      <Route path="/admin/students/detail" component={() => <AdminGuard><AdminStudentDetail /></AdminGuard>} />
      <Route path="/admin/batches" component={() => <AdminGuard><BatchCourseManagement /></AdminGuard>} />
      <Route path="/admin/batches/create" component={() => <AdminGuard><AdminBatchCreate /></AdminGuard>} />
      <Route path="/admin/courses" component={() => <AdminGuard><AdminCourseBuilder /></AdminGuard>} />
      <Route path="/admin/live" component={() => <AdminGuard><AdminLiveClass /></AdminGuard>} />
      <Route path="/admin/reports" component={() => <AdminGuard><AdminReports /></AdminGuard>} />
      <Route path="/admin/announcements" component={() => <AdminGuard><AdminAnnouncements /></AdminGuard>} />
      <Route path="/admin/faculty" component={() => <AdminGuard><AdminFaculty /></AdminGuard>} />
      <Route path="/admin/assignments" component={() => <AdminGuard><AdminAssignmentReview /></AdminGuard>} />
      <Route path="/admin/assignments/create" component={() => <AdminGuard><AdminAssignmentCreator /></AdminGuard>} />
      <Route path="/admin/quiz/results" component={() => <AdminGuard><AdminQuizResults /></AdminGuard>} />
      <Route path="/admin/quiz/builder" component={() => <AdminGuard><AdminQuizBuilder /></AdminGuard>} />
      <Route path="/admin/notifications" component={() => <AdminGuard><AdminNotificationCenter /></AdminGuard>} />
      <Route path="/admin/certificates" component={() => <AdminGuard><AdminCertificateManagement /></AdminGuard>} />
      <Route path="/admin/attendance" component={() => <AdminGuard><AdminAttendanceDetail /></AdminGuard>} />

      <Route path="/faculty" component={FacultyLoginGuard} />
      <Route path="/faculty/dashboard" component={() => <FacultyGuard><FacultyDashboard /></FacultyGuard>} />
      <Route path="/faculty/upload" component={() => <FacultyGuard><FacultyUploadLecture /></FacultyGuard>} />
      <Route path="/faculty/quiz" component={() => <FacultyGuard><FacultyCreateQuiz /></FacultyGuard>} />
      <Route path="/faculty/assignment" component={() => <FacultyGuard><FacultyCreateAssignment /></FacultyGuard>} />
      <Route path="/faculty/live" component={() => <FacultyGuard><FacultyScheduleLive /></FacultyGuard>} />
      <Route path="/faculty/attendance" component={() => <FacultyGuard><FacultyAttendance /></FacultyGuard>} />
      <Route path="/faculty/progress" component={() => <FacultyGuard><FacultyStudentProgress /></FacultyGuard>} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          <WouterRouter base={base}>
            <Router />
          </WouterRouter>
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}
