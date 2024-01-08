import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from './../shared/config/config.service';
import { JwtPayload } from './auth/jwt-payload.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { PaginationDto } from '../shared/commondto/pagination.dto';
import { Kyc } from '../kyc/kyc.entity';
import { PageOptionsDto } from '../shared/dto/page-option-dto';
import { KycService } from '../kyc/kyc.service';
import { PageDto, PageMetaDto } from '../shared/dto';
import { KycDto } from '../kyc/dto/kyc.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;
  @Inject(KycService)
  private readonly Kycservice: KycService;

  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll(pageOptionsDto:PageOptionsDto) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    const userlist = await this.usersRepository.findAndCountAll<User>({
      limit:Number(pageOptionsDto.take),
      offset:skip,
      order: [['updatedAt', pageOptionsDto.order]]
    });
    const entities = userlist.rows.map((users)=> new UserDto(users));
    const itemCount = userlist.count;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto)
  }

  async getKycUser(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const kycList = await Kyc.findAndCountAll({
        limit: pageOptionsDto.take,
        offset: skip,
      });
  
      const userIds = kycList.rows.map((kyc) => kyc.userId);
      const usersList = await this.usersRepository.findAll({
        where: {
          id: userIds,
        },
        limit: pageOptionsDto.take,
        offset: skip,
      });
  
      const totalCount = kycList.count;
      const entities = kycList.rows.map((kyc) => new KycDto(kyc));
      const pageMetaDto = new PageMetaDto({
        pageOptionsDto,
        itemCount: totalCount,
      });
      return new PageDto(entities, pageMetaDto);
    } catch (err) {
      throw new HttpException('No user found with KYC', HttpStatus.NOT_FOUND);
    }
  }
  
  
  

  // async getKycUser() {
  //   try {
  //     const kycRepo = await Kyc.findAll();
  //     const userIds = kycRepo.map((kyc) => kyc.userId);
  //     const user = await this.usersRepository.findAll({
  //       where: {
  //         id: userIds,
  //       },
  //     });
  //     return user;
  //   } catch (err) {
  //     throw new HttpException('No user found with kyc', HttpStatus.NOT_FOUND);
  //   }
  // }

  async getUserPhoneNumber(phoneNumber: string) {
    return await this.usersRepository.findOne<User>({
      where: { phoneNumber },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });

    if (!existingUser) {
      try {
        const user: any = new User();
        user.name = createUserDto.name;
        user.phoneNumber = createUserDto.phoneNumber;
        if (createUserDto.email) {
          user.email = createUserDto.email.trim().toLowerCase();
        }
        if (createUserDto.city) {
          user.city = createUserDto.city;
        }
        user.role = createUserDto.role;

        const userData = await user.save();
        const token = await this.signToken(userData);
        userData.authToken = token;
        await userData.save();
        return new UserLoginResponseDto(userData, token);
      } catch (err) {
        if (err) {
          throw new HttpException(
            `User with phoneNumber '${err.errors[0].value}' already exists`,
            HttpStatus.CONFLICT,
          );
        }
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      console.log('User already exists');
      const existingToken = existingUser.authToken;
      return new UserLoginResponseDto(existingUser, existingToken);
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const name = userLoginRequestDto.name;
    const phoneNumber = userLoginRequestDto.phoneNumber;

    const user = await this.getUserPhoneNumber(phoneNumber);
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
      phoneNumber: user.phoneNumber,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
  

  private async getkyc(id: string) {
    const UserData = await this.usersRepository.findOne<User>({where : {id :id}});
    if (!UserData) {
      throw new HttpException('No kyc found', HttpStatus.NOT_FOUND);
    }
    return UserData;
  }


  async updateUser(id:string, updateUserDto: UpdateUserDto) {
    try {
      const UserUpdate = await this.getkyc(id);
      UserUpdate.email = updateUserDto.email || UserUpdate.email;
      UserUpdate.city = updateUserDto.city || UserUpdate.city;
      return UserUpdate.save();

    } catch (err) {
      console.log("error to update",err)
    }
  }


}
