/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DatabaseCustomer } from './customer.types';
import { CPF } from '@value-objects/cpf';
import { Email } from '@value-objects/email';
import { Phone } from '@value-objects/phone';

export class Customer {
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    public readonly cpf: CPF,
    public readonly name: string,
    public readonly email: Email,
    public readonly phone: Phone,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  static fromDatabase(databaseCustomer: DatabaseCustomer): Customer {
    return new Customer(
      new CPF(databaseCustomer.cpf),
      databaseCustomer.name,
      new Email(databaseCustomer.email),
      new Phone(databaseCustomer.phone),
      databaseCustomer.createdAt,
      databaseCustomer.updatedAt,
    );
  }

  toDatabase(): DatabaseCustomer {
    return {
      cpf: this.cpf.toString(),
      name: this.name,
      email: this.email.toString(),
      phone: this.phone.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
