import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsStubRepository {
  async health() {
    return { repository: 'analytics', status: 'ok' };
  }
}
