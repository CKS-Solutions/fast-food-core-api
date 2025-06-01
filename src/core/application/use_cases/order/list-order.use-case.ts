import { OrderListDto } from '@dto/order-list.dto';
import { OrderDto } from '@dto/order.dto';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderService } from '@services/order.service';

@Injectable()
export class ListOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(filters: OrderListDto): Promise<OrderDto[]> {
    const filtersModel = this.orderService.convertFiltersToModel(filters);
    return await this.orderRepository.getOrders(filtersModel);
  }
}
