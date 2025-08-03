import {
  DatabaseOrderPayment,
  PaymentMethod,
  PaymentStatus,
} from './order-payment.types';

export class OrderPayment {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly code: string,
    public readonly method: PaymentMethod,
    public readonly expiresAt: bigint,
    public status: PaymentStatus,
  ) {}

  static fromDatabase(data: DatabaseOrderPayment): OrderPayment {
    return new OrderPayment(
      data.id,
      data.orderId,
      data.code,
      data.method as PaymentMethod,
      data.expiresAt,
      data.status as PaymentStatus,
    );
  }
}
