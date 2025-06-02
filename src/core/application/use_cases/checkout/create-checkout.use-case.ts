import { HttpError } from '@error/http';
import { HttpStatus } from '@nestjs/common';
import { CheckoutQueueRepository } from '@repositories/checkout-queue.repository.impl';
import { OrderProductRepository } from '@repositories/order-product.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderProductService } from '@services/order-product.service';
import { OrderService } from '@services/order.service';

export class CreateCheckoutUseCase {
  constructor(
    private readonly checkoutQueueRepository: CheckoutQueueRepository,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly orderProductService: OrderProductService,
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute() {
    const queueRecord = await this.checkoutQueueRepository.getOldest();
    if (!queueRecord) {
      throw new HttpError(HttpStatus.NO_CONTENT, 'No record to process!');
    }

    const order = this.orderService.createOrderFromCheckoutQueue(queueRecord);
    await this.orderRepository.create(order);

    for (const product of queueRecord.products) {
      const orderProduct = this.orderProductService.create(
        order.id,
        product.productId,
        product.quantity,
      );
      await this.orderProductRepository.create(orderProduct);
    }

    await this.checkoutQueueRepository.remove(queueRecord.id);
  }
}
