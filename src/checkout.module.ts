import { Module } from '@nestjs/common';
import { CheckoutController } from '@controllers/checkout.controller';
import { CheckoutQueueRepository } from '@repositories/checkout-queue.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { OrderProductRepository } from '@repositories/order-product.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { ProductRepository } from '@repositories/product.repository.impl';
import { CheckoutQueueService } from '@services/checkout-queue.service';
import { OrderProductService } from '@services/order-product.service';
import { OrderService } from '@services/order.service';

@Module({
  controllers: [CheckoutController],
  providers: [
    CheckoutQueueService,
    CheckoutQueueRepository,
    CustomerRepository,
    OrderRepository,
    OrderService,
    OrderProductRepository,
    OrderProductService,
    ProductRepository,
  ],
})
export class CheckoutModule {}
