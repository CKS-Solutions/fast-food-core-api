import { OrderListDto } from '@dto/order-list.dto';
import { Order } from '@entities/order';
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
}
