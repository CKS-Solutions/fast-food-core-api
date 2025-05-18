import { CustomerDto } from '@dto/customer.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new customer',
    description: 'Create a new customer',
  })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  async create(@Body() customer: CustomerDto) {
    return await this.createCustomerUseCase.execute(customer);
  }
}
