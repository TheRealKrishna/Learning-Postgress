// Prisma configuration for migrate and client connection URLs.
// Keep secrets in environment variables.

const config = {
  schema: 'src/prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  // Runtime app code can use either adapter (direct DB) or accelerateUrl.
  client: {
    adapter: process.env.DATABASE_URL ? { provider: 'postgresql', url: process.env.DATABASE_URL } : undefined,
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL ?? undefined,
  },
};

export default config;
