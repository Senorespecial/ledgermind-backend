import { Injectable } from '@nestjs/common';

@Injectable()
export class AiStubRepository {
  async health() {
    return { repository: 'ai', status: 'ok' };
  }
}
