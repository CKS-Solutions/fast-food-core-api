import { CartStatus } from './cart.types';

export class Cart {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public total: number,
    public status: CartStatus,
  ) {}
}
