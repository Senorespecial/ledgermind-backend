import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingStubRepository {
  // Placeholder method to demonstrate the repository pattern.
  // Implement once accounting domain models exist in Prisma.
  async health() {
    return { repository: 'accounting', status: 'ok' };
  }
}
