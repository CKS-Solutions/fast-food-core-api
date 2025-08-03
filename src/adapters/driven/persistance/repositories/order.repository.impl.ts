import { OrderDto } from '@dto/order.dto';
import { Order } from '@entities/order/order';
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@ports/order.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: order.toDatabase(),
    });
  }

  async getOrders(filters: Partial<OrderDto>): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: filters,
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
      where: {
        id,
      },
      include: {
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return Order.fromDatabase(order);
  }
}
