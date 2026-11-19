//
// UniEats — Express Application Setup
//

import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./utils/prisma";
import { env } from "./utils/env";
import chatRouter from "./routes/chat";

// Create Express app
export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Health check endpoint with database connection verification
  app.get("/health", async (req: Request, res: Response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        campus: "LPU (Lovely Professional University)",
      });
    } catch (error) {
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Root welcome endpoint
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      name: "UniEats API",
      version: "1.0.0",
      description: "Your campus food companion backend (LPU MVP)",
      endpoints: {
        health: "/health",
        chat: "/api/chat",
      },
    });
  });

  // Chat API endpoint — mounted at /api/chat
  // The router receives `env` via its internal init, but we also pass it through app.locals
  app.use("/api/chat", (req: Request, res: Response, next) => {
    // Pass env to the chat router's internal state
    ;(req as any).app.locals.env = env;
    next();
  }, chatRouter);

  return app;
}