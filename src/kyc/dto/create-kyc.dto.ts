import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateKycDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly companyName: string;

  @ApiProperty()
  @IsString()
  readonly mobile: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsString()
  readonly pinCode: string;

  @ApiProperty()
  @IsString()
  readonly vatNumber: string;

  @ApiProperty()
  @IsString()
  readonly natureOfBusiness: string;

  @ApiProperty()
  @IsBoolean()
  readonly isLogisticServiceRequired: boolean;

  @ApiProperty()
  @IsString()
  readonly primaryPartnerName: string;

  @ApiProperty()
  @IsString()
  readonly primaryPartnerMobile: string;

  @ApiProperty()
  @IsString()
  readonly secondaryPartnerName: string;

  @ApiProperty()
  @IsString()
  readonly secondaryPartnerMobile: string;

  @ApiProperty()
  @IsString()
  readonly bankName: string;

  @ApiProperty()
  @IsString()
  readonly bankAccountName: string;

  @ApiProperty()
  @IsString()
  readonly accountNumber: string;

  @ApiProperty()
  @IsString()
  readonly ifscCode: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonPrimary: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonSecondary: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonTertiary: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonQuaternary: string;

  @ApiProperty()
  @IsString()
  readonly companyPan: string;

  @ApiProperty()
  @IsString()
  readonly vatCertificate: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonPrimaryImage: string;

  @ApiProperty()
  @IsString()
  readonly authorisedPersonSecondaryImage: string;
}
