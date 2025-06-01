import { OrderDto } from '@dto/order.dto';
import { Order } from '@entities/order';
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@ports/order.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(filters: Partial<OrderDto>): Promise<OrderDto[]> {
    const orders = await this.prisma.order.findMany({
      where: filters,
    });

    return orders.map((order) => Order.fromDatabase(order));
  }
}
