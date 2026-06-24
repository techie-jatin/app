import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coursesTable = pgTable("courses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  modules: integer("modules").notNull().default(0),
  duration: text("duration").notNull().default(""),
  level: text("level").notNull().default(""),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;
