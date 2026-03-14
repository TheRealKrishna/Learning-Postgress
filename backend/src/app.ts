import express, { Application } from 'express';
import cors from 'cors';
import pingRouter from './routes/ping.route';
import authRouter from './routes/auth.route';
import errorHandler from './middleware/error.middleware';

const createApp = (): Application => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/ping', pingRouter);
  app.use('/auth', authRouter);

  app.get('/', (_req, res) => {
    res.send({ message: 'Postgresql Backend up' });
  });

  // Centralized error handler (logs details, returns generic message)
  app.use(errorHandler);

  return app;
};

export default createApp;
