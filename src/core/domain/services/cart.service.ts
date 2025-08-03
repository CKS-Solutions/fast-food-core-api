import { v4 as uuid } from 'uuid';
import { Cart, CartStatus } from '@entities/cart';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor() {}

  create(customerId: string, total: number): Cart {
    return new Cart(uuid(), customerId, total, CartStatus.OPEN);
  }
}
