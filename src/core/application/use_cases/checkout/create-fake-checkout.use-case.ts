import { HttpStatus } from '@nestjs/common';
import { HttpError } from '@error/http';

import { ICustomerRepository } from '@ports/customer.repository';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';
import { IProductRepository } from '@ports/product.repository';
import { Product } from '@entities/product/product';
import { PaymentMethod } from '@entities/cart-payment';
import { CartService } from '@services/cart.service';
import { ICartRepository } from '@ports/cart.repository';
import { CartProductService } from '@services/cart-product.service';
import { ICartProductRepository } from '@ports/cart-product.repository';

export class CreateFakeCheckoutUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly productRepository: IProductRepository,
    private readonly cartService: CartService,
    private readonly cartRepository: ICartRepository,
    private readonly cartProductService: CartProductService,
    private readonly cartProductRepository: ICartProductRepository,
  ) {}

  async execute(fakeCheckoutDto: FakeCheckoutDto) {
    if (fakeCheckoutDto.paymentMethod !== PaymentMethod.PIX) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        'Only pix payment method is supported for fake checkout',
      );
    }

    if (fakeCheckoutDto.customerId) {
      const customer = await this.customerRepository.get(
        fakeCheckoutDto.customerId,
      );

      if (!customer) {
        throw new HttpError(HttpStatus.NOT_FOUND, 'Customer not found');
      }
    }

    let total = 0;
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

      total += product.quantity * databaseProduct.price;

      productsFromDatabase.push({
        databaseProduct,
        stockToDecrease: product.quantity,
      });
    }

    const cart = this.cartService.create(
      fakeCheckoutDto.customerId ?? '',
      total,
    );

    await this.cartRepository.create(cart);

    for (const product of productsFromDatabase) {
      product.databaseProduct.decrementStock(product.stockToDecrease);

      const cartProduct = this.cartProductService.create(
        cart.id,
        product.databaseProduct.id,
        product.stockToDecrease,
      );

      await this.cartProductRepository.create(cartProduct);

      await this.productRepository.update(
        product.databaseProduct.id,
        product.databaseProduct,
      );
    }

    return { id: cart.id };
  }
}
