import { Module } from '@nestjs/common';

import { OrderProductRepository } from '@repositories/order-product.repository.impl';
import { CartProductRepository } from '@repositories/cart-product.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { ProductRepository } from '@repositories/product.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { CartRepository } from '@repositories/cart.repository.impl';

import { OrderProductService } from '@services/order-product.service';
import { CartProductService } from '@services/cart-product.service';
import { OrderService } from '@services/order.service';
import { CartService } from '@services/cart.service';

import { CheckoutController } from '@controllers/checkout.controller';

@Module({
  controllers: [CheckoutController],
  providers: [
    CustomerRepository,
    OrderRepository,
    OrderService,
    OrderProductRepository,
    OrderProductService,
    ProductRepository,
    CartService,
    CartRepository,
    CartProductService,
    CartProductRepository,
  ],
})
export class CheckoutModule {}
