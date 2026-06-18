import { Controller, Get } from '@nestjs/common';
import { ReportingService } from '../services/reporting.service';

@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('health')
  getHealth() {
    return this.reportingService.health();
  }
}
