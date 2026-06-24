import { Router } from "express";
import { db } from "@workspace/db";
import { quizzesTable, quizQuestionsTable, quizOptionsTable, quizSubmissionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

async function buildQuizzes(rows: (typeof quizzesTable.$inferSelect)[]) {
  const questions = await db.select().from(quizQuestionsTable);
  const options = await db.select().from(quizOptionsTable);
  const submissions = await db.select().from(quizSubmissionsTable);
  return rows.map(q => ({
    ...q,
    questions: questions
      .filter(qu => qu.quizId === q.id)
      .map(qu => ({
        id: qu.id,
        question: qu.question,
        marks: qu.marks,
        options: options.filter(o => o.questionId === qu.id).map(o => ({
          id: o.id, text: o.text, isCorrect: o.isCorrect,
        })),
      })),
    submissions: submissions
      .filter(s => s.quizId === q.id)
      .map(s => ({ studentId: s.studentId, score: s.score, total: s.total, submittedAt: s.submittedAt, answers: {} })),
  }));
}

router.get("/quizzes", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(quizzesTable).orderBy(quizzesTable.createdAt);
    res.json(await buildQuizzes(rows));
  } catch { res.status(500).json({ error: "Failed to fetch quizzes" }); }
});

router.get("/quizzes/:id", requireAuth, async (req, res) => {
  try {
    const [row] = await db.select().from(quizzesTable).where(eq(quizzesTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Quiz not found" }); return; }
    res.json((await buildQuizzes([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to fetch quiz" }); }
});

router.post("/quizzes", requireAuth, async (req, res) => {
  try {
    const { questions = [], submissions: _s, totalMarks: _tm, ...rest } = req.body;
    const id = uid();
    const createdAt = new Date().toISOString().split("T")[0];
    const totalMarks = questions.reduce((acc: number, q: any) => acc + (q.marks || 0), 0);
    await db.insert(quizzesTable).values({ id, createdAt, totalMarks, ...rest });
    for (const q of questions) {
      const qId = uid();
      await db.insert(quizQuestionsTable).values({ id: qId, quizId: id, question: q.question, marks: q.marks || 1 });
      for (const o of (q.options || [])) {
        await db.insert(quizOptionsTable).values({ id: uid(), questionId: qId, text: o.text, isCorrect: !!o.isCorrect });
      }
    }
    const [row] = await db.select().from(quizzesTable).where(eq(quizzesTable.id, id));
    res.status(201).json((await buildQuizzes([row]))[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create quiz" });
  }
});

router.patch("/quizzes/:id/status", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: string };
    await db.update(quizzesTable).set({ status }).where(eq(quizzesTable.id, id));
    const [row] = await db.select().from(quizzesTable).where(eq(quizzesTable.id, id));
    res.json((await buildQuizzes([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to update quiz status" }); }
});

router.delete("/quizzes/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.quizId, id));
    for (const q of qs) {
      await db.delete(quizOptionsTable).where(eq(quizOptionsTable.questionId, q.id));
    }
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.quizId, id));
    await db.delete(quizSubmissionsTable).where(eq(quizSubmissionsTable.quizId, id));
    await db.delete(quizzesTable).where(eq(quizzesTable.id, id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete quiz" }); }
});

export default router;
