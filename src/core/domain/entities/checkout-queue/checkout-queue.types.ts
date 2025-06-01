export type DatabaseCheckoutQueue = {
  id: string;
  customerId: string | null;
  paymentMethod: string;
  products: string;
  total: number;
  createdAt: Date;
};

export type DatabaseCheckoutQueueProduct = {
  productId: string;
  quantity: number;
};
