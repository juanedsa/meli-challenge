import { Price } from './items.model';

export interface Detail {
  name:        string;
  lastName:    string;
  item:        Item;
  description: string;
}

export interface Item {
  id:            string;
  title:         string;
  condition:     string;
  picture:       string;
  shipping:      boolean;
  sold_quantity: number;
  price:         Price;
}
