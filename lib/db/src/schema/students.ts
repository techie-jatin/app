import { pgTable, text, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const studentsTable = pgTable("students", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().default(""),
  batchId: text("batch_id"),
  status: text("status").notNull().default("Pending"),
  avatar: text("avatar").notNull().default(""),
  joinDate: text("join_date").notNull(),
  progress: integer("progress").notNull().default(0),
  attendance: real("attendance").notNull().default(0),
  avgScore: real("avg_score").notNull().default(0),
  totalQuizzes: integer("total_quizzes").notNull().default(0),
  address: text("address").notNull().default(""),
  parentName: text("parent_name").notNull().default(""),
  parentPhone: text("parent_phone").notNull().default(""),
});

export const insertStudentSchema = createInsertSchema(studentsTable).omit({ id: true });
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof studentsTable.$inferSelect;
