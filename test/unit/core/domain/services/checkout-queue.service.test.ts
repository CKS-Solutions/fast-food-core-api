import { CheckoutQueueService } from '@services/checkout-queue.service';

describe('CheckoutQueueService', () => {
  describe('when creating a new record to the queue', () => {
    it('should create a new record', () => {
      const record = new CheckoutQueueService().create(
        {
          paymentMethod: 'credit_card',
          products: [],
          customerId: '1',
        },
        100,
      );
      expect(record).toBeDefined();
    });

    it('should have a unique id', () => {
      const service = new CheckoutQueueService();
      const record1 = service.create(
        {
          paymentMethod: 'credit_card',
          products: [],
          customerId: '1',
        },
        100,
      );
      const record2 = service.create(
        {
          paymentMethod: 'credit_card',
          products: [],
          customerId: '1',
        },
        100,
      );
      expect(record1.id).not.toEqual(record2.id);
    });
  });
});
