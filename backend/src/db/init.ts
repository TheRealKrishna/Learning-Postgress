import prisma from './prisma';

export const ensureTables = async (): Promise<void> => {
  await prisma.$executeRaw`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  )
`;
};

export default ensureTables;
