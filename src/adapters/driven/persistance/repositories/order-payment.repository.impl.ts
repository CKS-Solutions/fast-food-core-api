import { IOrderPaymentRepository } from '@ports/order-payment.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderPayment } from '@entities/order-payment';

@Injectable()
export class OrderPaymentRepository implements IOrderPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderPayment: OrderPayment): Promise<void> {
    await this.prisma.order_payment.create({
      data: {
        id: orderPayment.id,
        orderId: orderPayment.orderId,
        code: orderPayment.code,
        method: orderPayment.method,
        status: orderPayment.status,
        expiresAt: orderPayment.expiresAt,
      },
    });
  }

  async get(id: string): Promise<OrderPayment | null> {
    const orderPayment = await this.prisma.order_payment.findUnique({
      where: { id },
    });

    if (!orderPayment) {
      return null;
    }

    return OrderPayment.fromDatabase(orderPayment);
  }

  async getByOrderId(orderId: string): Promise<OrderPayment | null> {
    const orderPayment = await this.prisma.order_payment.findFirst({
      where: { orderId },
    });

    if (!orderPayment) {
      return null;
    }

    return OrderPayment.fromDatabase(orderPayment);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.order_payment.delete({
      where: { id },
    });
  }
}
