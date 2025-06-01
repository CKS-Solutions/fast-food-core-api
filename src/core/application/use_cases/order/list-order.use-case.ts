import { OrderListDto } from '@dto/order-list.dto';
import { Order } from '@entities/order';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderService } from '@services/order.service';

@Injectable()
export class ListOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(filters: OrderListDto): Promise<Order[]> {
    const filtersModel = this.orderService.convertFiltersToModel(filters);
    return await this.orderRepository.getOrders(filtersModel);
  }
}
