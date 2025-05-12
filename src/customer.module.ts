import { Module } from '@nestjs/common';
import { CustomerController } from '@controllers/customer.controller';
import { CustomerService } from '@services/customer.service';
import { CustomerRepository } from '@repositories/customer.repository.impl';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, CreateCustomerUseCase],
})
export class CustomerModule {}
