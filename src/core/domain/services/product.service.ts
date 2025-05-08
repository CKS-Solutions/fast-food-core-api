import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { Product } from '@entities/product';
import { ProductCategory } from '@entities/product.types';
import { ProductDto } from '@dto/product.dto';

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

  toDtoList(products: Product[]): ProductDto[] {
    return products.map(
      (product) =>
        new ProductDto(
          product.category,
          product.description,
          product.price,
          product.quantity,
        ),
    );
  }
}
