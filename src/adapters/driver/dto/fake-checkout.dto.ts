import { ApiProperty } from '@nestjs/swagger';
import { FakeCheckoutProductDto } from './fake-checkout-product.dto';

export class FakeCheckoutDto {
  @ApiProperty({ nullable: true, type: 'string' })
  public readonly customerId: string | null;

  @ApiProperty({ type: [FakeCheckoutProductDto] })
  public readonly products: FakeCheckoutProductDto[];

  @ApiProperty()
  public readonly paymentMethod: string;

  constructor(
    customerId: string,
    products: FakeCheckoutProductDto[],
    paymentMethod: string,
  ) {
    this.customerId = customerId;
    this.products = products;
    this.paymentMethod = paymentMethod;
  }
}
