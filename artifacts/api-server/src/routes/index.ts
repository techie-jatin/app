import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import studentsRouter from "./students.js";
import facultyRouter from "./faculty.js";
import batchesRouter from "./batches.js";
import coursesRouter from "./courses.js";
import assignmentsRouter from "./assignments.js";
import quizzesRouter from "./quizzes.js";
import liveClassesRouter from "./live-classes.js";
import notificationsRouter from "./notifications.js";
import certificatesRouter from "./certificates.js";
import attendanceRouter from "./attendance.js";
import lecturesRouter from "./lectures.js";
import seedRouter from "./seed.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(studentsRouter);
router.use(facultyRouter);
router.use(batchesRouter);
router.use(coursesRouter);
router.use(assignmentsRouter);
router.use(quizzesRouter);
router.use(liveClassesRouter);
router.use(notificationsRouter);
router.use(certificatesRouter);
router.use(attendanceRouter);
router.use(lecturesRouter);
router.use(seedRouter);

export default router;
