import { Schema, model } from 'mongoose';
import database from '../services/database';

const OrderTestCollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

database.setupSchema(OrderTestCollectionSchema);

export const OrderTestCollectionModel = model<any>('OrderTestCollection', OrderTestCollectionSchema);


