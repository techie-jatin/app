import { Router } from "express";
import { db } from "@workspace/db";
import { liveClassesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/live-classes", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(liveClassesTable).orderBy(liveClassesTable.scheduledAt);
    res.json(rows);
  } catch { res.status(500).json({ error: "Failed to fetch live classes" }); }
});

router.post("/live-classes", requireAuth, async (req, res) => {
  try {
    const { recordingUrl: _r, ...rest } = req.body;
    const id = uid();
    await db.insert(liveClassesTable).values({ id, recordingUrl: null, ...rest });
    const [row] = await db.select().from(liveClassesTable).where(eq(liveClassesTable.id, id));
    res.status(201).json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create live class" });
  }
});

router.put("/live-classes/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.update(liveClassesTable).set(req.body).where(eq(liveClassesTable.id, id));
    const [row] = await db.select().from(liveClassesTable).where(eq(liveClassesTable.id, id));
    if (!row) { res.status(404).json({ error: "Live class not found" }); return; }
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to update live class" }); }
});

router.delete("/live-classes/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(liveClassesTable).where(eq(liveClassesTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete live class" }); }
});

export default router;
