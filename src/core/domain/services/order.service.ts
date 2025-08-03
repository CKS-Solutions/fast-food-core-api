import { v4 as uuid } from 'uuid';
import { OrderListDto } from '@dto/order-list.dto';
import { Cart } from '@entities/cart';
import { Order } from '@entities/order/order';
import { OrderStatus } from '@entities/order/order.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor() {}

  convertFiltersToModel(filters: OrderListDto): Partial<Order> {
    const orderFiltersModel: Partial<Order> = {};

    if (filters.customerId) orderFiltersModel.customerId = filters.customerId;
    if (filters.status) orderFiltersModel.status = filters.status;

    return orderFiltersModel;
  }

  createFromCart(cart: Cart): Order {
    return new Order(
      uuid(),
      OrderStatus.WAITING_PAYMENT,
      cart.total,
      cart.customerId,
    );
  }
}
