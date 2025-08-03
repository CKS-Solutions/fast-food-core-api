import { CartStatus, DatabaseCart } from './cart.types';

export class Cart {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public total: number,
    public status: CartStatus,
  ) {}

  updateStatus(status: CartStatus) {
    if (status === this.status) {
      throw new Error('Cart status is already ' + status);
    }

    this.status = status;
  }

  static fromDatabase(cart: DatabaseCart): Cart {
    return new Cart(
      cart.id,
      cart.customerId ?? '',
      cart.total,
      cart.status as CartStatus,
    );
  }
}
