import { Router } from "express";
import { db } from "@workspace/db";
import { coursesTable, batchesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

async function withBatchIds(rows: (typeof coursesTable.$inferSelect)[]) {
  const batches = await db.select({ id: batchesTable.id, courseId: batchesTable.courseId }).from(batchesTable);
  return rows.map(c => ({
    ...c,
    batchIds: batches.filter(b => b.courseId === c.id).map(b => b.id),
  }));
}

router.get("/courses", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(coursesTable).orderBy(coursesTable.name);
    res.json(await withBatchIds(rows));
  } catch { res.status(500).json({ error: "Failed to fetch courses" }); }
});

router.post("/courses", requireAuth, async (req, res) => {
  try {
    const { batchIds: _b, ...rest } = req.body;
    const id = uid();
    await db.insert(coursesTable).values({ id, ...rest });
    const [row] = await db.select().from(coursesTable).where(eq(coursesTable.id, id));
    res.status(201).json((await withBatchIds([row]))[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create course" });
  }
});

router.put("/courses/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { batchIds: _b, ...rest } = req.body;
    await db.update(coursesTable).set(rest).where(eq(coursesTable.id, id));
    const [row] = await db.select().from(coursesTable).where(eq(coursesTable.id, id));
    if (!row) { res.status(404).json({ error: "Course not found" }); return; }
    res.json((await withBatchIds([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to update course" }); }
});

router.delete("/courses/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(coursesTable).where(eq(coursesTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete course" }); }
});

export default router;
