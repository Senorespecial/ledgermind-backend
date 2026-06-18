import { Controller, Get } from '@nestjs/common';
import { AiService } from '../services/ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('health')
  getHealth() {
    return this.aiService.health();
  }
}
