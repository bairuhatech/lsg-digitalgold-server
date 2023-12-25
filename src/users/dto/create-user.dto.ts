import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    readonly name: string;
    
    @ApiProperty()
    @IsString()
    readonly phoneNumber: string;
    
    @ApiProperty()
    @IsString()
    readonly city: string;
    
    @ApiProperty()
    @IsOptional()
    readonly email: string;
    
    @ApiProperty()
    @IsOptional()
    readonly authToken: string;
}
