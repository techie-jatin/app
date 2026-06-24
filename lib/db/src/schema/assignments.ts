import { pgTable, text, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const assignmentsTable = pgTable("assignments", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  batchId: text("batch_id").notNull(),
  facultyId: text("faculty_id").notNull(),
  dueDate: text("due_date").notNull(),
  totalMarks: integer("total_marks").notNull().default(100),
  status: text("status").notNull().default("open"),
  createdAt: text("created_at").notNull(),
});

export const assignmentSubmissionsTable = pgTable("assignment_submissions", {
  id: text("id").primaryKey(),
  assignmentId: text("assignment_id").notNull(),
  studentId: text("student_id").notNull(),
  submittedAt: text("submitted_at"),
  marks: real("marks"),
  status: text("status").notNull().default("pending"),
  remarks: text("remarks").notNull().default(""),
});

export const insertAssignmentSchema = createInsertSchema(assignmentsTable).omit({ id: true });
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Assignment = typeof assignmentsTable.$inferSelect;
export type AssignmentSubmission = typeof assignmentSubmissionsTable.$inferSelect;
