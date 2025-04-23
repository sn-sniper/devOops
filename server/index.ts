import express from "express";
import http from "http";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Starting in development mode...");
      await setupVite(app, server);
    } else {
      log("Starting in production mode...");
      serveStatic(app);
    }

    server.listen(PORT, () => {
      log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
})();
