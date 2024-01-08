import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBuyRequestDto } from './dto/create-buyRequest.dto';
import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';
import { BuyRequestsServices } from './buyRequest.service';
import { BuyRequestType } from '../shared/enum/request-type.enum';
import { BuyRequestDto } from './dto/buyRequest.dto';
import { PaginationDto } from '../shared/commondto/pagination.dto';
import { PageOptionsDto } from '../shared/dto/page-option-dto';
import { PageDto } from '../shared/dto';

@Controller('buyRequest')
@ApiTags('buyRequest')
export class buyRequestController {
  constructor(private readonly buyRequestsServices: BuyRequestsServices) { }

  @Post('/addbuyDetails')
  @ApiCreatedResponse({ type: BuyRequestEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createBuyRequestDto: CreateBuyRequestDto,
    @Req() request,
  ): Promise<BuyRequestEntity> {
    return this.buyRequestsServices.create(
      request.user.id,
      createBuyRequestDto,
    );
  }

  @Get('/getRequest/:type')
  @ApiOkResponse({ type: BuyRequestDto, isArray: true })
  @HttpCode(200)
  async findOne(
    @Param('type') type: BuyRequestType,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BuyRequestDto>> {
    const result = await this.buyRequestsServices.findType(type, pageOptionsDto);
    return result;
  }


  @Get('/getBuySell/:type')
@ApiOkResponse({ type: BuyRequestDto, isArray: true })
@HttpCode(200)
async findAll(
  @Param('type') type: BuyRequestType,
): Promise<BuyRequestDto[]> {
  const result = await this.buyRequestsServices.GetAllSellBuy(type);
  return result;
}


}
