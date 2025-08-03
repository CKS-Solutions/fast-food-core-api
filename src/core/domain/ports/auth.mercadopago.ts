export interface IMercadoPagoAuth {
  generateToken(): Promise<string | undefined>;
}
