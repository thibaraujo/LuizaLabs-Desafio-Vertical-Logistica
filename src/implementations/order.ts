import { Order } from '../classes/order';
import { OrderServiceBase, IGetQuery, IGetResponse, ICreateFromFileResponse } from '../commons/requests/order';
import { IGetByIdResponse, ICreateBody, ICreateResponse } from '../commons/requests/order';
import { CustomError } from '../services/errorHandler';
import { pipeline, Readable, Transform } from "stream";
import { promisify } from 'util';
import { isValidOrder, transformStringToOrderJSON } from '../utils/orderService';
import { OrderModel } from '../models/order';
import mongoose from 'mongoose';
import { IOrder, IOrderListRaw } from '../commons/interfaces/order';
const pipelinePromise = promisify(pipeline); // callback -> promise


class OrderServiceClass extends OrderServiceBase {
  private static instance: OrderServiceClass;
  static getInstance(): OrderServiceClass {
    if (!OrderServiceClass.instance) OrderServiceClass.instance = new OrderServiceClass();
    return OrderServiceClass.instance;
  }

  async get(query: IGetQuery): Promise<IGetResponse> {
    const { order_id, user_id, startDate, endDate }: IGetQuery = query;

    const mongoQuery: mongoose.FilterQuery<IOrder> = {};
    if (order_id) mongoQuery.order_id = parseInt(order_id);
    if (user_id) mongoQuery.user_id = parseInt(user_id);
    if (startDate || endDate) {
      mongoQuery.date = {};
      if (startDate) mongoQuery.date.$gte = startDate;
      if (endDate) mongoQuery.date.$lte = endDate;
    }

    const orders = await OrderModel.aggregate([
      {
        $match: mongoQuery
      },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            order_id: "$order_id",
            date: "$date",
            name: "$name",
          },
          products: { $push: "$product" }
        }
      },
      {
        $project: {
          "products._id": 0,
        }
      },
      {
        $group: {
          _id: {
            user_id: "$_id.user_id"
          },
          user_id: { $first: "$_id.user_id" },
          name: { $first: "$_id.name" },
          orders: {
            $push: {
              order_id: "$_id.order_id",
              date: "$_id.date",
              total: {
                $reduce: {
                  input: "$products",
                  initialValue: 0,
                  in: { $add: ["$$value", "$$this.value"] }
                }
              },
              products: "$products"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          name: 1,
          orders: 1,
        }
      }
    ]) as IOrderListRaw[];

    return orders;
  }

  async createFromFile(file: Express.Multer.File): Promise<ICreateFromFileResponse> {
    if (!file) throw new CustomError('É obrigatório subir um arquivo.', 400);
    if (file?.mimetype !== 'text/plain') throw new CustomError('Arquivo inválido. Enviar arquivo de formato .txt.', 400);

    const fileReadStream = Readable.from(file.buffer.toString().split('\n'));

    const txtToJsonTransformStream = new Transform({
      writableObjectMode: true,
      async transform(chunk, encoding, callback) {
        const txtLine = chunk.toString().split('\n')[0];

        if (!txtLine) {
          callback();
          return;
        }

        const orderObject = transformStringToOrderJSON(txtLine);

        if (!orderObject || !isValidOrder(orderObject)) {
          callback();
          return;
        }

        callback(null, JSON.stringify(orderObject));
      }
    });

    const asyncpersistJsonTransformStream = new Transform({
      writableObjectMode: true,
      async transform(chunk, encoding, callback) {
        const orderJson = JSON.parse(chunk.toString());
        const orderInstance = new Order(orderJson)
        await OrderModel.create(orderInstance);
        callback();
      }
    });

    pipelinePromise(
      fileReadStream,
      txtToJsonTransformStream,
      asyncpersistJsonTransformStream
    );

    return {
      message: `Arquivo de tamanho ${file.size} recebido com sucesso. Processamento em andamento.`,
      file: file.originalname
    } as ICreateFromFileResponse;
  }
}

const OrderService = OrderServiceClass.getInstance();
export default OrderService;