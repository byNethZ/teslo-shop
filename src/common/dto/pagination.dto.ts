import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    default: 10,
    description: 'The number of items to return',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
    description:
      'The number of items to skip before starting to collect the result set',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
