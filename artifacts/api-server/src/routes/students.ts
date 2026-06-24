import { Router } from "express";
import { db } from "@workspace/db";
import { studentsTable, batchesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/students", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(studentsTable).orderBy(studentsTable.name);
    res.json(rows);
  } catch { res.status(500).json({ error: "Failed to fetch students" }); }
});

router.get("/students/:id", requireAuth, async (req, res) => {
  try {
    const [row] = await db.select().from(studentsTable).where(eq(studentsTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Student not found" }); return; }
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to fetch student" }); }
});

router.post("/students", requireAuth, async (req, res) => {
  try {
    const id = uid();
    await db.insert(studentsTable).values({ id, ...req.body });
    const [row] = await db.select().from(studentsTable).where(eq(studentsTable.id, id));
    res.status(201).json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create student" });
  }
});

router.put("/students/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.update(studentsTable).set(req.body).where(eq(studentsTable.id, id));
    const [row] = await db.select().from(studentsTable).where(eq(studentsTable.id, id));
    if (!row) { res.status(404).json({ error: "Student not found" }); return; }
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to update student" }); }
});

router.delete("/students/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(studentsTable).where(eq(studentsTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete student" }); }
});

router.post("/students/:id/assign-batch", requireAuth, async (req, res) => {
  try {
    const { batchId } = req.body as { batchId: string };
    const { id } = req.params;
    await db.update(studentsTable).set({ batchId, status: "Active" }).where(eq(studentsTable.id, id));
    const [row] = await db.select().from(studentsTable).where(eq(studentsTable.id, id));
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to assign batch" }); }
});

export default router;
