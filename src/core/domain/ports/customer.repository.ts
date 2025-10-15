import { Customer } from '@entities/customer';

export interface ICustomerRepository {
  get(cpf: string): Promise<Customer | null>;
  list(customerFilter: {
    cpf?: any;
    name?: string;
    email?: any;
    phone?: any;
  }): Promise<Customer[]>;
  create(customer: Customer): Promise<Customer>;
  update(cpf: string, customer: Omit<Customer, 'cpf'>): Promise<Customer>;
  delete(cpf: string): Promise<void>;
}
