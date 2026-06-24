import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const batchesTable = pgTable("batches", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  courseId: text("course_id"),
  facultyId: text("faculty_id"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: text("status").notNull().default("Active"),
  schedule: text("schedule").notNull().default(""),
  description: text("description").notNull().default(""),
  maxStudents: integer("max_students").notNull().default(30),
});

export const insertBatchSchema = createInsertSchema(batchesTable).omit({ id: true });
export type InsertBatch = z.infer<typeof insertBatchSchema>;
export type Batch = typeof batchesTable.$inferSelect;
