import { OrderListDto } from '@dto/order-list.dto';
import { Order } from '@entities/order';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';

@Controller('orders')
export class OrderController {
  constructor(private readonly listOrderUseCase: ListOrderUseCase) {}

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
}
