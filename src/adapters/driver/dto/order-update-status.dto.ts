import { OrderStatus } from '@entities/order';
import { ApiProperty } from '@nestjs/swagger';

export class OrderUpdateStatusDto {
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStauts' })
  public readonly status: OrderStatus;
}
