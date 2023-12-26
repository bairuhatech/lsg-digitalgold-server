import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;
}
