import { Injectable } from '@nestjs/common';

@Injectable()
export class TreasuryService {
  health() {
    return {
      module: 'treasury',
      status: 'ok',
    };
  }
}
