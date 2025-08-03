import { OrderStatus } from '@entities/order/order.types';
import { ApiProperty } from '@nestjs/swagger';

export class OrderListDto {
  @ApiProperty({ required: false })
  public readonly customerId?: string;

  @ApiProperty({ required: false })
  public readonly paymentMethod?: string;

  @ApiProperty({ required: false })
  public readonly status?: OrderStatus;
}
