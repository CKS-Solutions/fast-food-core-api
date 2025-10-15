export class CPF {
  private readonly value: string;

  constructor(cpf: string) {
    this.value = this.clean(cpf);
    this.validate();
  }

  private clean(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private validate(): void {
    if (!this.value || this.value.length !== 11) {
      throw new Error('CPF must have 11 digits');
    }

    if (this.isAllSameDigits()) {
      throw new Error('Invalid CPF');
    }

    if (!this.isValidChecksum()) {
      throw new Error('Invalid CPF');
    }
  }

  private isAllSameDigits(): boolean {
    return /^(\d)\1{10}$/.test(this.value);
  }

  private isValidChecksum(): boolean {
    const digits = this.value.split('').map(Number);

    // First check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let remainder = sum % 11;
    const firstCheck = remainder < 2 ? 0 : 11 - remainder;

    if (digits[9] !== firstCheck) {
      return false;
    }

    // Second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    remainder = sum % 11;
    const secondCheck = remainder < 2 ? 0 : 11 - remainder;

    return digits[10] === secondCheck;
  }

  toString(): string {
    return this.value;
  }

  toFormattedString(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  equals(other: CPF): boolean {
    return this.value === other.value;
  }
}
