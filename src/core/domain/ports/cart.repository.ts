import { Cart } from '@entities/cart';

export interface ICartRepository {
  create(cart: Cart): Promise<void>;
}
