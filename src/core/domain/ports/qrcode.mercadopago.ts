import {
  GenerateQRCodeRequest,
  GenerateQRCodeResponse,
} from 'src/adapters/driven/mercadopago/qrcode/qrcode.types';

export interface IMercadoPagoQRCode {
  generateQRCode(
    params: GenerateQRCodeRequest,
    token: string,
  ): Promise<GenerateQRCodeResponse | undefined>;
}
