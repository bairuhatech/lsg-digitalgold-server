import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { KycModule } from '../kyc/kyc.module';

@Module({
    imports: [forwardRef(()=> DatabaseModule),KycModule],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders, JwtStrategy],
    exports: [UsersService],
})
export class UsersModule {}
