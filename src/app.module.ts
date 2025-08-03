import { Module } from '@nestjs/common';
import { PrismaModule } from './adapters/driven/persistance/prisma.module';
import { ProductsModule } from './product.module';
import { CustomerModule } from './customer.module';
import { CheckoutModule } from './checkout.module';
import { OrderModule } from './order.module';
import { WebhookModule } from './webhook.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    CustomerModule,
    CheckoutModule,
    OrderModule,
    WebhookModule,
  ],
})
export class AppModule {}
