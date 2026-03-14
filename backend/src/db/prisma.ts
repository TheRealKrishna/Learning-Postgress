import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import prismaConfig from '../prisma/prisma.config';

type PrismaClientOptions = ConstructorParameters<typeof PrismaClient>[0];

const directUrl = prismaConfig?.client?.adapter?.url;
const accelerateUrl = prismaConfig?.client?.accelerateUrl;

let clientOptions: PrismaClientOptions | undefined;

if (directUrl) {
  const pool = new Pool({ connectionString: directUrl });
  clientOptions = { adapter: new PrismaPg(pool) };
} else if (accelerateUrl) {
  clientOptions = { accelerateUrl };
}

const prisma = new PrismaClient(clientOptions);

export default prisma;
