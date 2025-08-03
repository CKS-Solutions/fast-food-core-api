import { HttpStatus } from '@nestjs/common';

import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';
import { ProductDto } from '@dto/product.dto';
import { HttpError } from '@error/http';

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(
    productId: string,
    productDto: ProductDto,
  ): Promise<ProductDto> {
    const product = await this.productRepository.get(productId);

    if (!product) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    const updatedProduct = this.productService.update(product, productDto);

    await this.productRepository.update(productId, updatedProduct);

    return this.productService.toDto(updatedProduct);
  }
}
