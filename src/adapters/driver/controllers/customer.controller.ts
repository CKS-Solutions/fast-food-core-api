import { CustomerListDto } from '@dto/customer-list.dto';
import { CustomerDto } from '@dto/customer.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCustomerUseCase } from '@usecases/customer/create-customer.use-case';
import { FindClientByCpfUseCase } from '@usecases/customer/find-client-by-cpf.use-case';
import { ListCustomerUseCase } from '@usecases/customer/list-customer.use-case';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomerUseCase: ListCustomerUseCase,
    private readonly findClientByCpfUseCase: FindClientByCpfUseCase,
  ) {}

  @Post()
  async create(@Body() customer: CustomerDto) {
    return await this.createCustomerUseCase.execute(customer);
  }

  @Get()
  async list(@Query() params: CustomerListDto) {
    return await this.listCustomerUseCase.execute(params);
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return await this.findClientByCpfUseCase.execute(cpf);
  }
}
