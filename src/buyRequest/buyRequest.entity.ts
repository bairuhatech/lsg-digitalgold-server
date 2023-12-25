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
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { BuyRequestType } from '../shared/enum/request-type.enum';

@Table({
  tableName: 'buyRequest',
})
export class BuyRequest extends Model<BuyRequest> {
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

  @Column({
    field: 'type',
    type: DataType.ENUM(...Object.values(BuyRequestType)),
  })
  type: BuyRequestType;

  @Column({ field: 'metal' })
  metal: string;

  @Column({ field: 'price' })
  price: string;

  @Column({ field: 'gram' })
  gram: string;

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
