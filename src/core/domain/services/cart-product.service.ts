import { v4 as uuid } from 'uuid';
import { CartProduct } from '@entities/cart-product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartProductService {
  constructor() {}

  create(cartId: string, productId: string, quantity: number): CartProduct {
    return new CartProduct(uuid(), cartId, productId, quantity);
  }
}
