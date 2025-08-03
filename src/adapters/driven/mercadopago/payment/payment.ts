import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { GetPaymentResponse } from './payment.types';

@Injectable()
export class MercadoPagoPayment {
  constructor() {}

  async getPayment(
    paymentId: string,
    token: string,
  ): Promise<GetPaymentResponse | undefined> {
    try {
      const { data } = await axios.post<GetPaymentResponse>(
        `${BASE_URL}/v1/payments/${paymentId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.error('Error on get payment data mercadopago:', error);
      return undefined;
    }
  }
}
