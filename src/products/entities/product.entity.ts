import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '3d5eb630-0a69-474e-b415-fb389892d21c',
    description: 'Unique identifier',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Nike Air Max 90',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 150,
    description: 'Price of the product',
    default: 0,
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example:
      'The Nike Air Max 90 is a shoe that has successfully stood the test of time.',
    description: 'Product description',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'nike_air_max_90',
    description: 'Product slug',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Number of items in stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['g', 'l', 'm'],
    description: 'Product colors',
    isArray: true,
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: ['male', 'female', 'unisex'],
    description: 'Type Gender Product',
  })
  @Column('text')
  gender: string;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  checkSlug() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeInsert()
  checkSlugOnInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.checkSlug();
  }

  @BeforeUpdate()
  checkSlugOnUpdate() {
    this.checkSlug();
  }

  @ApiProperty({
    example: ['nike', 'shoes', 'airmax'],
    description: 'Product tags',
    isArray: true,
    default: [],
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];
}
