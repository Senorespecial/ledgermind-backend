/**
 * Resolves the PostgreSQL connection string at runtime.
 *
 * Mirrors the logic in the Prisma CLI config file at `prisma.config.ts`
 * so the NestJS app and the Prisma CLI agree on which `DATABASE_URL` value
 * to use in every environment.
 *
 * Resolution order:
 *   1. `DATABASE_URL` (recommended).
 *   2. `DATABASE_URL_<STAGE>` where `<STAGE>` is the upper-cased value of
 *      `STAGE` (or `NODE_ENV` as a fallback). Common values:
 *      `DEV`, `TEST`, `PROD`.
 *   3. When `STAGE` is `STAGING`, the lookup also falls back to
 *      `DATABASE_URL_PROD`.
 *
 * Throws an explicit error when nothing resolves, so a misconfiguration
 * surfaces at startup rather than as a confusing Prisma error later.
 */

type EnvKey = 'DATABASE_URL' | `DATABASE_URL_${string}`;

export function resolveDatabaseUrl(): string {
  const explicit = process.env.DATABASE_URL;
  if (explicit && explicit.trim().length > 0) return explicit;

  const stage = (process.env.STAGE ?? process.env.NODE_ENV ?? '')
    .toUpperCase()
    .trim();

  // Common convention: DATABASE_URL_DEV / DATABASE_URL_TEST / DATABASE_URL_PROD
  const candidates: string[] = [];
  if (stage) {
    candidates.push(`DATABASE_URL_${stage}`);
    // Allow STAGING to map to PREPROD-like envs if users prefer.
    if (stage === 'STAGING') candidates.push('DATABASE_URL_PROD');
  }

  for (const key of candidates) {
    const value = process.env[key as EnvKey];
    if (value && value.trim().length > 0) return value;
  }

  throw new Error(
    'Missing PostgreSQL connection string. Provide process.env.DATABASE_URL (recommended) or one of: DATABASE_URL_DEV/DATABASE_URL_TEST/DATABASE_URL_PROD (or set STAGE/NODE_ENV accordingly).',
  );
}
