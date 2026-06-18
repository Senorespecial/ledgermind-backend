import { Injectable } from '@nestjs/common';

@Injectable()
export class TreasuryStubRepository {
  async health() {
    return { repository: 'treasury', status: 'ok' };
  }
}
