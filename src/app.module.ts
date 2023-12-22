import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { KycModule } from './kyc/kyc.module';

@Module({
  imports: [UsersModule, KycModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
