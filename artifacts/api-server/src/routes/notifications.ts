import { Router } from "express";
import { db } from "@workspace/db";
import { notificationsTable, notificationReadsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/notifications", requireAuth, async (_req, res) => {
  try {
    const rows = await db.select().from(notificationsTable).orderBy(notificationsTable.sentAt);
    const reads = await db.select().from(notificationReadsTable);
    const result = rows.map(n => ({
      ...n,
      readByIds: reads.filter(r => r.notificationId === n.id).map(r => r.studentId),
    })).reverse();
    res.json(result);
  } catch { res.status(500).json({ error: "Failed to fetch notifications" }); }
});

router.post("/notifications", requireAuth, async (req, res) => {
  try {
    const id = uid();
    const sentAt = new Date().toISOString();
    const { readByIds: _r, ...rest } = req.body;
    await db.insert(notificationsTable).values({ id, sentAt, ...rest });
    const [row] = await db.select().from(notificationsTable).where(eq(notificationsTable.id, id));
    res.status(201).json({ ...row, readByIds: [] });
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to send notification" });
  }
});

export default router;
