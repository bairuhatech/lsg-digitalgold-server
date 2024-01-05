import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBuyRequestDto } from './dto/create-buyRequest.dto';
import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';
import { BuyRequestType } from '../shared/enum/request-type.enum';
import { BuyRequestDto } from './dto/buyRequest.dto';
import { PaginationDto } from '../shared/commondto/pagination.dto';
import { PageOptionsDto } from '../shared/dto/page-option-dto';
import { PageDto, PageMetaDto } from '../shared/dto';
@Injectable()
export class BuyRequestsServices {
  constructor(
    @Inject('BuyRequestRepository')
    private readonly buyRequestRepo: typeof BuyRequestEntity,
  ) { }

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
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BuyRequestDto>> {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const buyRequests = await this.buyRequestRepo.findAndCountAll({
        where: { type: type },
        limit: Number(pageOptionsDto.take),
        offset: skip,
        order: [['updatedAt', pageOptionsDto.order]]
      });

      const entities = buyRequests.rows.map((buyRequest) => new BuyRequestDto(buyRequest));
      const itemCount = buyRequests.count;

      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(entities, pageMetaDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async GetAllSellBuy(type: BuyRequestType): Promise<BuyRequestDto[]> {
    try {
      const buyRequests = await this.buyRequestRepo.findAll({
        where: { type: type },
      });
      const entities = buyRequests.map((buyRequest) => new BuyRequestDto(buyRequest));
      return entities;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

}
