const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    'Missing DATABASE_URL. Add it to ledgermind-backend/.env (or set env var before running Prisma).',
  );
}

// Typed inline so this file compiles without requiring `prisma generate`
const options: {
  datasources: { db: { url: string } };
} = {
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
};

export default options;
