import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingService {
  health() {
    return {
      module: 'accounting',
      status: 'ok',
    };
  }
}
