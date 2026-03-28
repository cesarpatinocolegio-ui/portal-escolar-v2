import express from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
registerRoutes(app);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
}

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portal Escolar corriendo en http://0.0.0.0:${PORT}`);
});
