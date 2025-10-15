import { DomainEvent } from './domain-event';
import { CPF } from '@value-objects/cpf';

export class CustomerCreated extends DomainEvent {
  constructor(
    public readonly customerId: string,
    public readonly cpf: CPF,
    public readonly name: string,
  ) {
    super();
  }

  getEventName(): string {
    return 'CustomerCreated';
  }
}
