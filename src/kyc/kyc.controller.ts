import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
import { UpdateKycDto } from './dto/update-kyc.dto';
import { ParseUUIDPipe } from '@nestjs/common';



@Controller('kyc')
@ApiTags('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Get('/getKyc')
  @ApiOkResponse({ type: [KycDto] })
  findAll(): Promise<KycDto[]> {
    return this.kycService.findAll();
  }

  @Get('/getKyc/:Userid')
  @ApiOkResponse({ type: KycDto })
  @ApiParam({ name: 'Userid', required: true })
  findOne(@Param('Userid') Userid: string): Promise<KycDto> {
    return this.kycService.findOne(Userid);
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

  @Put(':userId')
  @ApiOkResponse({ type: KycEntity })
  @ApiParam({ name: 'userId', required: true })
  //@ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  update(
    @Param('userId') UserId: string,
    @Body() UpdateKycDto: UpdateKycDto,
  ): Promise<KycEntity> {
    return this.kycService.update(UserId, UpdateKycDto);
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
