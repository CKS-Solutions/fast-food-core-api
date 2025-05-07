import { UUID } from 'crypto';
import { ProductCategory } from './product.types';

export class Product {
  constructor(
    public readonly id: UUID,
    public readonly category: ProductCategory,
    public description: string,
    public price: number,
    public quantity: number,
  ) {}

  decrementStock(quantity: number) {
    this.quantity -= quantity;
  }
}
