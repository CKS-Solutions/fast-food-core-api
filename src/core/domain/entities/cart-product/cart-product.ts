export class CartProduct {
  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly productId: string,
    public quantity: number,
  ) {}
}
