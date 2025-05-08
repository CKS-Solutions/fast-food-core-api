import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ProductDto } from '@dto/product.dto';
import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';
import { ProductCategory } from '@entities/product.types';

import { CreateProductUseCase } from '@usecases/create-product.use-case';
import { ListProductsUseCase } from '@usecases/list-products.use-case';
import { ListProductsByCategoryUseCase } from '@usecases/list-products-by-category.use-case';

@Controller('products')
export class ProductController {
  private readonly createProductUseCase: CreateProductUseCase;
  private readonly listProductsUseCase: ListProductsUseCase;
  private readonly listProductsByCategoryUseCase: ListProductsByCategoryUseCase;

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {
    this.createProductUseCase = new CreateProductUseCase(
      this.productRepository,
      this.productService,
    );

    this.listProductsUseCase = new ListProductsUseCase(
      this.productRepository,
      this.productService,
    );

    this.listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
      this.productRepository,
      this.productService,
    );
  }

  @Post()
  async create(@Body() product: ProductDto): Promise<void> {
    await this.createProductUseCase.execute(product);
  }

  @Get()
  async list(): Promise<ProductDto[]> {
    return await this.listProductsUseCase.execute();
  }

  @Get('category/:category')
  async listByCategory(
    @Res() res: Response,
    @Param('category') category: string,
  ): Promise<void> {
    if (!Object.values(ProductCategory).includes(category as ProductCategory)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: 'Invalid category',
        })
        .send();
    }

    const products = await this.listProductsByCategoryUseCase.execute(
      category as ProductCategory,
    );

    res.status(HttpStatus.OK).json(products).send();
  }
}
