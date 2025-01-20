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

export type IOrderListRaw = {
  user_id: number;
  name: string;
  orders: [
    {
      order_id: number;
      date: string;
      product: IProduct[];
      total: string;
    }
  ]
}

export type IOrder = IObjectRaw & IOrderRaw;