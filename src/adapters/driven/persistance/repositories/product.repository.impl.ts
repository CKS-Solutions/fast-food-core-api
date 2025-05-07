import { Product } from '@entities/product';
import { IProductRepository } from 'src/core/domain/ports/product.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        id: product.id,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        category: product.category,
      },
    });
  }

  // update(id: string, product: Product): Promise<void> {
  //   console.log('Product updated', product, id);
  //   throw new Error('Method not implemented.');
  // }

  // delete(id: string): Promise<void> {
  //   console.log('Product deleted', id);
  //   throw new Error('Method not implemented.');
  // }
}
