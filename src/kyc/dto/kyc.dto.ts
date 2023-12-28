import { ApiProperty } from '@nestjs/swagger';
import { Kyc } from '../kyc.entity';

export class KycDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly companyName: string;

  @ApiProperty()
  readonly mobile: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly pinCode: string;

  @ApiProperty()
  readonly vatNumber: string;

  @ApiProperty()
  readonly natureOfBusiness: string;

  @ApiProperty()
  readonly isLogisticServiceRequired: Boolean;

  @ApiProperty()
  readonly primaryPartnerName: string;

  @ApiProperty()
  readonly primaryPartnerMobile: string;

  @ApiProperty()
  readonly secondaryPartnerName: string;

  @ApiProperty()
  readonly secondaryPartnerMobile: string;

  @ApiProperty()
  readonly bankName: string;

  @ApiProperty()
  readonly bankAccountName: string;

  @ApiProperty()
  readonly accountNumber: string;

  @ApiProperty()
  readonly ifscCode: string;

  @ApiProperty()
  readonly authorisedPersonPrimary: string;

  @ApiProperty()
  readonly authorisedPersonSecondary: string;

  @ApiProperty()
  readonly authorisedPersonTertiary: string;

  @ApiProperty()
  readonly authorisedPersonQuaternary: string;

  @ApiProperty()
  readonly companyPan: string;

  @ApiProperty()
  readonly vatCertificate: string;

  @ApiProperty()
  readonly authorisedPersonPrimaryImage: string;

  @ApiProperty()
  readonly authorisedPersonSecondaryImage: string;

  @ApiProperty()
  readonly reasonreject:string;

  @ApiProperty()
  readonly isissued:string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly deletedAt: Date;

  constructor(kyc: Kyc) {
    this.id = kyc.id;
    this.userId = kyc.userId;
    this.name = kyc.name;
    this.companyName = kyc.companyName;
    this.mobile = kyc.mobile;
    this.email = kyc.email;
    this.address = kyc.address;
    this.city = kyc.city;
    this.pinCode = kyc.pinCode;
    this.vatNumber = kyc.vatNumber;
    this.natureOfBusiness = kyc.natureOfBusiness;
    this.isLogisticServiceRequired = kyc.isLogisticServiceRequired;
    this.primaryPartnerName = kyc.primaryPartnerName;
    this.primaryPartnerMobile = kyc.primaryPartnerMobile;
    this.secondaryPartnerName = kyc.secondaryPartnerName;
    this.secondaryPartnerMobile = kyc.secondaryPartnerMobile;
    this.bankName = kyc.bankName;
    this.bankAccountName = kyc.bankAccountName;
    this.accountNumber = kyc.accountNumber;
    this.ifscCode = kyc.ifscCode;
    this.authorisedPersonPrimary = kyc.authorisedPersonPrimary;
    this.authorisedPersonSecondary = kyc.authorisedPersonSecondary;
    this.authorisedPersonTertiary = kyc.authorisedPersonTertiary;
    this.authorisedPersonQuaternary = kyc.authorisedPersonQuaternary;
    this.companyPan = kyc.companyPan;
    this.vatCertificate = kyc.vatCertificate;
    this.authorisedPersonPrimaryImage = kyc.authorisedPersonPrimaryImage;
    this.authorisedPersonSecondaryImage = kyc.authorisedPersonSecondaryImage;
    this.reasonreject = kyc.reasonreject;
    this.isissued = kyc.isissued;
    this.createdAt = kyc.createdAt;
    this.updatedAt = kyc.updatedAt;
    this.deletedAt = kyc.deletedAt;
  }
}
