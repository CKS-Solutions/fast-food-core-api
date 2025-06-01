import { OrderDto } from '@dto/order.dto';
import { Order } from '@entities/order';

export interface IOrderRepository {
  getOrders(filters: Partial<OrderDto>): Promise<Order[]>;
}
