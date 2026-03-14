import { Prisma, PrismaClient } from '@prisma/client';
import prismaConfig from '../prisma/prisma.config';

// Build PrismaClient options using adapter or accelerateUrl per Prisma 7 guidance.
const clientOptions: Record<string, unknown> = {};

if (prismaConfig?.client?.adapter?.url) {
  // Provide the raw connection string as `datasourceUrl` for PrismaClient.
  clientOptions.datasourceUrl = prismaConfig.client.adapter.url as string;
}

if (prismaConfig?.client?.accelerateUrl) {
  clientOptions.accelerateUrl = prismaConfig.client.accelerateUrl;
}

const prisma = new PrismaClient(clientOptions as Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions>);

export default prisma;
