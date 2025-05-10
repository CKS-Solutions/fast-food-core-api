import { Product } from '@entities/product';
import { ProductCategory } from '@entities/product.types';

export interface IProductRepository {
  create(product: Product): Promise<void>;
  get(id: string): Promise<Product | null>;
  list(): Promise<Product[]>;
  listByCategory(category: ProductCategory): Promise<Product[]>;
  update(id: string, product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
