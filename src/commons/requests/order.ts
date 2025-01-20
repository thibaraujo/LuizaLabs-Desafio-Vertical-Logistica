import {
  IGetQuery as DefaultIGetQuery,
  IBackGroundResponse as DefaultIBackGroundResponse
} from '../interfaces/base';
import { IOrder, IOrderListRaw, IOrderRaw } from '../interfaces/order';

export type IGetQuery = DefaultIGetQuery
export type IGetResponse = IOrderListRaw[]
export type IGetByIdResponse = IOrderListRaw
export type ICreateBody = IOrderRaw
export type ICreateResponse = IOrder
export type ICreateFromFileResponse = DefaultIBackGroundResponse

export abstract class OrderServiceBase {
  abstract get(query: IGetQuery): Promise<IGetResponse> //* GET /orders
  abstract createFromFile(file: Express.Multer.File): Promise<ICreateFromFileResponse> //* POST /orders/files
}
