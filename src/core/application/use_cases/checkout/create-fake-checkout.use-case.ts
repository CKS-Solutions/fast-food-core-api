import { HttpStatus } from '@nestjs/common';
import { HttpError } from '@error/http';

import { ICheckoutQueueRepository } from '@ports/checkout-queue.repository';
import { CheckoutQueueService } from '@services/checkout-queue.service';
import { ICustomerRepository } from '@ports/customer.repository';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';
import { IProductRepository } from '@ports/product.repository';
import { Product } from '@entities/product';

export class CreateFakeCheckoutUseCase {
  constructor(
    private readonly checkoutQueueRepository: ICheckoutQueueRepository,
    private readonly checkoutQueueService: CheckoutQueueService,
    private readonly customerRepository: ICustomerRepository,
    private readonly productRepository: IProductRepository,
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

    const productsFromDatabase: {
      databaseProduct: Product;
      stockToDecrease: number;
    }[] = [];
    for (const product of fakeCheckoutDto.products) {
      const databaseProduct = await this.productRepository.get(
        product.productId,
      );
      if (!databaseProduct) {
        throw new HttpError(HttpStatus.NOT_FOUND, 'Product not found');
      }

      if (databaseProduct.quantity < product.quantity) {
        throw new HttpError(HttpStatus.BAD_REQUEST, 'Product not available');
      }

      productsFromDatabase.push({
        databaseProduct,
        stockToDecrease: product.quantity,
      });
    }

    const checkoutQueue = this.checkoutQueueService.create(fakeCheckoutDto);

    await this.checkoutQueueRepository.save(checkoutQueue);

    for (const product of productsFromDatabase) {
      product.databaseProduct.decrementStock(product.stockToDecrease);
      await this.productRepository.update(
        product.databaseProduct.id,
        product.databaseProduct,
      );
    }
  }
}
