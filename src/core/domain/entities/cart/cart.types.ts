export enum CartStatus {
  OPEN = 'open',
  FINISHED = 'finished',
  CANCELED = 'canceled',
}

export type DatabaseCart = {
  id: string;
  customerId: string;
  total: number;
  status: CartStatus;
};
