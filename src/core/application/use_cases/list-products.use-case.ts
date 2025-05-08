import { ProductDto } from '@dto/product.dto';
import { ProductRepository } from '@repositories/product.repository.impl';
import { ProductService } from '@services/product.service';

export class ListProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(): Promise<ProductDto[]> {
    const products = await this.productRepository.list();
    return this.productService.toDtoList(products);
  }
}
