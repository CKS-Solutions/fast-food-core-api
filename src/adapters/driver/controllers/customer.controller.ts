import { CustomerDto } from '@dto/customer.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async create(@Body() customer: CustomerDto) {
    return await this.createCustomerUseCase.execute(customer);
  }
}
