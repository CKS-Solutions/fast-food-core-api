import { CartProduct } from '@entities/cart-product';

export interface ICartProductRepository {
  create(cartProduct: CartProduct): Promise<void>;
}
