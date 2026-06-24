import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const certificatesTable = pgTable("certificates", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  batchId: text("batch_id").notNull(),
  issuedAt: text("issued_at"),
  status: text("status").notNull().default("pending"),
  certificateNo: text("certificate_no").notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificatesTable).omit({ id: true });
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificatesTable.$inferSelect;
