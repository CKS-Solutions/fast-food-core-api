import { Order } from '@entities/order/order';
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@ports/order.repository';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: order.toDatabase(),
    });
  }

  async getOrders(
    filters?: Prisma.orderWhereInput,
    orderBy?: Prisma.orderOrderByWithRelationInput,
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: filters ?? {},
      orderBy: orderBy ?? {},
      include: {
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => Order.fromDatabase(order));
  }
}
