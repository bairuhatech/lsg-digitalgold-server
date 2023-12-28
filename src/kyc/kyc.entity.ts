import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'kyc',
})
export class Kyc extends Model<Kyc> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  userId: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'company_name' })
  companyName: string;

  @Column({ field: 'mobile' })
  mobile: string;

  @Column({ field: 'email' })
  email: string;

  @Column({ field: 'address' })
  address: string;

  @Column({ field: 'city' })
  city: string;

  @Column({ field: 'pin_code' })
  pinCode: string;

  @Column({ field: 'vat_no' })
  vatNumber: string;

  @Column({ field: 'nature_of_business' })
  natureOfBusiness: string;

  @Column({ field: 'is_logistic_service_required' })
  isLogisticServiceRequired: Boolean;

  @Column({ field: 'primary_partner_name' })
  primaryPartnerName: string;

  @Column({ field: 'primary_partner_mobile' })
  primaryPartnerMobile: string;

  @Column({ field: 'secondary_partner_name' })
  secondaryPartnerName: string;

  @Column({ field: 'secondary_partner_mobile' })
  secondaryPartnerMobile: string;

  @Column({ field: 'bank_name' })
  bankName: string;

  @Column({ field: 'bank_account_name' })
  bankAccountName: string;

  @Column({ field: 'account_number' })
  accountNumber: string;

  @Column({ field: 'ifsc_code' })
  ifscCode: string;

  @Column({ field: 'authorised_person_primary' })
  authorisedPersonPrimary: string;

  @Column({ field: 'authorised_person_secondary' })
  authorisedPersonSecondary: string;

  @Column({ field: 'authorised_person_tertiary' })
  authorisedPersonTertiary: string;

  @Column({ field: 'authorised_person_quaternary' })
  authorisedPersonQuaternary: string;

  @Column({ field: 'company_pan' })
  companyPan: string;

  @Column({ field: 'authorised_person_quaternary' })
  vatCertificate: string;

  @Column({ field: 'authorised_person_primary_image' })
  authorisedPersonPrimaryImage: string;

  @Column({ field: 'authorised_person_secondary_image' })
  authorisedPersonSecondaryImage: string;

  @Column({field: 'isissued'})
  isissued:string;

  @Column({ field: 'reasonreject'})
  reasonreject:string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;


  @BelongsTo(() => User)
  user: User;
}
