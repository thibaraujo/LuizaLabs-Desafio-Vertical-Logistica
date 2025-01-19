import { Order } from '../classes/order';
import { OrderServiceBase, IGetQuery, IGetResponse, ICreateFromFileResponse } from '../commons/requests/order';
import { IGetByIdResponse, ICreateBody, ICreateResponse } from '../commons/requests/order';
import { CustomError } from '../services/errorHandler';
import { pipeline, Readable, Transform } from "stream";
import { promisify } from 'util';
import { OrderTestCollectionModel } from '../models/orderTestCollection';
import { transformStringToOrderJSON } from '../utils/orderService';
import { OrderModel } from '../models/order';
const pipelineAsync = promisify(pipeline); // callback -> promise


class OrderServiceClass extends OrderServiceBase {
  private static instance: OrderServiceClass;
  static getInstance(): OrderServiceClass {
    if (!OrderServiceClass.instance) OrderServiceClass.instance = new OrderServiceClass();
    return OrderServiceClass.instance;
  }

  async get(query: IGetQuery): Promise<IGetResponse> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<IGetByIdResponse> {
    throw new Error('Method not implemented.');
  }

  async create(data: ICreateBody): Promise<ICreateResponse> {
    throw new Error('Method not implemented.');
  }

  async createFromFile(file: Express.Multer.File): Promise<ICreateFromFileResponse> {
    if (file.mimetype !== 'text/plain') throw new CustomError('Arquivo inválido. Enviar arquivo de formato .txt.', 400);

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

    pipelineAsync(
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