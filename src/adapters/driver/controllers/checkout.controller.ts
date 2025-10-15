import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { HttpError } from '@error/http';
import { FakeCheckoutDto } from '@dto/fake-checkout.dto';
import {
  CreateFakeCheckoutUseCase,
  CreateCheckoutUseCase,
} from '@usecases/checkout';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly createFakeCheckoutUseCase: CreateFakeCheckoutUseCase,
    private readonly createCheckoutUseCase: CreateCheckoutUseCase,
  ) {}

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
