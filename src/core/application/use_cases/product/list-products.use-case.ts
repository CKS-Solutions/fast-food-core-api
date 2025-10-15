import { ProductRepository } from '@repositories/product.repository.impl';
import { Product } from '@entities/product/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.list();
  }
}
