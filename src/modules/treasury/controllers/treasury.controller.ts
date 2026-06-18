import { Controller, Get } from '@nestjs/common';
import { TreasuryService } from '../services/treasury.service';

@Controller('treasury')
export class TreasuryController {
  constructor(private readonly treasuryService: TreasuryService) {}

  @Get('health')
  getHealth() {
    return this.treasuryService.health();
  }
}
