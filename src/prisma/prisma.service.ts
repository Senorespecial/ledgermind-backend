import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Provides database access via the Prisma ORM.
 *
 * Extends the generated `PrismaClient` so the NestJS app uses the same
 * client types that `prisma generate` produced against `prisma/schema.prisma`.
 *
 * Connection management:
 *  - `onModuleInit` opens a connection against the URL PrismaClient reads
 *    from `process.env.DATABASE_URL` (set by `src/common/env.validation.ts`
 *    from the same env-based resolver that powers `prisma.config.ts`).
 *  - `onModuleDestroy` closes it on shutdown.
 *
 * Setup expectation: run `npm run prisma:generate` once after a fresh
 * `npm install` (or after any change to `prisma/schema.prisma`) so
 * `@prisma/client` types exist before this file is compiled. We do not
 * auto-run generate from a postinstall script because the eager resolver
 * in `prisma.config.ts` requires a database URL, which breaks clean
 * `npm install` in CI / Docker / fresh-dev environments without env vars.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Prisma connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
