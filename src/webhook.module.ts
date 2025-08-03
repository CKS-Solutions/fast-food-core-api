import { WebhookController } from '@controllers/webhook.controller';
import { Module } from '@nestjs/common';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { MercadoPagoAuthMock } from './adapters/driven/mercadopago/auth/auth.mock';
import { MercadoPagoPaymentMock } from './adapters/driven/mercadopago/payment/payment.mock';

@Module({
  controllers: [WebhookController],
  providers: [
    OrderRepository,
    OrderPaymentRepository,
    MercadoPagoAuthMock,
    MercadoPagoPaymentMock,
  ],
})
export class WebhookModule {}
