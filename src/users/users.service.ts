import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from './../shared/config/config.service';
import { JwtPayload } from './auth/jwt-payload.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map((user) => new UserDto(user));
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    console.log("------------------------------------------------createUserDtocreateUserDto----------------------------------------")
    console.log(createUserDto)
    console.log("--------------------------------------createUserDtocreateUserDto--------------------------------------------------")
    const existingUser = await this.usersRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });

    if (!existingUser) {
      try {
        const user: any = new User();
        user.name = createUserDto.name;
        user.phoneNumber = createUserDto.phoneNumber;
        user.city = createUserDto.city;
        user.email = createUserDto.email.trim().toLowerCase();

        const userData = await user.save();

        const token = await this.signToken(userData);
        return new UserLoginResponseDto(userData, token);
      } catch (err) {
        if (err) {
          console.log(
            '===============================================err==================================================',
          );
          console.log(err);
          console.log(
            '===============================================err==================================================',
          );
          throw new HttpException(
            `User with phoneNumber '${err.errors[0].value}' already exists`,
            HttpStatus.CONFLICT,
          );
        }
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      //   return { message: 'User already exists' };
      console.log('User already exists');
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const name = userLoginRequestDto.name;
    const phoneNumber = userLoginRequestDto.phoneNumber;

    const user = await this.getUserByEmail(phoneNumber);
    if (!user) {
      throw new HttpException(
        'Invalid name or phoneNumber.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // const isMatch = await compare(name, user.phoneNumber);
    // if (!isMatch) {
    //   throw new HttpException(
    //     'Invalid name or phoneNumber.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  //   async update(id: string, updateUserDto: UpdateUserDto) {
  //     const user = await this.usersRepository.findByPk<User>(id);
  //     if (!user) {
  //       throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  //     }

  //     user.firstName = updateUserDto.name || user.name;
  //     user.lastName = updateUserDto.phoneNumber || user.phoneNumber;
  //     user.gender = updateUserDto.city || user.city;
  //     user.birthday = updateUserDto.email || user.email;

  //     try {
  //       const data = await user.save();
  //       return new UserDto(data);
  //     } catch (err) {
  //       throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    await user.destroy();
    return new UserDto(user);
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
