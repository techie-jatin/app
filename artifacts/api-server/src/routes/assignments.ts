import { Router } from "express";
import { db } from "@workspace/db";
import { assignmentsTable, assignmentSubmissionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

async function withSubmissions(rows: (typeof assignmentsTable.$inferSelect)[]) {
  const subs = await db.select().from(assignmentSubmissionsTable);
  return rows.map(a => ({
    ...a,
    submissions: subs
      .filter(s => s.assignmentId === a.id)
      .map(s => ({
        studentId: s.studentId,
        submittedAt: s.submittedAt,
        marks: s.marks,
        status: s.status,
        remarks: s.remarks,
      })),
  }));
}

router.get("/assignments", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(assignmentsTable).orderBy(assignmentsTable.createdAt);
    res.json(await withSubmissions(rows));
  } catch { res.status(500).json({ error: "Failed to fetch assignments" }); }
});

router.get("/assignments/:id", requireAuth, async (req, res) => {
  try {
    const [row] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Assignment not found" }); return; }
    res.json((await withSubmissions([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to fetch assignment" }); }
});

router.post("/assignments", requireAuth, async (req, res) => {
  try {
    const { submissions: _s, ...rest } = req.body;
    const id = uid();
    const createdAt = new Date().toISOString().split("T")[0];
    await db.insert(assignmentsTable).values({ id, createdAt, ...rest });
    const [row] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, id));
    res.status(201).json({ ...row, submissions: [] });
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create assignment" });
  }
});

router.put("/assignments/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { submissions: _s, ...rest } = req.body;
    await db.update(assignmentsTable).set(rest).where(eq(assignmentsTable.id, id));
    const [row] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, id));
    if (!row) { res.status(404).json({ error: "Assignment not found" }); return; }
    res.json((await withSubmissions([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to update assignment" }); }
});

router.post("/assignments/:id/grade", requireAuth, async (req, res) => {
  try {
    const { assignmentId } = { assignmentId: req.params.id };
    const { studentId, marks, remarks } = req.body as { studentId: string; marks: number; remarks: string };
    const existing = await db.select().from(assignmentSubmissionsTable)
      .where(eq(assignmentSubmissionsTable.assignmentId, assignmentId));
    const sub = existing.find(s => s.studentId === studentId);
    if (sub) {
      await db.update(assignmentSubmissionsTable)
        .set({ marks, remarks, status: "graded" })
        .where(eq(assignmentSubmissionsTable.id, sub.id));
    } else {
      await db.insert(assignmentSubmissionsTable).values({
        id: uid(), assignmentId, studentId, marks, remarks, status: "graded",
        submittedAt: new Date().toISOString().split("T")[0],
      });
    }
    const [row] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, assignmentId));
    res.json((await withSubmissions([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to grade submission" }); }
});

export default router;
