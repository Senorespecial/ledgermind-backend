import { Controller, Get } from '@nestjs/common';
import { ApiVersionDecorator } from '../../../common/decorators/api-version.decorator';
import { ApiVersion } from '../../../versioning/api-version.enum';
import { AccountingService } from '../services/accounting.service';

/**
 * Versioned route: /api/v1/accounting/...
 *
 * To introduce a v2 without breaking v1 clients:
 *   1. Create controllers/accounting.v2.controller.ts
 *   2. Decorate it with @ApiVersionDecorator(ApiVersion.V2)
 *   3. Register it in AccountingModule alongside this controller
 */
@ApiVersionDecorator(ApiVersion.V1)
@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  /** GET /api/v1/accounting/health */
  @Get('health')
  getHealth() {
    return this.accountingService.health();
  }
}
