import { DatabaseOrder, OrderStauts } from './order.types';

export class Order {
  public readonly createdAt: Date;

  constructor(
    public id: string,
    public paymentMethod: string,
    public status: OrderStauts,
    public total: number,
    public customerId: string | null,
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date();
  }

  static fromDatabase(order: DatabaseOrder): Order {
    return new Order(
      order.id,
      order.paymentMethod,
      order.status as OrderStauts,
      order.total,
      order.customerId ?? null,
      order.createdAt,
    );
  }
}
