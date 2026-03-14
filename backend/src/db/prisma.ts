import { Prisma, PrismaClient } from '@prisma/client';
import prismaConfig from '../prisma/prisma.config';

// Build PrismaClient options according to new Prisma guidance
const clientOptions: {
  adapter?: { provider: string; url: string };
  accelerateUrl?: string;
} = {}

if (prismaConfig?.client?.adapter) {
  clientOptions.adapter = prismaConfig.client.adapter;
}
if (prismaConfig?.client?.accelerateUrl) {
  clientOptions.accelerateUrl = prismaConfig.client.accelerateUrl;
}

const prisma = new PrismaClient(clientOptions as Prisma.PrismaClientOptions);

export default prisma;
