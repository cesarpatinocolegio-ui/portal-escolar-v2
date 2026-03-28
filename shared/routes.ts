import { z } from "zod";
import { insertUserSchema, insertTaskSchema, insertExamSchema, insertAnnouncementSchema, insertNoteSchema, insertScheduleSchema, users, tasks, exams, announcements, notes, schedule } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  users: {
    list: {
      method: "GET" as const,
      path: "/api/users" as const,
      responses: { 200: z.array(z.custom<typeof users.$inferSelect>()) },
    },
    login: {
      method: "POST" as const,
      path: "/api/login" as const,
      input: z.object({ email: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  },
  tasks: {
    list: { method: "GET" as const, path: "/api/tasks" as const, responses: { 200: z.array(z.custom<typeof tasks.$inferSelect>()) } },
    create: { method: "POST" as const, path: "/api/tasks" as const, input: insertTaskSchema, responses: { 201: z.custom<typeof tasks.$inferSelect>() } }
  },
  exams: {
    list: { method: "GET" as const, path: "/api/exams" as const, responses: { 200: z.array(z.custom<typeof exams.$inferSelect>()) } },
    create: { method: "POST" as const, path: "/api/exams" as const, input: insertExamSchema, responses: { 201: z.custom<typeof exams.$inferSelect>() } }
  },
  announcements: {
    list: { method: "GET" as const, path: "/api/announcements" as const, responses: { 200: z.array(z.custom<typeof announcements.$inferSelect>()) } },
    create: { method: "POST" as const, path: "/api/announcements" as const, input: insertAnnouncementSchema, responses: { 201: z.custom<typeof announcements.$inferSelect>() } }
  },
  notes: {
    list: { method: "GET" as const, path: "/api/notes" as const, responses: { 200: z.array(z.custom<typeof notes.$inferSelect>()) } },
    create: { method: "POST" as const, path: "/api/notes" as const, input: insertNoteSchema, responses: { 201: z.custom<typeof notes.$inferSelect>() } }
  },
  schedule: {
    list: { method: "GET" as const, path: "/api/schedule" as const, responses: { 200: z.array(z.custom<typeof schedule.$inferSelect>()) } },
    create: { method: "POST" as const, path: "/api/schedule" as const, input: insertScheduleSchema, responses: { 201: z.custom<typeof schedule.$inferSelect>() } }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
