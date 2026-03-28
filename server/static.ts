import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../dist/public");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
```

Y en `package.json` cambia el build de vuelta a `cjs`:
```
"build": "vite build && esbuild server/index.ts --bundle --platform=node --format=cjs --outfile=dist/index.cjs --external:pg-native --external:pg --external:path --external:fs --external:url",
"start": "NODE_ENV=production node dist/index.cjs",
