import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/commondto/pagination.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  // @Post('login')
  // @HttpCode(200)
  // @ApiOkResponse({ type: UserLoginResponseDto })
  // login(
  //   @Body() userLoginRequestDto: UserLoginRequestDto,
  // ): Promise<UserLoginResponseDto | ''> {
  //   return this.usersService.login(userLoginRequestDto);
  // }

  @Get('/getUsers')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAll(@Query() paginationDto: PaginationDto): Promise<UserDto[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Get('/getUserKyc')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getUser(): Promise<any> {
    return this.usersService.getKycUser();
  }

  // @Put('me')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: UserDto })
  // update(
  //     @Body() updateUserDto: UpdateUserDto,
  //     @Req() request,
  // ): Promise<UserDto> {
  //     return this.usersService.update(request.user.id, updateUserDto);
  // }

  @Delete('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  delete(@Req() request): Promise<UserDto> {
    return this.usersService.delete(request.user.id);
  }
}
