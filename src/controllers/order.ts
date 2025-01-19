'use strict';

import { Response, NextFunction, Request } from 'express';
import OrderService from '../implementations/order';

export const OrderController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).send(await OrderService.create(req.body));
    } catch (error: Error | unknown) {
      console.error('ERRO CRIANDO PEDIDO: ', error);
      return next(error);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send(await OrderService.get(req.query));
    } catch (error) {
      console.error('ERRO LISTANDO PEDIDOS: ', error);
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send(await OrderService.getById(req.query.id as string));
    } catch (error) {
      console.error('ERRO BUSCANDO PEDIDO: ', error);
      return next(error);
    }
  },

  async createFromFile(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).send(await OrderService.createFromFile(req.file as Express.Multer.File));
    } catch (error) {
      console.error('ERRO CRIANDO PEDIDOS A PARTIR DE ARQUIVO: ', error);
      return next(error);
    }
  }
};
