import { Module } from '@nestjs/common';
import { OrderController } from '@controllers/order.controller';
import { OrderService } from '@services/order.service';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderPaymentService } from '@services/order-payment.service';
import { MercadoPagoAuth } from './adapters/driven/mercadopago/auth/auth';
import { MercadoPagoQRCode } from './adapters/driven/mercadopago/qrcode/qrcode';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderPaymentService,
    OrderPaymentRepository,
    MercadoPagoAuth,
    MercadoPagoQRCode,
  ],
})
export class OrderModule {}
