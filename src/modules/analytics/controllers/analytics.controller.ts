import { Controller, Get } from '@nestjs/common';
import { ApiVersionDecorator } from '../../../common/decorators/api-version.decorator';
import { ApiVersion } from '../../../versioning/api-version.enum';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Versioned route: /api/v1/analytics/...
 */
@ApiVersionDecorator(ApiVersion.V1)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /** GET /api/v1/analytics/health */
  @Get('health')
  getHealth() {
    return this.analyticsService.health();
  }
}
