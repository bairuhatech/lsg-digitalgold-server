import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';

export const buyRequestProviders = [{ provide: 'BuyRequestRepository', useValue: BuyRequestEntity }];
