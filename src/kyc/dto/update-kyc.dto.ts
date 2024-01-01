import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateKycDto {
   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly isissued: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly reasonreject: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly name: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly companyName: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly mobile: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly email: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly address: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly city: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly pinCode: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly vatNumber: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly natureOfBusiness: string;

   @ApiProperty()
   @IsBoolean()
   @IsOptional()
   readonly isLogisticServiceRequired: Boolean;


   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly primaryPartnerName: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly primaryPartnerMobile: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly secondaryPartnerName: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly secondaryPartnerMobile: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly bankName: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly bankAccountName: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly accountNumber: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly ifscCode: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonPrimary: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonSecondary: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonTertiary: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonQuaternary: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly companyPan: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly vatCertificate: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonPrimaryImage: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   readonly authorisedPersonSecondaryImage: string;

}
