import { Order } from '@entities/order/order';
import { Prisma } from '@prisma/client';

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  getOrders(
    filters?: Prisma.orderWhereInput,
    orderBy?: Prisma.orderOrderByWithRelationInput,
  ): Promise<Order[]>;
  get(id: string): Promise<Order | null>;
  update(id: string, data: Order): Promise<Order>;
}
