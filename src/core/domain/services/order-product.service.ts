import { v4 as uuid } from 'uuid';
import { OrderProduct } from '@entities/order-product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderProductService {
  constructor() {}

  create(orderId: string, productId: string, quantity: number) {
    const id = uuid();
    return new OrderProduct(id, orderId, productId, quantity);
  }
}
