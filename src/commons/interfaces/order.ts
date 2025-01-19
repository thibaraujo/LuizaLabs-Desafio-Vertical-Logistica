import { IObjectRaw } from './base';
import { IProduct } from './product';

export type IOrderRaw = {
  order_id: number;
  user_id: number;
  name: string;
  date: string;
  product: IProduct;
  total?: number;
}

export type IOrder = IObjectRaw & IOrderRaw;