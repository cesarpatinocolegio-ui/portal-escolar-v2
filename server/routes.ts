import { type Express } from "express";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  // Users
  app.get("/api/users", (_req, res) => {
    res.json(storage.getUsers());
  });

  app.post("/api/login", (req, res) => {
    const { email } = req.body;
    const user = storage.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  });

  // Tasks
  app.get("/api/tasks", (_req, res) => {
    res.json(storage.getTasks());
  });
  app.post("/api/tasks", (req, res) => {
    const task = storage.createTask(req.body);
    res.status(201).json(task);
  });

  // Exams
  app.get("/api/exams", (_req, res) => {
    res.json(storage.getExams());
  });
  app.post("/api/exams", (req, res) => {
    const exam = storage.createExam(req.body);
    res.status(201).json(exam);
  });

  // Announcements
  app.get("/api/announcements", (_req, res) => {
    res.json(storage.getAnnouncements());
  });
  app.post("/api/announcements", (req, res) => {
    const ann = storage.createAnnouncement(req.body);
    res.status(201).json(ann);
  });

  // Notes
  app.get("/api/notes", (_req, res) => {
    res.json(storage.getNotes());
  });
  app.post("/api/notes", (req, res) => {
    const note = storage.createNote(req.body);
    res.status(201).json(note);
  });

  // Schedule
  app.get("/api/schedule", (_req, res) => {
    res.json(storage.getSchedule());
  });
  app.post("/api/schedule", (req, res) => {
    const item = storage.createSchedule(req.body);
    res.status(201).json(item);
  });
}
