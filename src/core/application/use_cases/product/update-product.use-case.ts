import { HttpStatus } from '@nestjs/common';

import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';
import { ProductDto } from '@dto/product.dto';
import { HttpError } from '@error/http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(productId: string, productDto: ProductDto): Promise<void> {
    const product = await this.productRepository.get(productId);

    if (!product) {
      throw new HttpError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    const updatedProduct = this.productService.update(
      product,
      productDto.description,
      productDto.price,
      productDto.quantity,
    );

    await this.productRepository.update(productId, updatedProduct);
  }
}
