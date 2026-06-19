import { Controller, Get } from '@nestjs/common';
import { ApiVersionDecorator } from '../../../common/decorators/api-version.decorator';
import { ApiVersion } from '../../../versioning/api-version.enum';
import { TreasuryService } from '../services/treasury.service';

/**
 * Versioned route: /api/v1/treasury/...
 */
@ApiVersionDecorator(ApiVersion.V1)
@Controller('treasury')
export class TreasuryController {
  constructor(private readonly treasuryService: TreasuryService) {}

  /** GET /api/v1/treasury/health */
  @Get('health')
  getHealth() {
    return this.treasuryService.health();
  }
}
