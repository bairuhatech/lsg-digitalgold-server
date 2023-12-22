import {
  Controller,
  Req,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-kyc.dto';
import { KycService } from './kyc.service';
import { AuthGuard } from '@nestjs/passport';
import { Kyc as KycEntity } from './kyc.entity';
import { KycDto } from './dto/kyc.dto';
import { UpdatePostDto } from './dto/update-kyc.dto';

@Controller('posts')
@ApiTags('posts')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  // @Get()
  // @ApiOkResponse({ type: [KycDto] })
  // findAll(): Promise<KycDto[]> {
  //   return this.kycService.findAll();
  // }

  // @Get(':id')
  // @ApiOkResponse({ type: KycDto })
  // @ApiParam({ name: 'id', required: true })
  // findOne(@Param('id', new ParseIntPipe()) id: number): Promise<KycDto> {
  //   return this.kycService.findOne(id);
  // }

  // @Post()
  // @ApiCreatedResponse({ type: KycEntity })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // create(
  //   @Body() createPostDto: CreatePostDto,
  //   @Req() request,
  // ): Promise<KycEntity> {
  //   return this.kycService.create(request.user.id, createPostDto);
  // }

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
