import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly phoneNumber: string;

    @ApiProperty()
    @IsString()
    readonly city: string;

}
