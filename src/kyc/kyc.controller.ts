import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { CreateKycDto } from './dto/create-kyc.dto';
import { Kyc as KycEntity } from './kyc.entity';
import { KycService } from './kyc.service';
import { KycDto } from './dto/kyc.dto';

@Controller('kyc')
@ApiTags('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Get('/getKyc')
  @ApiOkResponse({ type: [KycDto] })
  findAll(): Promise<KycDto[]> {
    return this.kycService.findAll();
  }

  @Get('/getKyc/:id')
  @ApiOkResponse({ type: KycDto })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<KycDto> {
    return this.kycService.findOne(id);
  }

  @Post('/addKyc')
  @ApiCreatedResponse({ type: KycEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createKycDto: CreateKycDto,
    @Req() request,
  ): Promise<KycEntity> {
    return this.kycService.create(request.user.id, createKycDto);
  }

  // @Put(':id')
  // @ApiOkResponse({ type: KycEntity })
  // @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // update(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Req() request,
  //   @Body() updatePostDto: UpdatePostDto,
  // ): Promise<KycEntity> {
  //   return this.kycService.update(id, request.user.id, updatePostDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: KycEntity })
  // @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // delete(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Req() request,
  // ): Promise<KycEntity> {
  //   return this.kycService.delete(id, request.user.id);
  // }
}
