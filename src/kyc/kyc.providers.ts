import { Kyc } from './kyc.entity';

export const kycProviders = [{ provide: 'KycRepository', useValue: Kyc }];
