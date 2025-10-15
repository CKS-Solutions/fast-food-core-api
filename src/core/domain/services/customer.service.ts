/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Customer } from '@entities/customer';
import { CPF } from '@value-objects/cpf';
import { Email } from '@value-objects/email';
import { Phone } from '@value-objects/phone';
import { DomainEvents } from '@events/domain-events';
import { CustomerCreated } from '@events/customer-created';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor() {}

  create(cpf: string, name: string, email: string, phone: string): Customer {
    const cpfValueObject = new CPF(cpf);
    const customer = new Customer(
      cpfValueObject,
      name,
      new Email(email),
      new Phone(phone),
    );

    // Emit domain event
    DomainEvents.raise(new CustomerCreated(cpf, cpfValueObject, name));

    return customer;
  }

  convertFiltersToModel(filters: {
    cpf?: string;
    name?: string;
    email?: string;
    phone?: string;
  }): {
    cpf?: CPF;
    name?: string;
    email?: Email;
    phone?: Phone;
  } {
    const customerFiltersModel: {
      cpf?: CPF;
      name?: string;
      email?: Email;
      phone?: Phone;
    } = {};
    if (filters.cpf) customerFiltersModel.cpf = new CPF(filters.cpf);
    if (filters.name) customerFiltersModel.name = filters.name;
    if (filters.email) customerFiltersModel.email = new Email(filters.email);
    if (filters.phone) customerFiltersModel.phone = new Phone(filters.phone);

    return customerFiltersModel;
  }
}
