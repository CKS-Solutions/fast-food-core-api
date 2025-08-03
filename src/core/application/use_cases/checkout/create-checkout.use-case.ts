import { CartStatus } from '@entities/cart';
import { HttpError } from '@error/http';
import { HttpStatus } from '@nestjs/common';
import { ICartProductRepository } from '@ports/cart-product.repository';
import { ICartRepository } from '@ports/cart.repository';
import { IOrderProductRepository } from '@ports/order-product.repository';
import { IOrderRepository } from '@ports/order.repository';
import { OrderProductService } from '@services/order-product.service';
import { OrderService } from '@services/order.service';

export class CreateCheckoutUseCase {
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly cartProductRepository: ICartProductRepository,
    private readonly orderProductRepository: IOrderProductRepository,
    private readonly orderProductService: OrderProductService,
    private readonly orderRepository: IOrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(id: string) {
    const cart = await this.cartRepository.get(id);
    if (!cart) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    if (cart.status !== CartStatus.OPEN) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'Cart is not open');
    }

    const cartProducts = await this.cartProductRepository.listByCartId(id);
    if (cartProducts.length === 0) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'Cart is empty');
    }

    const order = this.orderService.createFromCart(cart);
    await this.orderRepository.create(order);

    for (const cartProduct of cartProducts) {
      const orderProduct = this.orderProductService.create(
        order.id,
        cartProduct.productId,
        cartProduct.quantity,
      );

      await this.orderProductRepository.create(orderProduct);
    }

    cart.updateStatus(CartStatus.FINISHED);
    await this.cartRepository.update(cart.id, cart);

    return { id: order.id };
  }
}
