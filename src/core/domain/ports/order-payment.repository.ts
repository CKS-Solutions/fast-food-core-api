import { OrderPayment } from '@entities/order-payment';

export interface IOrderPaymentRepository {
  create(payment: OrderPayment): Promise<void>;
  get(id: string): Promise<OrderPayment | null>;
  getByOrderId(orderId: string): Promise<OrderPayment | null>;
  remove(id: string): Promise<void>;
}
