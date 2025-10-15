/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ICustomerRepository } from '@ports/customer.repository';
import { PrismaService } from '../prisma.service';
import { Customer } from '@entities/customer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(cpf: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf,
      },
    });

    if (!customer) return null;

    return Customer.fromDatabase(customer);
  }

  async list(customerFilter: {
    cpf?: any;
    name?: string;
    email?: any;
    phone?: any;
  }): Promise<Customer[]> {
    const whereClause: any = {};

    if (customerFilter.cpf) {
      whereClause.cpf = customerFilter.cpf.toString();
    }
    if (customerFilter.name) {
      whereClause.name = customerFilter.name;
    }
    if (customerFilter.email) {
      whereClause.email = customerFilter.email.toString();
    }
    if (customerFilter.phone) {
      whereClause.phone = customerFilter.phone.toString();
    }

    const customers = await this.prisma.customer.findMany({
      where: whereClause,
    });
    return customers.map((customer) => Customer.fromDatabase(customer));
  }

  async create(customer: Customer): Promise<Customer> {
    const customerData = customer.toDatabase();
    const customerSaved = await this.prisma.customer.create({
      data: customerData,
    });

    return Customer.fromDatabase(customerSaved);
  }

  async update(
    cpf: string,
    customer: Omit<Customer, 'cpf'>,
  ): Promise<Customer> {
    const customerData = customer.toDatabase();
    const updatedCustomer = await this.prisma.customer.update({
      where: {
        cpf: cpf,
      },
      data: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      },
    });

    return Customer.fromDatabase(updatedCustomer);
  }

  async delete(cpf: string): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        cpf,
      },
    });
  }
}
