import { HttpStatus } from '@nestjs/common';
import { HttpError } from '@error/http';

import { ICheckoutQueueRepository } from '@ports/checkout-queue.repository';
import { CheckoutQueueService } from '@services/checkout-queue.service';
import { ICustomerRepository } from '@ports/customer.repository';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';

export class CreateFakeCheckoutUseCase {
  constructor(
    private readonly checkoutQueueRepository: ICheckoutQueueRepository,
    private readonly checkoutQueueService: CheckoutQueueService,
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(fakeCheckoutDto: FakeCheckoutDto) {
    if (fakeCheckoutDto.customerId) {
      const customer = await this.customerRepository.get(
        fakeCheckoutDto.customerId,
      );

      if (!customer) {
        throw new HttpError(HttpStatus.NOT_FOUND, 'Customer not found');
      }
    }

    const checkoutQueue = this.checkoutQueueService.create(fakeCheckoutDto);

    await this.checkoutQueueRepository.save(checkoutQueue);
  }
}
