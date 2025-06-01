import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CheckoutQueueRepository } from '@repositories/checkout-queue.repository.impl';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { CheckoutQueueService } from '@services/checkout-queue.service';
import { CreateFakeCheckoutUseCase } from '@usecases/fake-checkout';

import { HttpError } from '@error/http';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';

@Controller('fake-checkout')
export class FakeCheckoutController {
  private readonly createFakeCheckoutUseCase: CreateFakeCheckoutUseCase;

  constructor(
    private readonly checkoutQueueRepository: CheckoutQueueRepository,
    private readonly checkoutQueueService: CheckoutQueueService,
    private readonly customerRepository: CustomerRepository,
  ) {
    this.createFakeCheckoutUseCase = new CreateFakeCheckoutUseCase(
      this.checkoutQueueRepository,
      this.checkoutQueueService,
      this.customerRepository,
    );
  }

  @Post()
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
  async create(@Res() res: Response, @Body() fakeCheckoutDto: FakeCheckoutDto) {
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
}
