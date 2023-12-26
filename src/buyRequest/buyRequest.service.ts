import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBuyRequestDto } from './dto/create-buyRequest.dto';
import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';
import { BuyRequestType } from 'src/shared/enum/request-type.enum';
import { BuyRequestDto } from './dto/buyRequest.dto';
import { PaginationDto } from 'src/shared/commondto/pagination.dto';
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
  async findType(
    type: BuyRequestType,
    paginationDto: PaginationDto,
  ): Promise<any> {
    try {
      const { page = 1, pageSize = 10 } = paginationDto;
      const offset = (page - 1) * pageSize;
      const metalRequests = await this.buyRequestRepo.findAll({
        where: { type: type },
        offset,
        limit: pageSize,
      });
      return metalRequests;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
