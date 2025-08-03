import { Order, OrderStatus } from '@entities/order';
import { OrderService } from '@services/order.service';

const service = new OrderService();

describe('sortOrdersByQueuePriority', () => {
  it('should return orders sorted by priority', () => {
    const orders: Order[] = [
      new Order(
        '1',
        'credit_card',
        OrderStatus.IN_PREPARATION,
        0,
        null,
        [],
        new Date('2025-01-01T00:00:00.000Z'),
      ),
      new Order(
        '2',
        'credit_card',
        OrderStatus.READY,
        0,
        null,
        [],
        new Date('2025-01-02T00:00:00.000Z'),
      ),
    ];

    const sortedOrders = service.sortOrdersByQueuePriority(orders);

    expect(sortedOrders[0].id).toBe('2');
    expect(sortedOrders[1].id).toBe('1');
  });
});
