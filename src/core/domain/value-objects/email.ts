export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.value = email.trim().toLowerCase();
    this.validate();
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email format');
    }

    if (this.value.length > 254) {
      throw new Error('Email is too long');
    }
  }

  toString(): string {
    return this.value;
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }

  getLocalPart(): string {
    return this.value.split('@')[0];
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
