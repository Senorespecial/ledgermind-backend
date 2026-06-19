import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AccountingModule } from './modules/accounting/accounting.module';
import { TreasuryModule } from './modules/treasury/treasury.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiModule } from './modules/ai/ai.module';
import { ReportingModule } from './modules/reporting/reporting.module';

@Module({
  imports: [
    AccountingModule,
    TreasuryModule,
    AnalyticsModule,
    AiModule,
    ReportingModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
