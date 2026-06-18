type EnvKey = 'DATABASE_URL' | `DATABASE_URL_${string}`;

function resolveDatabaseUrl(): string {
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

  // Last resort: let Prisma read from its own env resolution.
  // However, we still throw to make configuration failures obvious.
  throw new Error(
    'Missing PostgreSQL connection string. Provide process.env.DATABASE_URL (recommended) or one of: DATABASE_URL_DEV/DATABASE_URL_TEST/DATABASE_URL_PROD (or set STAGE/NODE_ENV accordingly).',
  );
}

const DATABASE_URL = resolveDatabaseUrl();

const options = {
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
};

export default options;
