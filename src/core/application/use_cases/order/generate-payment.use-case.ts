import { OrderStatus } from '@entities/order';
import { PaymentStatus } from '@entities/order-payment';
import { HttpError } from '@error/http';
import { HttpStatus } from '@nestjs/common';
import { IMercadoPagoAuth } from '@ports/auth.mercadopago';

import { IOrderPaymentRepository } from '@ports/order-payment.repository';
import { IOrderRepository } from '@ports/order.repository';
import { IMercadoPagoQRCode } from '@ports/qrcode.mercadopago';
import { OrderPaymentService } from '@services/order-payment.service';

const THIRTY_MINUTES = 1000 * 60 * 30;

export class GeneratePaymentUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly orderPaymentRepository: IOrderPaymentRepository,
    private readonly orderPaymentService: OrderPaymentService,
    private readonly mpAuthService: IMercadoPagoAuth,
    private readonly mpQRCodeService: IMercadoPagoQRCode,
  ) {}

  async execute(orderId: string) {
    const order = await this.orderRepository.get(orderId);
    if (!order) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Order not found');
    }

    if (order.status !== OrderStatus.WAITING_PAYMENT) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'Order not waiting payment');
    }

    const payment = await this.orderPaymentRepository.getByOrderId(order.id);
    if (payment) {
      if (payment.status === PaymentStatus.PAID) {
        throw new HttpError(HttpStatus.BAD_REQUEST, 'Order already paid');
      }

      if (payment.expiresAt > Date.now()) {
        return { code: payment.code };
      }

      await this.orderPaymentRepository.remove(payment.id);
    }

    const token = await this.mpAuthService.generateToken();
    if (!token) {
      throw new HttpError(
        HttpStatus.PRECONDITION_FAILED,
        'Could not generate token',
      );
    }

    const expiresAt = Date.now() + THIRTY_MINUTES;
    const qrCodeResponse = await this.mpQRCodeService.generateQRCode(
      {
        title: `Pagamento do pedido ${order.id}`,
        description: `Pagamento do pedido ${order.id}`,
        total_amount: order.total,
        external_reference: `${order.id}-${Date.now()}`,
        expiration_date: new Date(expiresAt).toISOString(),
        notification_url: '',
        items: [
          {
            title: `Pagamento do pedido ${order.id}`,
            description: `Pagamento do pedido ${order.id}`,
            unit_price: order.total,
            quantity: 1,
            total_amount: order.total,
          },
        ],
      },
      token,
    );
    if (!qrCodeResponse) {
      throw new HttpError(
        HttpStatus.SERVICE_UNAVAILABLE,
        'Could not generate QR Code',
      );
    }

    const newPayment = this.orderPaymentService.create(
      order.id,
      qrCodeResponse.qr_data,
      expiresAt,
    );

    await this.orderPaymentRepository.create(newPayment);

    return { code: newPayment.code };
  }
}
