import { Prisma, PrismaClient } from '@prisma/client';
import prismaConfig from '../prisma/prisma.config';

// Build PrismaClient options according to new Prisma guidance
// Avoid passing `adapter` unless `driverAdapters` preview feature is enabled.
const clientOptions: any = {};

if (prismaConfig?.client?.adapter) {
  // adapter requires preview feature; instead pass a datasourceUrl for compatibility
  if (prismaConfig.client.adapter.url) {
    clientOptions.datasourceUrl = prismaConfig.client.adapter.url;
  }
}

if (prismaConfig?.client?.accelerateUrl) {
  clientOptions.accelerateUrl = prismaConfig.client.accelerateUrl;
}

const prisma = new PrismaClient(clientOptions);

export default prisma;
