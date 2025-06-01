import { ApiProperty } from '@nestjs/swagger';

export class FakeCheckoutProductDto {
  @ApiProperty()
  public readonly productId: string;

  @ApiProperty()
  public readonly quantity: number;

  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
