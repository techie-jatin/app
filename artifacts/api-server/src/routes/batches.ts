import { Router } from "express";
import { db } from "@workspace/db";
import { batchesTable, studentsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

async function withStudentIds(rows: (typeof batchesTable.$inferSelect)[]) {
  const students = await db.select({ id: studentsTable.id, batchId: studentsTable.batchId }).from(studentsTable);
  return rows.map(b => ({
    ...b,
    studentIds: students.filter(s => s.batchId === b.id).map(s => s.id),
  }));
}

router.get("/batches", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(batchesTable).orderBy(batchesTable.name);
    res.json(await withStudentIds(rows));
  } catch { res.status(500).json({ error: "Failed to fetch batches" }); }
});

router.get("/batches/:id", requireAuth, async (req, res) => {
  try {
    const [row] = await db.select().from(batchesTable).where(eq(batchesTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Batch not found" }); return; }
    res.json((await withStudentIds([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to fetch batch" }); }
});

router.post("/batches", requireAuth, async (req, res) => {
  try {
    const { studentIds: _s, ...rest } = req.body;
    const id = uid();
    await db.insert(batchesTable).values({ id, ...rest });
    const [row] = await db.select().from(batchesTable).where(eq(batchesTable.id, id));
    res.status(201).json((await withStudentIds([row]))[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create batch" });
  }
});

router.put("/batches/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds: _s, ...rest } = req.body;
    await db.update(batchesTable).set(rest).where(eq(batchesTable.id, id));
    const [row] = await db.select().from(batchesTable).where(eq(batchesTable.id, id));
    if (!row) { res.status(404).json({ error: "Batch not found" }); return; }
    res.json((await withStudentIds([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to update batch" }); }
});

router.delete("/batches/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(batchesTable).where(eq(batchesTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete batch" }); }
});

export default router;
