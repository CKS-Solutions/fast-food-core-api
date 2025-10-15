export class Phone {
  private readonly value: string;

  constructor(phone: string) {
    this.value = this.clean(phone);
    this.validate();
  }

  private clean(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('Phone cannot be empty');
    }

    // Brazilian phone validation (10 or 11 digits)
    if (this.value.length < 10 || this.value.length > 11) {
      throw new Error('Phone must have 10 or 11 digits');
    }

    // Check if it's a valid Brazilian phone number
    if (this.value.length === 11 && !this.value.startsWith('11')) {
      throw new Error('Invalid phone number format');
    }
  }

  toString(): string {
    return this.value;
  }

  toFormattedString(): string {
    if (this.value.length === 11) {
      return this.value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return this.value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }

  getAreaCode(): string {
    return this.value.substring(0, 2);
  }

  getNumber(): string {
    return this.value.substring(2);
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }
}
