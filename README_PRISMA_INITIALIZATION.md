# Prisma initialization (schema, migrations, client generation)

> Note: This file documents the correct Prisma setup/commands for this repository. It does **not** run migrations or generate the Prisma client.

## Prerequisites

1. Ensure you have a PostgreSQL database available.
2. Set a connection string in your environment.

### Required environment variables

At minimum, set:

- `DATABASE_URL` — PostgreSQL connection string

The repo also supports a `STAGE`/`NODE_ENV`-based lookup when `DATABASE_URL` is not set:

- `DATABASE_URL_DEV`
- `DATABASE_URL_TEST`
- `DATABASE_URL_PROD`

If `STAGE=STAGING`, the config may also fall back to `DATABASE_URL_PROD`.

## Commands

> The following commands require Prisma to be installed (it is included as a devDependency).

### 1) Generate Prisma client

```bash
npm run prisma:generate
```

This creates/updates Prisma client artifacts under your local `node_modules/@prisma/client` and prepares tooling to use the schema.

### 2) Create and apply migrations (initial migration)

```bash
npm run prisma:migrate
```

This will:

- create a migration based on `prisma/schema.prisma` (and existing DB state)
- apply it to your database
- update the migration history (creates `prisma/migrations/*`)

### 3) (Optional) Open Prisma Studio

```bash
npm run prisma:studio
```

## Schema

The Prisma schema is located at:

- `prisma/schema.prisma`

Current models include:

- `User`

## Troubleshooting

### Missing DATABASE_URL error

If you see an error like “Missing DATABASE_URL…”, set `DATABASE_URL` (or `DATABASE_URL_DEV`/`DATABASE_URL_TEST`/`DATABASE_URL_PROD` plus `STAGE`/`NODE_ENV`).

### Prisma client not generated

If runtime code cannot find the Prisma client, run:

- `npm run prisma:generate`

## Reference

- `package.json` scripts:
  - `prisma:generate`
  - `prisma:migrate`
  - `prisma:studio`
