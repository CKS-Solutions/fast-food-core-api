import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { HttpError } from '@error/http';
import { ProductDto } from '@dto/product.dto';
import { ProductCategory } from '@entities/product/product.types';

import {
  ListProductsByCategoryUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  RemoveProductUseCase,
  ListProductsUseCase,
} from '@usecases/product';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly listProductsByCategoryUseCase: ListProductsByCategoryUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  async create(@Body() product: ProductDto): Promise<void> {
    await this.createProductUseCase.execute(product);
  }

  @Get()
  @ApiOperation({
    summary: 'List all products',
    description: 'List all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Products listed successfully',
    type: ProductDto,
    isArray: true,
  })
  async list(): Promise<ProductDto[]> {
    const products = await this.listProductsUseCase.execute();
    return products.map(
      (product) =>
        new ProductDto(
          product.category,
          product.description,
          product.price,
          product.quantity,
        ),
    );
  }

  @Get('category/:category')
  @ApiOperation({
    summary: 'List all products by category',
    description: 'List all products by category',
  })
  @ApiResponse({
    status: 200,
    description: 'Products listed successfully',
    type: ProductDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid category',
  })
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

    const productDtos = products.map(
      (product) =>
        new ProductDto(
          product.category,
          product.description,
          product.price,
          product.quantity,
        ),
    );

    res.status(HttpStatus.OK).json(productDtos).send();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a product',
    description: 'Update a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<void> {
    try {
      await this.updateProductUseCase.execute(id, product);

      res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message }).send();
      }

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
        .send();
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Delete a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async delete(@Res() res: Response, @Param('id') id: string): Promise<void> {
    try {
      await this.removeProductUseCase.execute(id);

      res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message }).send();
      }

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
        .send();
    }
  }
}
