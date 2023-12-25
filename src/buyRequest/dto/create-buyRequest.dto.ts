import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { BuyRequestType } from '../../shared/enum/request-type.enum';

export class CreateBuyRequestDto {
  @ApiProperty()
  @IsEnum(BuyRequestType)
  readonly type: string;

  @ApiProperty()
  @IsString()
  readonly metal: string;

  @ApiProperty()
  @IsString()
  readonly price: string;

  @ApiProperty()
  @IsString()
  readonly gram: string;
}
