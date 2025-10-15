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

  async execute(): Promise<Order[]> {
    const where = this.orderService.getWhereInput();
    const orderBy = this.orderService.getOrderBy();
    const orders = await this.orderRepository.getOrders(where, orderBy);

    return this.orderService.sortOrdersByQueuePriority(orders);
  }
}
