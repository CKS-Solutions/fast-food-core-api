import { Injectable } from '@nestjs/common';

import { ICheckoutQueueRepository } from '@ports/checkout-queue.repository';
import { CheckoutQueue } from '@entities/checkout-queue/checkout-queue';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CheckoutQueueRepository implements ICheckoutQueueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(checkoutQueue: CheckoutQueue): Promise<void> {
    await this.prisma.checkout_queue.create({
      data: {
        id: checkoutQueue.id,
        paymentMethod: checkoutQueue.paymentMethod,
        products: JSON.stringify(checkoutQueue.products),
        total: checkoutQueue.total,
        customerId: checkoutQueue.customerId,
        customer: undefined,
      },
    });
  }

  async getOldest(): Promise<CheckoutQueue | undefined> {
    const checkoutQueue = await this.prisma.checkout_queue.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!checkoutQueue) {
      return undefined;
    }

    return CheckoutQueue.fromDatabase(checkoutQueue);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.checkout_queue.delete({
      where: {
        id,
      },
    });
  }
}
