import { IMercadoPagoQRCode } from '@ports/qrcode.mercadopago';
import { GenerateQRCodeRequest, GenerateQRCodeResponse } from './qrcode.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MercadoPagoQRCodeMock implements IMercadoPagoQRCode {
  constructor() {}

  async generateQRCode(
    params: GenerateQRCodeRequest,
    token: string,
  ): Promise<GenerateQRCodeResponse | undefined> {
    console.info('MercadoPagoQRCodeMock', params, token);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      qr_data: 'qr_data',
    };
  }
}
