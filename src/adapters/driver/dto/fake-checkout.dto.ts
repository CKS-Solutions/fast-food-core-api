import { ApiProperty } from '@nestjs/swagger';
import { FakeCheckoutProductDto } from './fake-checkout-product.dto';

export class FakeCheckoutDto {
  @ApiProperty({ nullable: true, type: 'string' })
  public readonly customerId: string | null;

  @ApiProperty({ type: [FakeCheckoutProductDto] })
  public readonly products: FakeCheckoutProductDto[];

  constructor(customerId: string, products: FakeCheckoutProductDto[]) {
    this.customerId = customerId;
    this.products = products;
  }
}
