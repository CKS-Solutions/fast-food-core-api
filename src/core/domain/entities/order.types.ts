import { DatabaseProduct } from './product.types';

export enum OrderStauts {
  PENDING = 'pending',
  PAID = 'paid',
}

export type DatabaseOrder = {
  id: string;
  customerId: string | null;
  paymentMethod: string;
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
