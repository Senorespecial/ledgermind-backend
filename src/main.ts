import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { validateEnv } from './common/env.validation';

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);

  /**
   * Global route prefix.
   * All routes are served under /api/...
   *
   * excludeRoutes keeps the root health-check at GET / (no /api prefix)
   * so load-balancer probes keep working.
   */
  app.setGlobalPrefix('api', { exclude: ['/'] });

  /**
   * URI-based versioning.
   * Version is encoded directly in the path:  /api/v{n}/module/route
   *
   * Alternatives (not chosen):
   *   VersioningType.HEADER  → "X-API-Version: 1"
   *   VersioningType.MEDIA_TYPE → Accept: application/json;v=1
   *   VersioningType.CUSTOM  → arbitrary resolver function
   *
   * URI versioning is chosen because it is the most explicit,
   * cache-friendly, and easiest to consume for third-party API clients.
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
