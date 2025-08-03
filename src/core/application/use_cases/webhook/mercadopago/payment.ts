import { OrderStatus } from '@entities/order';
import { PaymentStatus } from '@entities/order-payment';
import { HttpError } from '@error/http';
import { HttpStatus } from '@nestjs/common';
import { IMercadoPagoAuth } from '@ports/auth.mercadopago';

import { IOrderPaymentRepository } from '@ports/order-payment.repository';
import { IOrderRepository } from '@ports/order.repository';
import { IMercadoPagoPayment } from '@ports/payment.mercadopago';

export class MercadoPagoPaymentUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly orderPaymentRepository: IOrderPaymentRepository,
    private readonly mpAuthService: IMercadoPagoAuth,
    private readonly mpPaymentService: IMercadoPagoPayment,
  ) {}

  async execute(orderId: string, paymentId: string) {
    try {
      const order = await this.orderRepository.get(orderId);
      if (!order) {
        throw new HttpError(HttpStatus.NOT_FOUND, 'Order not found');
      }

      if (order.status !== OrderStatus.WAITING_PAYMENT) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          'Order is not in waiting payment status',
        );
      }

      const orderPayment =
        await this.orderPaymentRepository.getByOrderId(orderId);

      if (!orderPayment) {
        throw new HttpError(HttpStatus.NOT_FOUND, 'Order payment not found');
      }

      const token = await this.mpAuthService.generateToken();
      if (!token) {
        throw new HttpError(
          HttpStatus.PRECONDITION_FAILED,
          'Could not generate token',
        );
      }

      const payment = await this.mpPaymentService.getPayment(paymentId, token);
      if (!payment) {
        throw new HttpError(
          HttpStatus.PRECONDITION_FAILED,
          'Could not get payment',
        );
      }

      const newStatus = this.translatePaymentStatus(payment.status);
      if (newStatus === orderPayment.status) {
        console.info('Payment status is already up to date');
        return;
      }

      orderPayment.changeStatus(newStatus);
      await this.orderPaymentRepository.update(orderPayment.id, orderPayment);

      if (newStatus === PaymentStatus.PAID) {
        order.changeStatus(OrderStatus.RECEIVED);
        await this.orderRepository.update(order.id, order);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        console.error('Error processing mp payment webhook:', error.message);
        return;
      }

      console.error('Error processing mp payment webhook:', error);
    }
  }

  private translatePaymentStatus(status: string): PaymentStatus {
    switch (status) {
      case 'pending':
      case 'authorized':
      case 'in_process':
        return PaymentStatus.PENDING;
      case 'approved':
      case 'in_mediation':
        return PaymentStatus.PAID;
      case 'cancelled':
      case 'refunded':
      case 'charged_back':
        return PaymentStatus.CANCELED;
      default:
        return PaymentStatus.REJECTED;
    }
  }
}
