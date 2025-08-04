import { Order, OrderStatus } from '@entities/order';
import { HttpError } from '@error/http';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@repositories/order.repository.impl';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.get(id);

    if (!order) {
      throw new HttpError(404, 'Order not found');
    }

    if (order.status === status) {
      throw new HttpError(400, 'Order status is already updated');
    }

    order.changeStatus(status);

    return await this.orderRepository.update(id, order);
  }
}
