import { randomUUID } from 'crypto';
import { Product } from '@entities/product';
import { ProductCategory } from '@entities/product.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor() {}

  create(
    description: string,
    category: ProductCategory,
    price: number,
    quantity: number,
  ): Product {
    const id = randomUUID();
    return new Product(id, category, description, price, quantity);
  }
}
