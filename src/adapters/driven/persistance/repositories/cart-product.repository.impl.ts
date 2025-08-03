import { ICartProductRepository } from '@ports/cart-product.repository';
import { CartProduct } from '@entities/cart-product';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartProductRepository implements ICartProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cartProduct: CartProduct): Promise<void> {
    await this.prisma.cart_product.create({
      data: {
        id: cartProduct.id,
        cartId: cartProduct.cartId,
        productId: cartProduct.productId,
        quantity: cartProduct.quantity,
      },
    });
  }
}
