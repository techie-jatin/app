import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const liveClassesTable = pgTable("live_classes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  batchId: text("batch_id").notNull(),
  facultyId: text("faculty_id").notNull(),
  scheduledAt: text("scheduled_at").notNull(),
  duration: integer("duration").notNull().default(60),
  status: text("status").notNull().default("scheduled"),
  meetLink: text("meet_link").notNull(),
  description: text("description").notNull().default(""),
  recordingUrl: text("recording_url"),
});

export const insertLiveClassSchema = createInsertSchema(liveClassesTable).omit({ id: true });
export type InsertLiveClass = z.infer<typeof insertLiveClassSchema>;
export type LiveClass = typeof liveClassesTable.$inferSelect;
