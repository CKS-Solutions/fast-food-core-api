import { OrderDto } from '@dto/order.dto';
import { Order } from '@entities/order/order';

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  getOrders(filters: Partial<OrderDto>): Promise<Order[]>;
}
