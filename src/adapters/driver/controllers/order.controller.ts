import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { OrderUpdateStatusDto } from '@dto/order-update-status.dto';
import { GeneratePaymentUseCase } from '@usecases/order/generate-payment.use-case';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';

import { Order } from '@entities/order';
import { HttpError } from '@error/http';

import { GetPaymentStatusUseCase } from '@usecases/order/get-payment-status.use-case';
import { UpdateOrderStatusUseCase } from '@usecases/order/update-order-status.use-case';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly listOrderUseCase: ListOrderUseCase,
    private readonly generatePaymentUseCase: GeneratePaymentUseCase,
    private readonly getPaymentStatusUseCase: GetPaymentStatusUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List orders',
    description: 'List orders using queue priority',
  })
  @ApiResponse({
    status: 200,
    description: 'The orders have been successfully listed.',
  })
  async list(): Promise<Order[]> {
    return await this.listOrderUseCase.execute();
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update order status',
    description: 'Update order status',
  })
  @ApiResponse({
    status: 200,
    description: 'The order status has been successfully updated.',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: OrderUpdateStatusDto,
  ): Promise<Order> {
    return await this.updateOrderStatusUseCase.execute(id, body.status);
  }

  @Post(':id/payment/generate')
  @ApiOperation({
    summary: 'Generate payment',
    description: 'Generate payment',
  })
  @ApiResponse({
    status: 200,
    description: 'The payment has been successfully generated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Order already paid. Or order not waiting for payment.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async generatePayment(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.generatePaymentUseCase.execute(id);

      res.status(HttpStatus.OK).json(data).send();
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

  @Get(':id/payment/status')
  @ApiOperation({
    summary: 'Get payment status',
    description: 'Get payment status',
  })
  @ApiResponse({
    status: 200,
    description: 'The payment status has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getPaymentStatus(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.getPaymentStatusUseCase.execute(id);

      res.status(HttpStatus.OK).json(data).send();
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
