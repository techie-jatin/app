import { Switch, Route, Router as WouterRouter } from "wouter";

import { Onboarding } from "@/screens/Onboarding";
import { LoginScreen } from "@/screens/LoginScreen";
import { OTPVerification } from "@/screens/OTPVerification";
import { RegistrationScreen } from "@/screens/RegistrationScreen";
import { ForgotPassword } from "@/screens/ForgotPassword";
import { ResetPassword } from "@/screens/ResetPassword";
import { GoogleSignIn } from "@/screens/GoogleSignIn";
import { StudentHome } from "@/screens/StudentHome";
import { PendingAssignment } from "@/screens/PendingAssignment";
import { CourseDetail } from "@/screens/CourseDetail";
import { CoursePlayer } from "@/screens/CoursePlayer";
import { AssignmentSubmission } from "@/screens/AssignmentSubmission";
import { QuizFlow } from "@/screens/QuizFlow";
import { QuizResultsDetail } from "@/screens/QuizResultsDetail";
import { AttendanceView } from "@/screens/AttendanceView";
import { LiveClass } from "@/screens/LiveClass";
import { WaitingRoom } from "@/screens/WaitingRoom";
import { Schedule } from "@/screens/Schedule";
import { Notifications } from "@/screens/Notifications";
import { StudentProfile } from "@/screens/StudentProfile";
import { ProgressAnalytics } from "@/screens/ProgressAnalytics";
import { NotesDownloads } from "@/screens/NotesDownloads";
import { NotesPdfViewer } from "@/screens/NotesPdfViewer";
import { AppSettings } from "@/screens/AppSettings";
import { Certificate } from "@/screens/Certificate";
import { Leaderboard } from "@/screens/Leaderboard";
import { AccountDeletion } from "@/screens/AccountDeletion";
import { PrivacyPolicy } from "@/screens/PrivacyPolicy";

import { AdminLogin } from "@/screens/AdminLogin";
import { AdminDashboard } from "@/screens/AdminDashboard";
import { StudentManagement } from "@/screens/StudentManagement";
import { AdminStudentDetail } from "@/screens/AdminStudentDetail";
import { BatchCourseManagement } from "@/screens/BatchCourseManagement";
import { AdminBatchCreate } from "@/screens/AdminBatchCreate";
import { AdminReports } from "@/screens/AdminReports";
import { AdminAnnouncements } from "@/screens/AdminAnnouncements";
import { AdminFaculty } from "@/screens/AdminFaculty";
import { AdminCourseBuilder } from "@/screens/AdminCourseBuilder";
import { AdminLiveClass } from "@/screens/AdminLiveClass";
import { AdminAssignmentReview } from "@/screens/AdminAssignmentReview";
import { AdminAssignmentCreator } from "@/screens/AdminAssignmentCreator";
import { AdminQuizResults } from "@/screens/AdminQuizResults";
import { AdminQuizBuilder } from "@/screens/AdminQuizBuilder";
import { AdminNotificationCenter } from "@/screens/AdminNotificationCenter";
import { AdminCertificateManagement } from "@/screens/AdminCertificateManagement";
import { AdminAttendanceDetail } from "@/screens/AdminAttendanceDetail";

import { FacultyLogin } from "@/screens/FacultyLogin";
import { FacultyDashboard } from "@/screens/FacultyDashboard";
import { FacultyUploadLecture } from "@/screens/FacultyUploadLecture";
import { FacultyCreateQuiz } from "@/screens/FacultyCreateQuiz";
import { FacultyCreateAssignment } from "@/screens/FacultyCreateAssignment";
import { FacultyScheduleLive } from "@/screens/FacultyScheduleLive";
import { FacultyAttendance } from "@/screens/FacultyAttendance";
import { FacultyStudentProgress } from "@/screens/FacultyStudentProgress";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        width: 390,
        height: 844,
        borderRadius: 44,
        overflow: "hidden",
        boxShadow: "0 0 0 10px #1e293b, 0 0 0 12px #334155, 0 40px 100px rgba(0,0,0,0.9)",
        position: "relative",
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}

function WebFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      overflowX: "auto",
    }}>
      <div style={{
        width: 1280,
        height: 800,
        overflow: "hidden",
        boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
        borderRadius: 12,
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Student App — 28 screens */}
      <Route path="/" component={() => <PhoneFrame><Onboarding /></PhoneFrame>} />
      <Route path="/login" component={() => <PhoneFrame><LoginScreen /></PhoneFrame>} />
      <Route path="/otp" component={() => <PhoneFrame><OTPVerification /></PhoneFrame>} />
      <Route path="/register" component={() => <PhoneFrame><RegistrationScreen /></PhoneFrame>} />
      <Route path="/forgot-password" component={() => <PhoneFrame><ForgotPassword /></PhoneFrame>} />
      <Route path="/reset-password" component={() => <PhoneFrame><ResetPassword /></PhoneFrame>} />
      <Route path="/google-signin" component={() => <PhoneFrame><GoogleSignIn /></PhoneFrame>} />
      <Route path="/home" component={() => <PhoneFrame><StudentHome /></PhoneFrame>} />
      <Route path="/pending" component={() => <PhoneFrame><PendingAssignment /></PhoneFrame>} />
      <Route path="/course" component={() => <PhoneFrame><CourseDetail /></PhoneFrame>} />
      <Route path="/course/player" component={() => <PhoneFrame><CoursePlayer /></PhoneFrame>} />
      <Route path="/assignment" component={() => <PhoneFrame><AssignmentSubmission /></PhoneFrame>} />
      <Route path="/quiz" component={() => <PhoneFrame><QuizFlow /></PhoneFrame>} />
      <Route path="/quiz/results" component={() => <PhoneFrame><QuizResultsDetail /></PhoneFrame>} />
      <Route path="/attendance" component={() => <PhoneFrame><AttendanceView /></PhoneFrame>} />
      <Route path="/live" component={() => <PhoneFrame><LiveClass /></PhoneFrame>} />
      <Route path="/live/waiting" component={() => <PhoneFrame><WaitingRoom /></PhoneFrame>} />
      <Route path="/schedule" component={() => <PhoneFrame><Schedule /></PhoneFrame>} />
      <Route path="/notifications" component={() => <PhoneFrame><Notifications /></PhoneFrame>} />
      <Route path="/profile" component={() => <PhoneFrame><StudentProfile /></PhoneFrame>} />
      <Route path="/progress" component={() => <PhoneFrame><ProgressAnalytics /></PhoneFrame>} />
      <Route path="/notes" component={() => <PhoneFrame><NotesDownloads /></PhoneFrame>} />
      <Route path="/notes/viewer" component={() => <PhoneFrame><NotesPdfViewer /></PhoneFrame>} />
      <Route path="/settings" component={() => <PhoneFrame><AppSettings /></PhoneFrame>} />
      <Route path="/certificate" component={() => <PhoneFrame><Certificate /></PhoneFrame>} />
      <Route path="/leaderboard" component={() => <PhoneFrame><Leaderboard /></PhoneFrame>} />
      <Route path="/account-deletion" component={() => <PhoneFrame><AccountDeletion /></PhoneFrame>} />
      <Route path="/privacy" component={() => <PhoneFrame><PrivacyPolicy /></PhoneFrame>} />

      {/* Admin Panel — 18 screens */}
      <Route path="/admin" component={() => <WebFrame><AdminLogin /></WebFrame>} />
      <Route path="/admin/dashboard" component={() => <WebFrame><AdminDashboard /></WebFrame>} />
      <Route path="/admin/students" component={() => <WebFrame><StudentManagement /></WebFrame>} />
      <Route path="/admin/students/detail" component={() => <WebFrame><AdminStudentDetail /></WebFrame>} />
      <Route path="/admin/batches" component={() => <WebFrame><BatchCourseManagement /></WebFrame>} />
      <Route path="/admin/batches/create" component={() => <WebFrame><AdminBatchCreate /></WebFrame>} />
      <Route path="/admin/reports" component={() => <WebFrame><AdminReports /></WebFrame>} />
      <Route path="/admin/announcements" component={() => <WebFrame><AdminAnnouncements /></WebFrame>} />
      <Route path="/admin/faculty" component={() => <WebFrame><AdminFaculty /></WebFrame>} />
      <Route path="/admin/courses" component={() => <WebFrame><AdminCourseBuilder /></WebFrame>} />
      <Route path="/admin/live" component={() => <WebFrame><AdminLiveClass /></WebFrame>} />
      <Route path="/admin/assignments" component={() => <WebFrame><AdminAssignmentReview /></WebFrame>} />
      <Route path="/admin/assignments/create" component={() => <WebFrame><AdminAssignmentCreator /></WebFrame>} />
      <Route path="/admin/quiz/results" component={() => <WebFrame><AdminQuizResults /></WebFrame>} />
      <Route path="/admin/quiz/builder" component={() => <WebFrame><AdminQuizBuilder /></WebFrame>} />
      <Route path="/admin/notifications" component={() => <WebFrame><AdminNotificationCenter /></WebFrame>} />
      <Route path="/admin/certificates" component={() => <WebFrame><AdminCertificateManagement /></WebFrame>} />
      <Route path="/admin/attendance" component={() => <WebFrame><AdminAttendanceDetail /></WebFrame>} />

      {/* Faculty Portal — 8 screens */}
      <Route path="/faculty" component={() => <WebFrame><FacultyLogin /></WebFrame>} />
      <Route path="/faculty/dashboard" component={() => <WebFrame><FacultyDashboard /></WebFrame>} />
      <Route path="/faculty/upload" component={() => <WebFrame><FacultyUploadLecture /></WebFrame>} />
      <Route path="/faculty/quiz" component={() => <WebFrame><FacultyCreateQuiz /></WebFrame>} />
      <Route path="/faculty/assignment" component={() => <WebFrame><FacultyCreateAssignment /></WebFrame>} />
      <Route path="/faculty/live" component={() => <WebFrame><FacultyScheduleLive /></WebFrame>} />
      <Route path="/faculty/attendance" component={() => <WebFrame><FacultyAttendance /></WebFrame>} />
      <Route path="/faculty/progress" component={() => <WebFrame><FacultyStudentProgress /></WebFrame>} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
