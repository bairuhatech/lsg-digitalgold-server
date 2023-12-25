import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { KycModule } from './kyc/kyc.module';
import { BuyRequestModule } from './buyRequest/buyRequest.module';

@Module({
  imports: [UsersModule, KycModule, SharedModule, BuyRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
