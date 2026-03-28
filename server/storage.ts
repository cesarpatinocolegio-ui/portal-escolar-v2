import { type User, type Task, type Exam, type Announcement, type Note, type Schedule } from "../shared/schema";

let users: User[] = [
  { id: 1, email: "profesor@colegio.cl", role: "profesor", name: "Profesor Demo" },
  { id: 2, email: "alumno@colegio.cl", role: "alumno", name: "Alumno Demo" },
];

let tasks: Task[] = [
  { id: 1, title: "Tarea de Matemáticas", description: "Ejercicios pág. 45-50", dueDate: "2025-04-10", professorId: 1 },
];

let exams: Exam[] = [
  { id: 1, title: "Prueba de Historia", examDate: "2025-04-15", professorId: 1 },
];

let announcements: Announcement[] = [
  { id: 1, title: "Bienvenidos al Portal Escolar", content: "Este es el sistema de gestión escolar.", authorId: 1 },
];

let notes: Note[] = [];
let scheduleItems: Schedule[] = [
  { id: 1, day: "Lunes", time: "08:00", subject: "Matemáticas" },
  { id: 2, day: "Lunes", time: "09:00", subject: "Lenguaje" },
  { id: 3, day: "Martes", time: "08:00", subject: "Historia" },
];

let nextId = { users: 3, tasks: 2, exams: 2, announcements: 2, notes: 1, schedule: 4 };

export const storage = {
  getUsers: () => users,
  getUserByEmail: (email: string) => users.find(u => u.email === email),
  createUser: (data: Omit<User, "id">): User => {
    const user = { ...data, id: nextId.users++ };
    users.push(user);
    return user;
  },
  getTasks: () => tasks,
  createTask: (data: Omit<Task, "id">): Task => {
    const task = { ...data, id: nextId.tasks++ };
    tasks.push(task);
    return task;
  },
  getExams: () => exams,
  createExam: (data: Omit<Exam, "id">): Exam => {
    const exam = { ...data, id: nextId.exams++ };
    exams.push(exam);
    return exam;
  },
  getAnnouncements: () => announcements,
  createAnnouncement: (data: Omit<Announcement, "id">): Announcement => {
    const ann = { ...data, id: nextId.announcements++ };
    announcements.push(ann);
    return ann;
  },
  getNotes: () => notes,
  createNote: (data: Omit<Note, "id">): Note => {
    const note = { ...data, id: nextId.notes++ };
    notes.push(note);
    return note;
  },
  getSchedule: () => scheduleItems,
  createSchedule: (data: Omit<Schedule, "id">): Schedule => {
    const item = { ...data, id: nextId.schedule++ };
    scheduleItems.push(item);
    return item;
  },
};
