import { ProductCategory } from '@entities/product/product.types';
import { ProductRepository } from '@repositories/product.repository.impl';
import { Product } from '@entities/product/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsByCategoryUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(category: ProductCategory): Promise<Product[]> {
    return await this.productRepository.listByCategory(category);
  }
}
