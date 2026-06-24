import { pgTable, text, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const facultyTable = pgTable("faculty", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().default(""),
  specialization: text("specialization").notNull().default(""),
  status: text("status").notNull().default("Active"),
  avatar: text("avatar").notNull().default(""),
  joinDate: text("join_date").notNull(),
  totalStudents: integer("total_students").notNull().default(0),
  rating: real("rating").notNull().default(0),
});

export const insertFacultySchema = createInsertSchema(facultyTable).omit({ id: true });
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Faculty = typeof facultyTable.$inferSelect;
