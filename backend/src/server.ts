// ============================================================
// UniEats — Server Entry Point
// ============================================================

import { createApp } from "./app";
import { env } from "./utils/env";
import { prisma } from "./utils/prisma";

const app = createApp();
const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 UniEats backend running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.log(`\n⚠️ Received ${signal}. Closing server and database connections...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("👋 Server closed successfully.");
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));