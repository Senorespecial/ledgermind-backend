import { defineConfig } from '@prisma/config';
import { resolveDatabaseUrl } from './src/common/prisma-url';

/**
 * Prisma 6 PrismaConfig (`defineConfig` from `@prisma/config`).
 *
 * Under Prisma 6 the database connection lives under `datasource` (singular)
 * on the classic engine path. Prisma's CLI (`prisma generate`,
 * `prisma migrate`, `prisma studio`) reads `datasource.url` here and
 * overrides any `url = env(...)` declared in `prisma/schema.prisma`.
 *
 * The URL value resolves through the same env-based chain used at runtime
 * by `src/common/env.validation.ts` (mirrored into `process.env.DATABASE_URL`
 * before `PrismaClient` construction):
 *
 *   1. `DATABASE_URL` (preferred)
 *   2. `DATABASE_URL_<STAGE>` based on `STAGE` / `NODE_ENV`
 *   3. `STAGING` -> `DATABASE_URL_PROD` alias
 *
 * The schema's `url = env("DATABASE_URL")` line in `prisma/schema.prisma`
 * is intentionally retained for runtime defense-in-depth: when the
 * generated PrismaClient is constructed at NestJS startup time, it reads
 * `process.env.DATABASE_URL`; that env var is set by `validateEnv()`.
 */
export default defineConfig({
  engine: 'classic',
  datasource: {
    url: resolveDatabaseUrl(),
  },
});
