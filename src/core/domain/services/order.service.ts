import { OrderListDto } from '@dto/order-list.dto';
import { CheckoutQueue } from '@entities/checkout-queue';
import { Order } from '@entities/order/order';
import { OrderStauts } from '@entities/order/order.types';
import { Injectable } from '@nestjs/common';

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

  createOrderFromCheckoutQueue(checkoutQueue: CheckoutQueue): Order {
    return new Order(
      checkoutQueue.id,
      checkoutQueue.paymentMethod,
      OrderStauts.CREATED,
      checkoutQueue.total,
      checkoutQueue.customerId,
    );
  }
}
