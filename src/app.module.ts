import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { KycModule } from './kyc/kyc.module';
import { BuyRequestModule } from './buyRequest/buyRequest.module';
import { ImguploaderModule } from './imageUpload/img_uploader.module';


@Module({
  imports: [UsersModule, KycModule, SharedModule, BuyRequestModule, ImguploaderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
