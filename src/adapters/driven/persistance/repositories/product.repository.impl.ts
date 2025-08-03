import { Injectable } from '@nestjs/common';

import { Product } from '@entities/product/product';
import { IProductRepository } from '@ports/product.repository';
import { PrismaService } from '../prisma.service';
import { ProductCategory } from '@entities/product/product.types';

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

  async get(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) return null;

    return Product.fromDatabase(product);
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

  async update(id: string, product: Product): Promise<void> {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        price: product.price,
        description: product.description,
        quantity: product.quantity,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
