import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '../common/responses/api-response';

@Controller('health')
export class HealthController {
  @Get()
  check(): ApiResponse<{ status: string; timestamp: string }> {
    return {
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
