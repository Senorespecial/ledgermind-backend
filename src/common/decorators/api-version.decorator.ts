import { Version } from '@nestjs/common';
import { ApiVersion } from '../../versioning/api-version.enum';

/**
 * Declares the API version(s) a controller or route handler supports.
 *
 * Thin wrapper around NestJS's built-in @Version() decorator so all
 * version references flow through a single import — the ApiVersion enum.
 *
 * Usage (controller-level — applies to all routes in the class):
 *   @ApiVersionDecorator(ApiVersion.V1)
 *   @Controller('accounting')
 *   export class AccountingController { ... }
 *
 * Usage (route-level override — one endpoint on a different version):
 *   @ApiVersionDecorator(ApiVersion.V2)
 *   @Get('transactions')
 *   getTransactions() { ... }
 *
 * Multiple versions (same handler serves v1 and v2 simultaneously):
 *   @ApiVersionDecorator(ApiVersion.V1, ApiVersion.V2)
 *
 * Implementation note: @Version() from @nestjs/common returns a
 * ClassDecorator & MethodDecorator union. We re-export it as a plain
 * function so callers only ever import from this file and never need to
 * change when the underlying NestJS API changes.
 */
export function ApiVersionDecorator(
  ...versions: ApiVersion[]
): ClassDecorator & MethodDecorator {
  return Version(versions) as ClassDecorator & MethodDecorator;
}
