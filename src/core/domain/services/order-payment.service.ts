import { v4 as uuid } from 'uuid';
import {
  OrderPayment,
  PaymentMethod,
  PaymentStatus,
} from '@entities/order-payment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPaymentService {
  constructor() {}

  create(orderId: string, code: string, expiresAt: number): OrderPayment {
    return new OrderPayment(
      uuid(),
      orderId,
      code,
      PaymentMethod.PIX, // only pix for now
      BigInt(expiresAt),
      PaymentStatus.PENDING,
    );
  }
}
