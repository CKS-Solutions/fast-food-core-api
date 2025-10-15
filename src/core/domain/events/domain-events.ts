import { DomainEvent } from './domain-event';

export class DomainEvents {
  private static handlers: Map<string, Array<(event: DomainEvent) => void>> =
    new Map();

  static register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => void,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler as (event: DomainEvent) => void);
  }

  static raise(event: DomainEvent): void {
    const eventName = event.getEventName();
    const handlers = this.handlers.get(eventName) || [];

    handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error handling domain event ${eventName}:`, error);
      }
    });
  }

  static clear(): void {
    this.handlers.clear();
  }
}
