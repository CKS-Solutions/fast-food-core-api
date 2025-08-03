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

  async get(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });
    return order ? Order.fromDatabase(order) : null;
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data,
      include: {
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });

    return Order.fromDatabase(updatedOrder);
  }
}
