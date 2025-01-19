import { Schema, model } from 'mongoose';
import { Order } from '../classes/order';
import database from '../services/database';
import { IProduct } from '../commons/interfaces/product';

const OrderSchema = new Schema({
  order_id: {
    type: Number,
    required: true,
    set: (e: number) => {
      return e.toString().replace(/^0+/, '');
    }
  },
  user_id: {
    type: Number,
    required: true,
    set: (e: number) => {
      return e.toString().replace(/^0+/, '');
    }
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    set: (e: string) => {
      return e.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
  },
  product: {
    type: {
      product_id: {
        type: Number,
        required: true,
        set: (value: number | string) => {
          if (typeof value === 'number') return value;
          return parseInt(value.toString().replace(/^0+/, ''), 10);
        }
      },
      value: {
        type: Number,
        required: true,
        set: (value: number | string) => {
          if (typeof value === 'number') return value;
          return parseFloat(value.toString().replace(/^0+/, '').replace(/(\d+)(\d{2})$/, '$1.$2'));
        }
      }
    },
    required: true
  },
  total: {
    type: Number,
    required: false,
  }
});

database.setupSchema(OrderSchema);

OrderSchema.index({ order_id: 1 });
OrderSchema.index({ user_id: 1 });
OrderSchema.index({ date: 1 });

export const OrderModel = model<Order>('Order', OrderSchema);


