export type QRCodeItem = {
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  total_amount: number;
};

export type GenerateQRCodeRequest = {
  external_reference: string;
  title: string;
  description: string;
  notification_url: string;
  total_amount: number;
  expiration_date: string;
  items: QRCodeItem[];
};

export type GenerateQRCodeResponse = {
  qr_data: string;
};
