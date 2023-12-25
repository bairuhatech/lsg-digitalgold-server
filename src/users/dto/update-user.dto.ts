import { Gender } from './../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsISO8601 } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly phoneNumber?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly city?: Gender;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly role?: number;
}
