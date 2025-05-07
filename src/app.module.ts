import { Module } from '@nestjs/common';
import { PrismaModule } from './adapters/driven/persistance/prisma.module';
import { ProductsModule } from './product.module';

@Module({
  imports: [PrismaModule, ProductsModule],
})
export class AppModule {}
