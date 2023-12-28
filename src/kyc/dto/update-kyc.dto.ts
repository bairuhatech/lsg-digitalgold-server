import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional } from 'class-validator';

export class UpdateKycDto {
   @ApiProperty()
   @IsString()
   readonly isissued:string;

   @ApiProperty()
   @IsString()
   readonly reasonreject:string;
}
