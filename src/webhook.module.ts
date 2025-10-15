import { WebhookController } from '@controllers/webhook.controller';
import { Module } from '@nestjs/common';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { MercadoPagoAuthMock } from './adapters/driven/mercadopago/auth/auth.mock';
import { MercadoPagoPaymentMock } from './adapters/driven/mercadopago/payment/payment.mock';
import { MercadoPagoPaymentUseCase } from '@usecases/webhook/mercadopago/payment';

@Module({
  controllers: [WebhookController],
  providers: [
    OrderRepository,
    OrderPaymentRepository,
    MercadoPagoAuthMock,
    MercadoPagoPaymentMock,
    MercadoPagoPaymentUseCase,
  ],
})
export class WebhookModule {}
