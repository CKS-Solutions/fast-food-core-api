import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  public readonly cpf: string;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty({ nullable: true, type: 'string' })
  public readonly email: string | null;
  @ApiProperty({ nullable: true, type: 'string' })
  public readonly phone: string | null;
}
