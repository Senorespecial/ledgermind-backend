import { Controller, Get } from '@nestjs/common';
import { AccountingService } from '../services/accounting.service';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('health')
  getHealth() {
    return this.accountingService.health();
  }
}
