import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty({ required: false, nullable: true })
  public readonly customerId: string | null;

  @ApiProperty()
  public readonly paymentMethod: string;

  @ApiProperty()
  public readonly status: string;

  @ApiProperty()
  public readonly total: number;

  constructor(
    id: string,
    customerId: string | null,
    paymentMethod: string,
    status: string,
    total: number,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.total = total;
  }
}
