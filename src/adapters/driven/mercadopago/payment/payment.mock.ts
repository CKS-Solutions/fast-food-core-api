import { IMercadoPagoPayment } from '@ports/payment.mercadopago';
import { GetPaymentResponse } from './payment.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MercadoPagoPaymentMock implements IMercadoPagoPayment {
  constructor() {}

  async getPayment(
    paymentId: string,
    orderId: string,
  ): Promise<GetPaymentResponse | undefined> {
    console.info('MercadoPagoPaymentMock', paymentId, orderId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: paymentId,
      status: 'approved',
    };
  }
}
