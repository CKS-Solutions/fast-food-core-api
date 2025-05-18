export class CustomerListDto {
  constructor(
    public readonly cpf?: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly phone?: string,
  ) {}
}
