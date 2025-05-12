import { CustomerDto } from '@dto/customer.dto';
import { Customer } from '@entities/customer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor() {}

  create(customer: CustomerDto) {
    return new Customer(
      customer.cpf,
      customer.name,
      customer.email ?? '',
      customer.phone ?? '',
    );
  }
}
