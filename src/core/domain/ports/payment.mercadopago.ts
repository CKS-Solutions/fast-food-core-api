import { GetPaymentResponse } from 'src/adapters/driven/mercadopago/payment/payment.types';

export interface IMercadoPagoPayment {
  getPayment(
    paymentId: string,
    orderId: string,
  ): Promise<GetPaymentResponse | undefined>;
}
