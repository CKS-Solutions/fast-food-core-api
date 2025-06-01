import { OrderDto } from '@dto/order.dto';

export interface IOrderRepository {
  getOrders(filters: Partial<OrderDto>): Promise<OrderDto[]>;
}
