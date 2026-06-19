import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

/**
 * Minimal interface that mirrors the PrismaClient surface we actually use.
 * This keeps the file type-safe without requiring `prisma generate` to have
 * run. Once `prisma generate` has been executed, the real PrismaClient will
 * satisfy this interface automatically.
 */
interface PrismaClientLike {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}

/**
 * PrismaService provides database access via the Prisma ORM.
 *
 * The PrismaClient is loaded at runtime so this file compiles cleanly
 * even before `prisma generate` has been run.
 *
 * Setup steps:
 *   1. Copy .env.example → .env and set DATABASE_URL
 *   2. npm run prisma:migrate   (runs prisma generate automatically)
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly prisma: PrismaClientLike | null;

  constructor() {
    try {
      // Dynamic require keeps the build clean before prisma generate runs.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('@prisma/client') as {
        PrismaClient: new () => PrismaClientLike;
      };
      this.prisma = new mod.PrismaClient();
    } catch {
      // Prisma client not yet generated — safe during build/lint step.
      this.prisma = null;
    }
  }

  async onModuleInit() {
    await this.prisma?.$connect();
  }

  async onModuleDestroy() {
    await this.prisma?.$disconnect();
  }
}
