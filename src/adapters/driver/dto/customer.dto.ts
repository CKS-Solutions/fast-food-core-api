export class CustomerDto {
  constructor(
    public readonly cpf: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly phone: string | null,
  ) {}
}
