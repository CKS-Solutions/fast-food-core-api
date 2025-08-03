import { DatabaseProduct } from '../product';

export enum OrderStatus {
  WAITING_PAYMENT = 'waiting_payment',
  RECEIVED = 'received',
  IN_PREPARATION = 'in_preparation',
  READY = 'ready',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

export type DatabaseOrder = {
  id: string;
  customerId: string | null;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DatabaseOrderWithProducts = DatabaseOrder & {
  order_product: {
    product: DatabaseProduct;
    quantity: number;
  }[];
};
