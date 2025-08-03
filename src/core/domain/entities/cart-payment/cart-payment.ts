import { PaymentMethod, PaymentStatus } from './cart-payment.types';

export class CartPayment {
  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly method: PaymentMethod,
    public status: PaymentStatus,
  ) {}
}
