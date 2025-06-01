import { FakeCheckoutController } from '@controllers/fake-checkout.controller';
import { Module } from '@nestjs/common';
import { CheckoutQueueRepository } from '@repositories/checkout-queue.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { CheckoutQueueService } from '@services/checkout-queue.service';

@Module({
  controllers: [FakeCheckoutController],
  providers: [
    CheckoutQueueService,
    CheckoutQueueRepository,
    CustomerRepository,
  ],
})
export class FakeCheckoutModule {}
