export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
}

export enum PaymentMethod {
  PIX = 'pix',
}

export type DatabaseCartPayment = {
  id: string;
  cartId: string;
  method: PaymentMethod;
  status: PaymentStatus;
};
