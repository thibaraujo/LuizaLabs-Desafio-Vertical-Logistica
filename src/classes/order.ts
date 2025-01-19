import { IOrder } from '../commons/interfaces/order';
import { IProduct } from '../commons/interfaces/product';
import { ObjectRaw } from './commonFields';

export class Order extends ObjectRaw implements IOrder {
  order_id: number;
  user_id: number;
  name: string;
  date: string;
  product: IProduct;
  total?: number;

  constructor(order: IOrder) {
    super(order);
    this.order_id = order.order_id;
    this.user_id = order.user_id;
    this.name = order.name;
    this.date = order.date;
    this.product = order.product;
    this.total = order.total;
  }
}