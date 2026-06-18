import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportingStubRepository {
  async health() {
    return { repository: 'reporting', status: 'ok' };
  }
}
