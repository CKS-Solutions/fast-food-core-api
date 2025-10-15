import { HttpError } from '@error/http';
import { HttpStatus } from '@nestjs/common';
import { ProductRepository } from '@repositories/product.repository.impl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.get(productId);

    if (!product) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    await this.productRepository.delete(productId);
  }
}
