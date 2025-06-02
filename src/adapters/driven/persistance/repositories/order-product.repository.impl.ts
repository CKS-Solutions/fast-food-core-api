import { IOrderProductRepository } from '@ports/order-product.repository';
import { PrismaService } from '../prisma.service';
import { DatabaseOrderProduct } from '@entities/order-product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderProductRepository implements IOrderProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderProduct: DatabaseOrderProduct): Promise<void> {
    await this.prisma.order_product.create({
      data: {
        id: orderProduct.id,
        orderId: orderProduct.orderId,
        productId: orderProduct.productId,
        quantity: orderProduct.quantity,
      },
    });
  }
}
