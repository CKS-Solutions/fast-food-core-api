import { Cart } from '@entities/cart';

export interface ICartRepository {
  create(cart: Cart): Promise<void>;
  get(id: string): Promise<Cart | null>;
  update(id: string, cart: Cart): Promise<void>;
}
