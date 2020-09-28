export interface Items {
  name: string;
  lastName: string;
  categories: any[];
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  condition: string;
  picture: string;
  shipping: boolean;
  state_name: string;
  price: Price;
}

export interface Price {
  amount: number;
  currency: string;
  decimals: number | null;
}
