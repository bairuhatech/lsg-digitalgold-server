import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { buyRequestController } from './buyRequest.controller';
import { BuyRequestsServices } from './buyRequest.service';
import { buyRequestProviders } from './buyRequest.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [buyRequestController],
  providers: [BuyRequestsServices, ...buyRequestProviders],
  exports: [BuyRequestsServices],
})
export class BuyRequestModule {}
