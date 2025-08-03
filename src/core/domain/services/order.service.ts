import { OrderListDto } from '@dto/order-list.dto';
import { CheckoutQueue } from '@entities/checkout-queue';
import { Order } from '@entities/order/order';
import { OrderStauts } from '@entities/order/order.types';
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
    if (filters.status) orderFiltersModel.status = filters.status;

    return orderFiltersModel;
  }

  getWhereInput(): Prisma.orderWhereInput {
    return {
      status: {
        not: OrderStauts.FINISHED,
        in: [
          OrderStauts.READY,
          OrderStauts.IN_PREPARATION,
          OrderStauts.RECEIVED,
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
      OrderStauts.CREATED,
      checkoutQueue.total,
      checkoutQueue.customerId,
    );
  }

  sortOrdersByQueuePriority(orders: Order[]): Order[] {
    const statusPriority = {
      [OrderStauts.READY]: 1,
      [OrderStauts.IN_PREPARATION]: 2,
      [OrderStauts.RECEIVED]: 3,
      [OrderStauts.CREATED]: 4,
      [OrderStauts.CANCELLED]: 5,
      [OrderStauts.FINISHED]: 6,
    };

    return orders.sort((a, b) => {
      const priorityA = statusPriority[a.status];
      const priorityB = statusPriority[b.status];

      return priorityA - priorityB;
    });
  }
}
