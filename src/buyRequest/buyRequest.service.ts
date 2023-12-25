import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBuyRequestDto } from './dto/create-buyRequest.dto';
import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';
@Injectable()
export class BuyRequestsServices {
  constructor(
    @Inject('BuyRequestRepository')
    private readonly buyRequestRepo: typeof BuyRequestEntity,
  ) {}

  async create(userId: string, createBuyRequestDto: CreateBuyRequestDto) {
    try {
      const user = await this.buyRequestRepo.findOne({
        where: { userId: userId },
      });

        const kyc = new BuyRequestEntity();
        kyc.userId = userId;
        Object.assign(kyc, createBuyRequestDto);
        return kyc.save();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
