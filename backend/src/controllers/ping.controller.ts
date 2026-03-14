import { Request, Response } from 'express';

export const handlePing = (_req: Request, res: Response): void => {
  res.json({ message: 'pong', color: 'pink' });
};
