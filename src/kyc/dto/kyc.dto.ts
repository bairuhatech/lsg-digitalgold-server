import { ApiProperty } from '@nestjs/swagger';
import { Kyc } from '../Kyc.entity';

export class KycDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly authorId: string;

  @ApiProperty()
  readonly authorFirstName: string;

  @ApiProperty()
  readonly authorLastName: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(kyc: Kyc) {
    this.id = kyc.id;
    this.authorId = kyc.userId;
    this.authorFirstName = kyc.user.name;
    this.authorLastName = kyc.user.name;
    this.title = kyc.title;
    this.content = kyc.content;
    this.createdAt = kyc.createdAt;
    this.updatedAt = kyc.updatedAt;
  }
}
