import { Module } from '@nestjs/common';
import { PrismaModule } from './adapters/driven/persistance/prisma.module';
import { ProductsModule } from './product.module';
import { CustomerModule } from './customer.module';

@Module({
  imports: [PrismaModule, ProductsModule, CustomerModule],
})
export class AppModule {}
