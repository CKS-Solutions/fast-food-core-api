import { DatabaseCheckoutQueue, DatabaseCheckoutQueueProduct } from './';

export class CheckoutQueue {
  public readonly createdAt: Date;

  constructor(
    public readonly id: string,
    public readonly paymentMethod: string,
    public readonly products: DatabaseCheckoutQueueProduct[],
    public readonly total: number,
    public readonly customerId: string | null,
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date();
  }

  toDatabase(): DatabaseCheckoutQueue {
    return {
      id: this.id,
      customerId: this.customerId,
      paymentMethod: this.paymentMethod,
      products: JSON.stringify(this.products),
      total: this.total,
      createdAt: this.createdAt,
    };
  }

  static fromDatabase(
    databaseCheckoutQueue: DatabaseCheckoutQueue,
  ): CheckoutQueue {
    return new CheckoutQueue(
      databaseCheckoutQueue.id,
      databaseCheckoutQueue.paymentMethod,
      JSON.parse(
        databaseCheckoutQueue.products,
      ) as DatabaseCheckoutQueueProduct[],
      databaseCheckoutQueue.total,
      databaseCheckoutQueue.customerId,
      databaseCheckoutQueue.createdAt,
    );
  }
}
