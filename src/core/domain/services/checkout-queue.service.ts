import { v4 as uuid } from 'uuid';
import { CheckoutQueue } from '@entities/checkout-queue';
import { Injectable } from '@nestjs/common';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';

@Injectable()
export class CheckoutQueueService {
  constructor() {}

  create(fakeCheckoutDto: FakeCheckoutDto, total: number) {
    const id = uuid();
    return new CheckoutQueue(
      id,
      fakeCheckoutDto.paymentMethod,
      fakeCheckoutDto.products,
      total,
      fakeCheckoutDto.customerId,
    );
  }
}
