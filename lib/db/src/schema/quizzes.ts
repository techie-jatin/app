import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const quizzesTable = pgTable("quizzes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  batchId: text("batch_id").notNull(),
  facultyId: text("faculty_id").notNull(),
  totalMarks: integer("total_marks").notNull().default(0),
  duration: integer("duration").notNull().default(30),
  status: text("status").notNull().default("draft"),
  dueDate: text("due_date"),
  createdAt: text("created_at").notNull(),
});

export const quizQuestionsTable = pgTable("quiz_questions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull(),
  question: text("question").notNull(),
  marks: integer("marks").notNull().default(1),
});

export const quizOptionsTable = pgTable("quiz_options", {
  id: text("id").primaryKey(),
  questionId: text("question_id").notNull(),
  text: text("text").notNull(),
  isCorrect: boolean("is_correct").notNull().default(false),
});

export const quizSubmissionsTable = pgTable("quiz_submissions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull(),
  studentId: text("student_id").notNull(),
  score: integer("score").notNull().default(0),
  total: integer("total").notNull().default(0),
  submittedAt: text("submitted_at").notNull(),
});

export const insertQuizSchema = createInsertSchema(quizzesTable).omit({ id: true });
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzesTable.$inferSelect;
export type QuizQuestion = typeof quizQuestionsTable.$inferSelect;
export type QuizOption = typeof quizOptionsTable.$inferSelect;
export type QuizSubmission = typeof quizSubmissionsTable.$inferSelect;
