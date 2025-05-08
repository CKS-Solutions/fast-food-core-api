import { Injectable } from '@nestjs/common';

import { Product } from '@entities/product';
import { IProductRepository } from '@ports/product.repository';
import { PrismaService } from '../prisma.service';
import { ProductCategory } from '@entities/product.types';

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

  async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((p) => Product.fromDatabase(p));
  }

  async listByCategory(category: ProductCategory): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        category,
      },
    });
    return products.map((p) => Product.fromDatabase(p));
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
