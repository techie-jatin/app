import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lecturesTable = pgTable("lectures", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  batchId: text("batch_id").notNull(),
  facultyId: text("faculty_id").notNull(),
  moduleTitle: text("module_title").notNull().default(""),
  youtubeUrl: text("youtube_url").notNull(),
  description: text("description").notNull().default(""),
  duration: text("duration").notNull().default(""),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull(),
});

export const insertLectureSchema = createInsertSchema(lecturesTable).omit({ id: true });
export type InsertLecture = z.infer<typeof insertLectureSchema>;
export type Lecture = typeof lecturesTable.$inferSelect;
