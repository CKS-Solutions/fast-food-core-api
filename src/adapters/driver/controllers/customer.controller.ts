import { CustomerListDto } from '@dto/customer-list.dto';
import { CustomerDto } from '@dto/customer.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';
import { ListCustomerUseCase } from '@usecases/customer/list-customer.use-case';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomerUseCase: ListCustomerUseCase,
  ) {}

  @Post()
  async create(@Body() customer: CustomerDto) {
    return await this.createCustomerUseCase.execute(customer);
  }

  @Get()
  async list(@Query() params: CustomerListDto) {
    return await this.listCustomerUseCase.execute(params);
  }
}
