import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductDto } from '@dto/product.dto';
import { ProductService } from '@services/product.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(product: ProductDto): Promise<void> {
    const productModel = this.productService.create(
      product.description,
      product.category,
      product.price,
      product.quantity,
    );

    await this.productRepository.create(productModel);
  }
}
