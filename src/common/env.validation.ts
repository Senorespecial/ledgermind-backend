import { resolveDatabaseUrl } from './prisma-url';

/**
 * Validate and resolve the runtime environment.
 *
 * Returns silently when at least one of DATABASE_URL / DATABASE_URL_<STAGE>
 * is set; otherwise throws the same explicit error as `prisma.config.ts`.
 *
 * If the resolved value came from a stage-suffixed variable
 * (e.g. DATABASE_URL_DEV with STAGE=DEV), it is assigned back to
 * `process.env.DATABASE_URL` so downstream consumers — most notably
 * `PrismaClient`, which reads `env("DATABASE_URL")` from `schema.prisma` —
 * see the same URL at runtime that the Prisma CLI uses.
 */
export function validateEnv(): void {
  const resolved = resolveDatabaseUrl();

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = resolved;
  }
}
