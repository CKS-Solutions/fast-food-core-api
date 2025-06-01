import { CheckoutQueue } from '@entities/checkout-queue/checkout-queue';

export interface ICheckoutQueueRepository {
  // getOldest(): Promise<CheckoutQueue | undefined>;
  save(checkoutQueue: CheckoutQueue): Promise<void>;
}
