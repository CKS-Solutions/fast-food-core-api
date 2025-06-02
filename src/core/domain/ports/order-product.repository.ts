import { OrderProduct } from '@entities/order-product';

export interface IOrderProductRepository {
  create(orderProduct: OrderProduct): Promise<void>;
}
