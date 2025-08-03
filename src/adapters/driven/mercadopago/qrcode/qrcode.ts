import axios from 'axios';
import { BASE_URL } from '../utils';
import { GenerateQRCodeRequest, GenerateQRCodeResponse } from './qrcode.types';
import { Injectable } from '@nestjs/common';
import { IMercadoPagoQRCode } from '@ports/qrcode.mercadopago';

@Injectable()
export class MercadoPagoQRCode implements IMercadoPagoQRCode {
  constructor() {}

  async generateQRCode(
    params: GenerateQRCodeRequest,
    token: string,
  ): Promise<GenerateQRCodeResponse | undefined> {
    try {
      const { data } = await axios.post<GenerateQRCodeResponse>(
        `${BASE_URL}/instore/orders/qr/seller/collectors/${process.env.MP_USER_ID}/pos/${process.env.MP_POS_ID}/qrs`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.error('Error on generate QR Code mercadopago:', error);
      return undefined;
    }
  }
}
