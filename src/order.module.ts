import { Module } from '@nestjs/common';
import { OrderController } from '@controllers/order.controller';
import { OrderService } from '@services/order.service';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderPaymentService } from '@services/order-payment.service';
import { MercadoPagoAuthMock } from './adapters/driven/mercadopago/auth/auth.mock';
import { MercadoPagoQRCodeMock } from './adapters/driven/mercadopago/qrcode/qrcode.mock';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderPaymentService,
    OrderPaymentRepository,
    MercadoPagoAuthMock,
    MercadoPagoQRCodeMock,
  ],
})
export class OrderModule {}
