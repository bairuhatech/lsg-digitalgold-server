import { User } from './../user.entity';
import { Gender } from './../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly role: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.city = user.city;
    this.email = user.email;
    this.role = user.role;
  }
}
