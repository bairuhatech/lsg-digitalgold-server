import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { kycProviders } from './kyc.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [KycController],
  providers: [KycService, ...kycProviders],
  exports: [KycService],
})
export class KycModule {}
