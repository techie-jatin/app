import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/admin" />} />

      {/* Admin */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/students" component={StudentManagement} />
      <Route path="/admin/students/detail" component={AdminStudentDetail} />
      <Route path="/admin/batches" component={BatchCourseManagement} />
      <Route path="/admin/batches/create" component={AdminBatchCreate} />
      <Route path="/admin/courses" component={AdminCourseBuilder} />
      <Route path="/admin/live" component={AdminLiveClass} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/announcements" component={AdminAnnouncements} />
      <Route path="/admin/faculty" component={AdminFaculty} />
      <Route path="/admin/assignments" component={AdminAssignmentReview} />
      <Route path="/admin/assignments/create" component={AdminAssignmentCreator} />
      <Route path="/admin/quiz/results" component={AdminQuizResults} />
      <Route path="/admin/quiz/builder" component={AdminQuizBuilder} />
      <Route path="/admin/notifications" component={AdminNotificationCenter} />
      <Route path="/admin/certificates" component={AdminCertificateManagement} />
      <Route path="/admin/attendance" component={AdminAttendanceDetail} />

      {/* Faculty */}
      <Route path="/faculty" component={FacultyLogin} />
      <Route path="/faculty/dashboard" component={FacultyDashboard} />
      <Route path="/faculty/upload" component={FacultyUploadLecture} />
      <Route path="/faculty/quiz" component={FacultyCreateQuiz} />
      <Route path="/faculty/assignment" component={FacultyCreateAssignment} />
      <Route path="/faculty/live" component={FacultyScheduleLive} />
      <Route path="/faculty/attendance" component={FacultyAttendance} />
      <Route path="/faculty/progress" component={FacultyStudentProgress} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={base}>
      <Router />
    </WouterRouter>
  );
}
