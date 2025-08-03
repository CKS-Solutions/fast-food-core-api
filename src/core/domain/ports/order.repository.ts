import { OrderDto } from '@dto/order.dto';
import { Order } from '@entities/order';

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  getOrders(filters: Partial<OrderDto>): Promise<Order[]>;
  get(id: string): Promise<Order | null>;
}
