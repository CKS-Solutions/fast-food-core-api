import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CheckoutQueueRepository } from '@repositories/checkout-queue.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { CheckoutQueueService } from '@services/checkout-queue.service';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderService } from '@services/order.service';

import { HttpError } from '@error/http';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';
import {
  CreateFakeCheckoutUseCase,
  CreateCheckoutUseCase,
} from '@usecases/checkout';
import { OrderProductRepository } from '@repositories/order-product.repository.impl';
import { OrderProductService } from '@services/order-product.service';
import { ProductRepository } from '@repositories/product.repository.impl';

@Controller('checkout')
export class CheckoutController {
  private readonly createFakeCheckoutUseCase: CreateFakeCheckoutUseCase;
  private readonly createCheckoutUseCase: CreateCheckoutUseCase;

  constructor(
    private readonly checkoutQueueRepository: CheckoutQueueRepository,
    private readonly checkoutQueueService: CheckoutQueueService,
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly orderProductService: OrderProductService,
    private readonly productRepository: ProductRepository,
  ) {
    this.createFakeCheckoutUseCase = new CreateFakeCheckoutUseCase(
      this.checkoutQueueRepository,
      this.checkoutQueueService,
      this.customerRepository,
      this.productRepository,
    );

    this.createCheckoutUseCase = new CreateCheckoutUseCase(
      this.checkoutQueueRepository,
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
      await this.createFakeCheckoutUseCase.execute(fakeCheckoutDto);

      res.status(HttpStatus.CREATED).send();
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

  @Post('/create')
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
  async create(@Res() res: Response) {
    try {
      await this.createCheckoutUseCase.execute();

      res.status(HttpStatus.CREATED).send();
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
