import { Order } from '@entities/order';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';

@Controller('orders')
export class OrderController {
  constructor(private readonly listOrderUseCase: ListOrderUseCase) {}

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
}
