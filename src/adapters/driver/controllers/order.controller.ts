import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { GeneratePaymentUseCase } from '@usecases/order/generate-payment.use-case';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';

import { OrderListDto } from '@dto/order-list.dto';
import { Order } from '@entities/order';
import { HttpError } from '@error/http';

import { OrderService } from '@services/order.service';
import { OrderRepository } from '@repositories/order.repository.impl';
import { OrderPaymentRepository } from '@repositories/order-payment.repository.impl';
import { OrderPaymentService } from '@services/order-payment.service';
import { GetPaymentStatusUseCase } from '@usecases/order/get-payment-status.use-case';
import { MercadoPagoQRCode } from 'src/adapters/driven/mercadopago/qrcode/qrcode';
import { MercadoPagoAuth } from 'src/adapters/driven/mercadopago/auth/auth';

@Controller('orders')
export class OrderController {
  private readonly listOrderUseCase: ListOrderUseCase;
  private readonly generatePaymentUseCase: GeneratePaymentUseCase;
  private readonly getPaymentStatusUseCase: GetPaymentStatusUseCase;

  constructor(
    private readonly orderService: OrderService,
    private readonly orderRepository: OrderRepository,
    private readonly orderPaymentRepository: OrderPaymentRepository,
    private readonly orderPaymentService: OrderPaymentService,
    private readonly mpAuthService: MercadoPagoAuth,
    private readonly mpQRCodeService: MercadoPagoQRCode,
  ) {
    this.listOrderUseCase = new ListOrderUseCase(
      this.orderRepository,
      this.orderService,
    );

    this.generatePaymentUseCase = new GeneratePaymentUseCase(
      this.orderRepository,
      this.orderPaymentRepository,
      this.orderPaymentService,
      this.mpAuthService,
      this.mpQRCodeService,
    );

    this.getPaymentStatusUseCase = new GetPaymentStatusUseCase(
      this.orderRepository,
      this.orderPaymentRepository,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List orders',
    description: 'List orders',
  })
  @ApiResponse({
    status: 200,
    description: 'The orders have been successfully listed.',
  })
  async list(@Query() params: OrderListDto): Promise<Order[]> {
    return await this.listOrderUseCase.execute(params);
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
