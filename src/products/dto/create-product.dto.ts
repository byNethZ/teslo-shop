import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Nike Air Max 90',
    description: 'Product title',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 150,
    description: 'Price of the product',
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example:
      'The Nike Air Max 90 is a shoe that has successfully stood the test of time.',
    description: 'Product description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'nike-air-max-90',
    description: 'Product slug',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 10,
    description: 'Number of items in stock',
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['g', 'l', 'm'],
    description: 'Product colors',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({})
  @IsIn(['men', 'women', 'kids', 'unisex'])
  gender: string;

  @ApiProperty({
    example: ['running', 'fitness'],
    description: 'Product tags',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product images',
    isArray: true,
    format: 'image',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
