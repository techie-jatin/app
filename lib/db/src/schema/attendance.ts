import { pgTable, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const attendanceRecordsTable = pgTable("attendance_records", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  batchId: text("batch_id").notNull(),
  markedBy: text("marked_by").notNull(),
});

export const attendanceEntriesTable = pgTable("attendance_entries", {
  recordId: text("record_id").notNull(),
  studentId: text("student_id").notNull(),
  present: boolean("present").notNull().default(false),
});

export const insertAttendanceRecordSchema = createInsertSchema(attendanceRecordsTable).omit({ id: true });
export type InsertAttendanceRecord = z.infer<typeof insertAttendanceRecordSchema>;
export type AttendanceRecord = typeof attendanceRecordsTable.$inferSelect;
export type AttendanceEntry = typeof attendanceEntriesTable.$inferSelect;
