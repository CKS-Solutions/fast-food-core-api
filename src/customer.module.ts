import { Module } from '@nestjs/common';
import { CustomerController } from '@controllers/customer.controller';
import { CustomerService } from '@services/customer.service';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';
import { ListCustomerUseCase } from '@usecases/customer/list-customer.use-case';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    CreateCustomerUseCase,
    ListCustomerUseCase,
  ],
})
export class CustomerModule {}
