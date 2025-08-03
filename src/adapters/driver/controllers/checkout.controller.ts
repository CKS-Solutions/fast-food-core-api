import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { OrderProductRepository } from '@repositories/order-product.repository.impl';
import { CartProductRepository } from '@repositories/cart-product.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { ProductRepository } from '@repositories/product.repository.impl';
import { OrderRepository } from '@repositories/order.repository.impl';
import { CartRepository } from '@repositories/cart.repository.impl';

import { OrderProductService } from '@services/order-product.service';
import { CartProductService } from '@services/cart-product.service';
import { OrderService } from '@services/order.service';
import { CartService } from '@services/cart.service';

import { HttpError } from '@error/http';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';
import {
  CreateFakeCheckoutUseCase,
  CreateCheckoutUseCase,
} from '@usecases/checkout';

@Controller('checkout')
export class CheckoutController {
  private readonly createFakeCheckoutUseCase: CreateFakeCheckoutUseCase;
  private readonly createCheckoutUseCase: CreateCheckoutUseCase;

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly orderProductService: OrderProductService,
    private readonly productRepository: ProductRepository,
    private readonly cartService: CartService,
    private readonly cartProductService: CartProductService,
    private readonly cartRepository: CartRepository,
    private readonly cartProductRepository: CartProductRepository,
  ) {
    this.createFakeCheckoutUseCase = new CreateFakeCheckoutUseCase(
      this.customerRepository,
      this.productRepository,
      this.cartService,
      this.cartRepository,
      this.cartProductService,
      this.cartProductRepository,
    );

    this.createCheckoutUseCase = new CreateCheckoutUseCase(
      this.cartRepository,
      this.cartProductRepository,
      this.orderProductRepository,
      this.orderProductService,
      this.orderRepository,
      this.orderService,
    );
  }

  @Post('create/fake')
  @ApiOperation({
    summary: 'Create a fake checkout',
    description: 'Create a fake checkout',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createFake(
    @Res() res: Response,
    @Body() fakeCheckoutDto: FakeCheckoutDto,
  ) {
    try {
      const data =
        await this.createFakeCheckoutUseCase.execute(fakeCheckoutDto);

      res.status(HttpStatus.CREATED).send(data);
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

  @Post('/create/:id')
  @ApiOperation({
    summary: 'Create a checkout',
    description: 'Create a checkout',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 204,
    description: 'No record to process!',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.createCheckoutUseCase.execute(id);

      res.status(HttpStatus.CREATED).send(data);
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
