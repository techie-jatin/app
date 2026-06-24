import { Router } from "express";
import { db } from "@workspace/db";
import { attendanceRecordsTable, attendanceEntriesTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/attendance", requireAuth, async (_req, res) => {
  try {
    const records = await db.select().from(attendanceRecordsTable).orderBy(attendanceRecordsTable.date);
    const entries = await db.select().from(attendanceEntriesTable);
    const result = records.map(r => ({
      id: r.id, date: r.date, batchId: r.batchId, markedBy: r.markedBy,
      records: Object.fromEntries(entries.filter(e => e.recordId === r.id).map(e => [e.studentId, e.present])),
    }));
    res.json(result);
  } catch { res.status(500).json({ error: "Failed to fetch attendance" }); }
});

router.get("/attendance/:batchId/:date", requireAuth, async (req, res) => {
  try {
    const { batchId, date } = req.params;
    const [record] = await db.select().from(attendanceRecordsTable)
      .where(and(eq(attendanceRecordsTable.batchId, batchId), eq(attendanceRecordsTable.date, date)));
    if (!record) { res.json(null); return; }
    const entries = await db.select().from(attendanceEntriesTable).where(eq(attendanceEntriesTable.recordId, record.id));
    res.json({
      id: record.id, date: record.date, batchId: record.batchId, markedBy: record.markedBy,
      records: Object.fromEntries(entries.map(e => [e.studentId, e.present])),
    });
  } catch { res.status(500).json({ error: "Failed to fetch attendance" }); }
});

router.post("/attendance", requireAuth, async (req, res) => {
  try {
    const { date, batchId, records, markedBy } = req.body as {
      date: string; batchId: string; records: Record<string, boolean>; markedBy: string;
    };
    const [existing] = await db.select().from(attendanceRecordsTable)
      .where(and(eq(attendanceRecordsTable.batchId, batchId), eq(attendanceRecordsTable.date, date)));
    let recordId: string;
    if (existing) {
      recordId = existing.id;
      await db.update(attendanceRecordsTable).set({ markedBy }).where(eq(attendanceRecordsTable.id, recordId));
      await db.delete(attendanceEntriesTable).where(eq(attendanceEntriesTable.recordId, recordId));
    } else {
      recordId = uid();
      await db.insert(attendanceRecordsTable).values({ id: recordId, date, batchId, markedBy });
    }
    for (const [studentId, present] of Object.entries(records)) {
      await db.insert(attendanceEntriesTable).values({ recordId, studentId, present });
    }
    res.json({ id: recordId, date, batchId, markedBy, records });
  } catch { res.status(500).json({ error: "Failed to mark attendance" }); }
});

export default router;
