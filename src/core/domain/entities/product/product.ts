import { DatabaseProduct, ProductCategory } from './product.types';

export class Product {
  constructor(
    public readonly id: string,
    public readonly category: ProductCategory,
    public description: string,
    public price: number,
    public quantity: number,
  ) {}

  decrementStock(quantity: number) {
    this.quantity -= quantity;
  }

  static fromDatabase(databaseProduct: DatabaseProduct): Product {
    return new Product(
      databaseProduct.id,
      databaseProduct.category as ProductCategory,
      databaseProduct.description,
      databaseProduct.price,
      databaseProduct.quantity,
    );
  }
}
