import { Module } from '@nestjs/common';
import { PrismaModule } from './adapters/driven/persistance/prisma.module';
import { ProductsModule } from './product.module';
import { CustomerModule } from './customer.module';
import { FakeCheckoutModule } from './fake-checkout.module';
import { OrderModule } from './order.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    CustomerModule,
    FakeCheckoutModule,
    OrderModule,
  ],
})
export class AppModule {}
