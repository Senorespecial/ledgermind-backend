import { Controller, Get } from '@nestjs/common';
import { ApiVersionDecorator } from '../../../common/decorators/api-version.decorator';
import { ApiVersion } from '../../../versioning/api-version.enum';
import { ReportingService } from '../services/reporting.service';

/**
 * Versioned route: /api/v1/reporting/...
 */
@ApiVersionDecorator(ApiVersion.V1)
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  /** GET /api/v1/reporting/health */
  @Get('health')
  getHealth() {
    return this.reportingService.health();
  }
}
