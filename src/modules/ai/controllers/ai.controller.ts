import { Controller, Get } from '@nestjs/common';
import { ApiVersionDecorator } from '../../../common/decorators/api-version.decorator';
import { ApiVersion } from '../../../versioning/api-version.enum';
import { AiService } from '../services/ai.service';

/**
 * Versioned route: /api/v1/ai/...
 */
@ApiVersionDecorator(ApiVersion.V1)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /** GET /api/v1/ai/health */
  @Get('health')
  getHealth() {
    return this.aiService.health();
  }
}
