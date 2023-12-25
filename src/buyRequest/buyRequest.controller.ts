import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiTags
  } from '@nestjs/swagger';
  import { CreateBuyRequestDto } from './dto/create-buyRequest.dto';
  import { BuyRequest as BuyRequestEntity } from './buyRequest.entity';
  import { BuyRequestsServices } from './buyRequest.service';
  
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
      return this.buyRequestsServices.create(request.user.id, createBuyRequestDto);
    }
  
  }
  