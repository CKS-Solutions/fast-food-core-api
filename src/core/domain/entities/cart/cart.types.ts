export enum CartStatus {
  OPEN = 'open',
  FINISHED = 'finished',
  CANCELED = 'canceled',
}

export type DatabaseCart = {
  id: string;
  customerId: string | null;
  total: number;
  status: string;
};
