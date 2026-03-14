// Prisma configuration for migrate and client connection URLs.
// This file should not be checked into source control with secrets.

const config = {
  migrate: {
    // Migrate expects a connection URL here. Set DATABASE_URL in Vercel or your environment.
    url: process.env.DATABASE_URL,
  },
  // Export client options for manual use when constructing PrismaClient in runtime code.
  client: {
    // For a direct DB connection provide `adapter`, e.g. { provider: 'postgresql', url: process.env.DATABASE_URL }
    // For Prisma Accelerate provide `accelerateUrl` instead.
    adapter: process.env.DATABASE_URL ? { provider: 'postgresql', url: process.env.DATABASE_URL } : undefined,
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL ?? undefined,
  },
};

export default config;
