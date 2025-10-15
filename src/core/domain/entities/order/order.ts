/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  DatabaseOrder,
  DatabaseOrderWithProducts,
  OrderStatus,
} from './order.types';
import { DomainEvents } from '@events/domain-events';
import { OrderStatusChanged } from '@events/order-status-changed';

export class Order {
  public readonly createdAt: Date;

  constructor(
    public id: string,
    public status: OrderStatus,
    public total: number,
    public customerId: string | null,
    public products?: {
      product: string;
      quantity: number;
    }[],
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date();
  }

  changeStatus(status: OrderStatus) {
    const previousStatus = this.status;
    this.status = status;

    // Emit domain event
    DomainEvents.raise(new OrderStatusChanged(this.id, status, previousStatus));
  }

  toDatabase(): DatabaseOrder {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      total: this.total,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }

  static fromDatabase(order: DatabaseOrderWithProducts): Order {
    return new Order(
      order.id,
      order.status as OrderStatus,
      order.total,
      order.customerId ?? null,
      order.order_product.map((orderProduct) => ({
        product: orderProduct.product.description,
        quantity: orderProduct.quantity,
      })),
      order.createdAt,
    );
  }
}
