import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const notificationsTable = pgTable("notifications", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  targetBatch: text("target_batch").notNull(),
  sentAt: text("sent_at").notNull(),
  sentBy: text("sent_by").notNull(),
  type: text("type").notNull().default("announcement"),
});

export const notificationReadsTable = pgTable("notification_reads", {
  notificationId: text("notification_id").notNull(),
  studentId: text("student_id").notNull(),
});

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
