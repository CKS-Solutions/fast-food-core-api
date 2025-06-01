import { v4 as uuid } from 'uuid';
import { CheckoutQueue } from '@entities/checkout-queue';
import { Injectable } from '@nestjs/common';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';

@Injectable()
export class CheckoutQueueService {
  constructor() {}

  create(fakeCheckoutDto: FakeCheckoutDto) {
    const id = uuid();
    return new CheckoutQueue(
      id,
      fakeCheckoutDto.paymentMethod,
      fakeCheckoutDto.products,
      fakeCheckoutDto.total,
      fakeCheckoutDto.customerId,
    );
  }
}
