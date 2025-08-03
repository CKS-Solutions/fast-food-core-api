import { OrderListDto } from '@dto/order-list.dto';
import { CheckoutQueue } from '@entities/checkout-queue';
import { Order } from '@entities/order/order';
import { OrderStatus } from '@entities/order/order.types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor() {}

  convertFiltersToModel(filters: OrderListDto): Partial<Order> {
    const orderFiltersModel: Partial<Order> = {};

    if (filters.customerId) orderFiltersModel.customerId = filters.customerId;
    if (filters.paymentMethod)
      orderFiltersModel.paymentMethod = filters.paymentMethod;
    if (filters.status)
      orderFiltersModel.status = filters.status as OrderStatus;

    return orderFiltersModel;
  }

  getWhereInput(): Prisma.orderWhereInput {
    return {
      status: {
        not: OrderStatus.FINISHED,
        in: [
          OrderStatus.READY,
          OrderStatus.IN_PREPARATION,
          OrderStatus.RECEIVED,
        ],
      },
    };
  }

  getOrderBy(): Prisma.orderOrderByWithRelationInput {
    return {
      createdAt: 'asc',
    };
  }

  createOrderFromCheckoutQueue(checkoutQueue: CheckoutQueue): Order {
    return new Order(
      checkoutQueue.id,
      checkoutQueue.paymentMethod,
      OrderStatus.CREATED,
      checkoutQueue.total,
      checkoutQueue.customerId,
    );
  }

  sortOrdersByQueuePriority(orders: Order[]): Order[] {
    const statusPriority = {
      [OrderStatus.READY]: 1,
      [OrderStatus.IN_PREPARATION]: 2,
      [OrderStatus.RECEIVED]: 3,
      [OrderStatus.CREATED]: 4,
      [OrderStatus.CANCELLED]: 5,
      [OrderStatus.FINISHED]: 6,
    };

    return orders.sort((a, b) => {
      const priorityA = statusPriority[a.status];
      const priorityB = statusPriority[b.status];

      return priorityA - priorityB;
    });
  }
}
