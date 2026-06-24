import { Router } from "express";
import { db } from "@workspace/db";
import { lecturesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/lectures", requireAuth, async (_req, res) => {
  try {
    res.json(await db.select().from(lecturesTable).orderBy(lecturesTable.createdAt));
  } catch { res.status(500).json({ error: "Failed to fetch lectures" }); }
});

router.post("/lectures", requireAuth, async (req, res) => {
  try {
    const id = uid();
    const createdAt = new Date().toISOString().split("T")[0];
    await db.insert(lecturesTable).values({ id, createdAt, ...req.body });
    const [row] = await db.select().from(lecturesTable).where(eq(lecturesTable.id, id));
    res.status(201).json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create lecture" });
  }
});

router.put("/lectures/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.update(lecturesTable).set(req.body).where(eq(lecturesTable.id, id));
    const [row] = await db.select().from(lecturesTable).where(eq(lecturesTable.id, id));
    if (!row) { res.status(404).json({ error: "Lecture not found" }); return; }
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to update lecture" }); }
});

router.delete("/lectures/:id", requireAuth, async (req, res) => {
  try {
    await db.delete(lecturesTable).where(eq(lecturesTable.id, req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Failed to delete lecture" }); }
});

export default router;
