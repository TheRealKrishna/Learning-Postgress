import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For local development users will typically use a plain connection string or
  // env vars (PGHOST, PGUSER, etc.). In production, you may need `ssl`.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);

export default {
  query,
  pool,
};
