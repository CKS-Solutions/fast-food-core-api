import {
  DatabaseOrder,
  DatabaseOrderWithProducts,
  OrderStauts,
} from './order.types';
import { Product } from '../product';

export class Order {
  public readonly createdAt: Date;

  constructor(
    public id: string,
    public paymentMethod: string,
    public status: OrderStauts,
    public total: number,
    public customerId: string | null,
    public products: {
      product: Product;
      quantity: number;
    }[],
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date();
  }

  toDatabase(): DatabaseOrder {
    return {
      id: this.id,
      customerId: this.customerId,
      paymentMethod: this.paymentMethod,
      status: this.status,
      total: this.total,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }

  static fromDatabase(order: DatabaseOrderWithProducts): Order {
    return new Order(
      order.id,
      order.paymentMethod,
      order.status as OrderStauts,
      order.total,
      order.customerId ?? null,
      order.order_product.map((orderProduct) => ({
        product: Product.fromDatabase(orderProduct.product),
        quantity: orderProduct.quantity,
      })),
      order.createdAt,
    );
  }
}
