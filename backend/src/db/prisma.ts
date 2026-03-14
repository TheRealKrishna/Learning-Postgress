import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import prismaConfig from '../prisma/prisma.config';

type PrismaClientOptions = ConstructorParameters<typeof PrismaClient>[0];

const directUrl = prismaConfig?.client?.adapter?.url ?? process.env.DATABASE_URL;
const accelerateUrl = prismaConfig?.client?.accelerateUrl ?? process.env.PRISMA_ACCELERATE_URL;

let clientOptions: PrismaClientOptions | undefined;

if (directUrl) {
  const pool = new Pool({ connectionString: directUrl });
  clientOptions = { adapter: new PrismaPg(pool) };
} else if (accelerateUrl) {
  clientOptions = { accelerateUrl };
}

if (!clientOptions) {
  throw new Error('Prisma client config missing: set DATABASE_URL for direct adapter mode or PRISMA_ACCELERATE_URL for Accelerate mode.');
}

const prisma = new PrismaClient(clientOptions);

export default prisma;
