import {
  Body,
  Controller,
  Get,
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

@Controller('buyRequest')
@ApiTags('buyRequest')
export class buyRequestController {
  constructor(private readonly buyRequestsServices: BuyRequestsServices) {}

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
  @ApiOkResponse({ type: BuyRequestDto })
  findOne(
    @Param('type') type: BuyRequestType,
    @Query() paginationDto: PaginationDto,
  ): Promise<BuyRequestDto> {
    return this.buyRequestsServices.findType(type, paginationDto);
  }
}
