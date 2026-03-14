import dotenv from 'dotenv';
import createApp from './app';
import db from './db/prisma';
import ensureTables from './db/init';
import { info, error } from './utils/logger';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const startServer = async (): Promise<void> => {
  // perform early startup tasks (DB migrations, checks)
  try {
    await ensureTables();
    const now = await db.$queryRaw`SELECT NOW()`;
    info('Database connected', now as unknown);
  } catch (err) {
    error('Database connection error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const app = createApp();
  const server = app.listen(PORT, () => {
    info(`Server listening on http://localhost:${PORT}`);
  });

  const shutdown = async (signal: string) => {
    info('Received shutdown signal', signal);
    server.close(async (closeErr) => {
      if (closeErr) {
        error('Error closing server:', closeErr);
      }
      try {
        await db.$disconnect();
        info('DB disconnected');
      } catch (e) {
        error('Error disconnecting DB:', e instanceof Error ? e.message : e);
      }
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer().catch((err) => {
  error('Failed to start server:', err instanceof Error ? err.message : err);
  process.exit(1);
});

export default startServer;
