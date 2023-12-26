import { ApiProperty } from '@nestjs/swagger';
import { BuyRequest } from '../buyRequest.entity';
import { BuyRequestType } from '../../shared/enum/request-type.enum';

export class BuyRequestDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty({ enum: BuyRequestType })
  readonly type: BuyRequestType;

  @ApiProperty()
  readonly metal: string;

  @ApiProperty()
  readonly price: string;

  @ApiProperty()
  readonly gram: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly deletedAt: Date;

  constructor(buyRequest: BuyRequest) {
    this.id = buyRequest.id;
    this.userId = buyRequest.userId;
    this.type = buyRequest.type;
    this.metal = buyRequest.metal;
    this.price = buyRequest.price;
    this.gram = buyRequest.gram;
    this.createdAt = buyRequest.createdAt;
    this.updatedAt = buyRequest.updatedAt;
    this.deletedAt = buyRequest.deletedAt;
  }
}
