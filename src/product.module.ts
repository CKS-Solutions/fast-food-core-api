import { Module } from '@nestjs/common';
import { ProductController } from '@controllers/product.controller';
import { ProductService } from '@services/product.service';
import { ProductRepository } from '@repositories/product.repository.impl';
import {
  CreateProductUseCase,
  UpdateProductUseCase,
  RemoveProductUseCase,
  ListProductsUseCase,
  ListProductsByCategoryUseCase,
} from '@usecases/product';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CreateProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    ListProductsUseCase,
    ListProductsByCategoryUseCase,
  ],
})
export class ProductsModule {}
