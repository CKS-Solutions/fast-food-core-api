import { DatabaseCartProduct } from './cart-product.types';

export class CartProduct {
  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly productId: string,
    public quantity: number,
  ) {}

  static fromDatabase(cartProduct: DatabaseCartProduct): CartProduct {
    return new CartProduct(
      cartProduct.id,
      cartProduct.cartId,
      cartProduct.productId,
      cartProduct.quantity,
    );
  }
}
