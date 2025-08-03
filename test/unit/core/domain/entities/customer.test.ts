import { Customer } from '@entities/customer/customer';

describe('Customer', () => {
  it('should create a customer with valid data', () => {
    const mockCustomer = {
      cpf: '12312312312',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '47999999999',
    };

    const customer = new Customer(
      mockCustomer.cpf,
      mockCustomer.name,
      mockCustomer.email,
      mockCustomer.phone,
    );

    expect(customer).toEqual(customer);
  });

  it('should create a customer from database', () => {
    const databaseCustomer = {
      cpf: '12312312312',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '47999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const expectedCustomer = {
      cpf: '12312312312',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '47999999999',
    };

    const customer = Customer.fromDatabase(databaseCustomer);

    expect(customer).toEqual(expectedCustomer);
  });
});
