import { HttpError } from '@error/http';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IOrderPaymentRepository } from '@ports/order-payment.repository';
import { IOrderRepository } from '@ports/order.repository';

@Injectable()
export class GetPaymentStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly orderPaymentRepository: IOrderPaymentRepository,
  ) {}

  async execute(orderId: string) {
    const order = await this.orderRepository.get(orderId);
    if (!order) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Order not found');
    }

    const orderPayment =
      await this.orderPaymentRepository.getByOrderId(orderId);

    if (!orderPayment) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Order payment not found');
    }

    return { status: orderPayment.status };
  }
}
