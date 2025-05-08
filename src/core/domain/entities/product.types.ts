export enum ProductCategory {
  Snack = 'snack',
  Drink = 'drink',
  Dessert = 'dessert',
  Side = 'side',
}

export type DatabaseProduct = {
  id: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
};
