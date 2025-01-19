import { IObjectRaw, IStatus } from '../commons/interfaces/base';
import mongoose from 'mongoose';

export class ObjectRaw implements IObjectRaw {
  _id?: mongoose.Types.ObjectId;
  status?: IStatus;

  constructor(commonFields: IObjectRaw) {
    this._id = commonFields._id;
    this.status = commonFields.status;
  }
}