export type QRCodeItem = {
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  total_amount: number;
  unit_measure: string;
};

export type GenerateQRCodeRequest = {
  external_reference: string;
  title: string;
  description: string;
  total_amount: number;
  expiration_date: string;
  items: QRCodeItem[];
};

export type GenerateQRCodeResponse = {
  qr_data: string;
};
