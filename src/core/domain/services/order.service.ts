import { v4 as uuid } from 'uuid';
import { OrderListDto } from '@dto/order-list.dto';
import { Cart } from '@entities/cart';
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
    if (filters.status) orderFiltersModel.status = filters.status;

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

  createFromCart(cart: Cart): Order {
    return new Order(
      uuid(),
      OrderStatus.WAITING_PAYMENT,
      cart.total,
      cart.customerId,
    );
  }

  sortOrdersByQueuePriority(orders: Order[]): Order[] {
    const statusPriority = {
      [OrderStatus.READY]: 1,
      [OrderStatus.IN_PREPARATION]: 2,
      [OrderStatus.RECEIVED]: 3,
      [OrderStatus.WAITING_PAYMENT]: 4,
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
