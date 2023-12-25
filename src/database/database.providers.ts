import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { BuyRequest } from '../buyRequest/buyRequest.entity';
import { ConfigService } from './../shared/config/config.service';
import { Kyc } from '../kyc/kyc.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([User, Kyc, BuyRequest]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
