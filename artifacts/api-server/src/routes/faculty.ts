import { Router } from "express";
import { db } from "@workspace/db";
import { facultyTable, batchesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

async function withBatchIds(rows: (typeof facultyTable.$inferSelect)[]) {
  const batches = await db.select({ id: batchesTable.id, facultyId: batchesTable.facultyId }).from(batchesTable);
  return rows.map(f => ({
    ...f,
    batchIds: batches.filter(b => b.facultyId === f.id).map(b => b.id),
  }));
}

router.get("/faculty", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(facultyTable).orderBy(facultyTable.name);
    res.json(await withBatchIds(rows));
  } catch { res.status(500).json({ error: "Failed to fetch faculty" }); }
});

router.get("/faculty/:id", requireAuth, async (req, res) => {
  try {
    const [row] = await db.select().from(facultyTable).where(eq(facultyTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Faculty not found" }); return; }
    res.json((await withBatchIds([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to fetch faculty" }); }
});

router.post("/faculty", requireAuth, async (req, res) => {
  try {
    const id = uid();
    await db.insert(facultyTable).values({ id, ...req.body });
    const [row] = await db.select().from(facultyTable).where(eq(facultyTable.id, id));
    res.status(201).json({ ...(await withBatchIds([row]))[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create faculty" });
  }
});

router.put("/faculty/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { batchIds: _b, ...rest } = req.body;
    await db.update(facultyTable).set(rest).where(eq(facultyTable.id, id));
    const [row] = await db.select().from(facultyTable).where(eq(facultyTable.id, id));
    if (!row) { res.status(404).json({ error: "Faculty not found" }); return; }
    res.json((await withBatchIds([row]))[0]);
  } catch { res.status(500).json({ error: "Failed to update faculty" }); }
});

router.delete("/faculty/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(facultyTable).where(eq(facultyTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete faculty" }); }
});

export default router;
