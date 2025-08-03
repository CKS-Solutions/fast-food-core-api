import { Injectable } from '@nestjs/common';
import { IMercadoPagoAuth } from '@ports/auth.mercadopago';

@Injectable()
export class MercadoPagoAuthMock implements IMercadoPagoAuth {
  constructor() {}

  async generateToken(): Promise<string | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 'token';
  }
}
