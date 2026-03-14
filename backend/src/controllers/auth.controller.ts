import { Request, Response } from 'express';
import prisma from '../db/prisma';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { error as logError } from '../utils/logger';

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = signupSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }

    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    const userRec = await prisma.user.create({
      data: { name, email, password: hash },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    const user = {
      id: userRec.id,
      name: userRec.name,
      email: userRec.email,
      created_at: userRec.createdAt,
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: '1h' });

    return res.status(201).json({ token, user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    logError('Signup error:', err instanceof Error ? err.message : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userRow = found;
    const hash = userRow.password;
    const valid = await argon2.verify(hash, password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const token = jwt.sign({ sub: userRow.id, email: userRow.email }, secret, { expiresIn: '1h' });

    const user = {
      id: userRow.id,
      name: userRow.name,
      email: userRow.email,
      created_at: userRow.createdAt,
    };

    return res.json({ token, user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    logError('Login error:', err instanceof Error ? err.message : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = auth.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = payload.sub;
    const found = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!found) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = {
      id: found.id,
      name: found.name,
      email: found.email,
      created_at: found.createdAt,
    };
    return res.json({ user });
  } catch (err) {
    logError('Get user error:', err instanceof Error ? err.message : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
