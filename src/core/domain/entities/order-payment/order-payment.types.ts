export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REJECTED = 'rejected',
  CANCELED = 'canceled',
}

export enum PaymentMethod {
  PIX = 'pix',
}

export type DatabaseOrderPayment = {
  id: string;
  orderId: string;
  code: string;
  method: string;
  status: string;
  expiresAt: bigint;
};
