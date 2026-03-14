import { Request, Response, NextFunction } from 'express';
import { error as logError } from '../utils/logger';

// Express error-handling middleware
const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err as any);
  }

  // Log full error for diagnostics (stack when available)
  if (err instanceof Error) {
    logError(err.message, err.stack);
  } else {
    logError('Unknown error', err);
  }

  // Send only a generic message to clients
  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
