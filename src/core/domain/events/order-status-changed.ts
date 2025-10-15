import { DomainEvent } from './domain-event';
import { OrderStatus } from '@entities/order/order.types';

export class OrderStatusChanged extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly newStatus: OrderStatus,
    public readonly previousStatus: OrderStatus,
  ) {
    super();
  }

  getEventName(): string {
    return 'OrderStatusChanged';
  }
}
