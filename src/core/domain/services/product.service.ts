import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { Product, ProductCategory } from '@entities/product';

@Injectable()
export class ProductService {
  constructor() {}

  create(
    description: string,
    category: ProductCategory,
    price: number,
    quantity: number,
  ): Product {
    const id = uuid();
    return new Product(id, category, description, price, quantity);
  }

  update(
    product: Product,
    description: string,
    price: number,
    quantity: number,
  ): Product {
    return new Product(
      product.id,
      product.category,
      description,
      price,
      quantity,
    );
  }
}
