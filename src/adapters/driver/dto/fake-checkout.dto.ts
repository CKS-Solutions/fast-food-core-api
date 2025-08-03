import { ApiProperty } from '@nestjs/swagger';
import { FakeCheckoutProductDto } from './fake-checkout-product.dto';
import { PaymentMethod } from '@entities/cart-payment';

export class FakeCheckoutDto {
  @ApiProperty({ nullable: true, type: 'string' })
  public readonly customerId: string | null;

  @ApiProperty({ type: [FakeCheckoutProductDto] })
  public readonly products: FakeCheckoutProductDto[];

  @ApiProperty()
  public readonly paymentMethod: PaymentMethod;

  constructor(
    customerId: string,
    products: FakeCheckoutProductDto[],
    paymentMethod: PaymentMethod,
  ) {
    this.customerId = customerId;
    this.products = products;
    this.paymentMethod = paymentMethod;
  }
}
