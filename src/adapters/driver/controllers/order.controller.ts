import { OrderUpdateStatusDto } from '@dto/order-update-status.dto';
import { Order } from '@entities/order';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';
import { UpdateOrderStatusUseCase } from '@usecases/order/update-order-status.use-case';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly listOrderUseCase: ListOrderUseCase,
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
}
