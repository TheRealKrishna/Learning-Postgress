import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';

dotenv.config();
import db from './db/client';

const createApp = (): Application => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/ping', pingRouter);

  app.get('/', (_req: Request, res: Response) => {
    res.send({ message: 'Postgresql Backend up' });
  });

  return app;
};

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const app = createApp();

const startServer = async (): Promise<void> => {
  try {
    const result = await db.query('SELECT NOW()');
    // eslint-disable-next-line no-console
    console.log('Postgres connected:', result.rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Postgres connection error:', err instanceof Error ? err.message : err);
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
