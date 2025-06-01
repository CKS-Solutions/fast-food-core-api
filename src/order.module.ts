import { Module } from '@nestjs/common';
import { OrderController } from '@controllers/order.controller';
import { OrderService } from '@services/order.service';
import { OrderRepository } from '@repositories/order.repository.impl';
import { ListOrderUseCase } from '@usecases/order/list-order.use-case';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ListOrderUseCase],
})
export class OrderModule {}
