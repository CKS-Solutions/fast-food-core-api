import { Product } from '@entities/product';

export interface IProductRepository {
  create(product: Product): Promise<void>;
  // update(id: string, product: Product): Promise<void>;
  // delete(id: string): Promise<void>;
}
