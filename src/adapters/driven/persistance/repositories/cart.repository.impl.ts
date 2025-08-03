import { ICartRepository } from '@ports/cart.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Cart } from '@entities/cart';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cart: Cart): Promise<void> {
    await this.prisma.cart.create({
      data: {
        id: cart.id,
        customerId: cart.customerId,
        total: cart.total,
        status: cart.status,
      },
    });
  }

  async get(id: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id,
      },
    });

    if (!cart) {
      return null;
    }

    return Cart.fromDatabase(cart);
  }

  async update(id: string, cart: Cart): Promise<void> {
    await this.prisma.cart.update({
      where: {
        id,
      },
      data: {
        customerId: cart.customerId,
        total: cart.total,
        status: cart.status,
      },
    });
  }
}
