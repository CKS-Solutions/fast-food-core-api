import { ProductCategory } from '@entities/product.types';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ enum: ProductCategory })
  public readonly category: ProductCategory;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly price: number;

  @ApiProperty()
  public readonly quantity: number;

  constructor(
    category: ProductCategory,
    description: string,
    price: number,
    quantity: number,
  ) {
    this.category = category;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
