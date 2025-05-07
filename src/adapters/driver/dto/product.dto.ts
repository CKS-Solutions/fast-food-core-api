import { ProductCategory } from '@entities/product.types';

export class ProductDto {
  constructor(
    public readonly category: ProductCategory,
    public description: string,
    public price: number,
    public quantity: number,
  ) {}
}
