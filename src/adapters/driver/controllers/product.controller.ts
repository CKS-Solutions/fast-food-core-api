import { Body, Controller, Post } from '@nestjs/common';

import { ProductDto } from '@dto/product.dto';
import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';
import { CreateProductUseCase } from '@usecases/create-product.use-case';

@Controller('products')
export class ProductController {
  private readonly createProductUseCase: CreateProductUseCase;

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {
    this.createProductUseCase = new CreateProductUseCase(
      this.productRepository,
      this.productService,
    );
  }

  @Post()
  async create(@Body() product: ProductDto): Promise<void> {
    await this.createProductUseCase.execute(product);
  }
}
