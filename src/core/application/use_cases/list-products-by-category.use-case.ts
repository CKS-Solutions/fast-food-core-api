import { ProductDto } from '@dto/product.dto';
import { ProductCategory } from '@entities/product.types';
import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';

export class ListProductsByCategoryUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(category: ProductCategory): Promise<ProductDto[]> {
    const products = await this.productRepository.listByCategory(category);
    return this.productService.toDtoList(products);
  }
}
