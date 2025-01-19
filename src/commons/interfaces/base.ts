import mongoose from 'mongoose';

export type IGetQuery = {
  page?: number
  pageSize?: number
  search?: string
}

export type IGetResponse<IRawData> = {
  results?: IRawData[]
  total?: number
}

export interface IStatus {
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export interface IObjectRaw {
  _id?: mongoose.Types.ObjectId,
  status?: IStatus
}

export interface IBackGroundResponse {
  message: string
  file: string
}