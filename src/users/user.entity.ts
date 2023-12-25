import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'Phone_number' })
  phoneNumber: string;

  @Column({ field: 'city' })
  city: string;

  @Column({ field: 'email' })
  email: string;

  @Column({ field: 'auth_token' })
  authToken: string;

  @Column({ field: 'role' })
  role: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
