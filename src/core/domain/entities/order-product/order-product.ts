import { DatabaseOrderProduct } from './order-product.types';

export class OrderProduct {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {}

  toDatabase(): DatabaseOrderProduct {
    return {
      id: this.id,
      orderId: this.orderId,
      productId: this.productId,
      quantity: this.quantity,
    };
  }

  static fromDatabase(
    databaseOrderProduct: DatabaseOrderProduct,
  ): OrderProduct {
    return new OrderProduct(
      databaseOrderProduct.id,
      databaseOrderProduct.orderId,
      databaseOrderProduct.productId,
      databaseOrderProduct.quantity,
    );
  }
}
