'use strict';
import { Router } from 'express';
import { OrderController } from '../controllers/order';
import OrderValidator from '../commons/validator/order';
import validate from '../services/validator';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cadastro de pedido
router.post('/', validate(OrderValidator.create), OrderController.create);

// Listagem e busca de pedidos
router.get('/', validate(OrderValidator.get), (req, res, next) => {
  return OrderController.list(req, res, next);
});

// Cadastro de pedidos a partir de arquivo
router.post('/files', [validate(OrderValidator.uploadFile), upload.single("file")], OrderController.createFromFile);

export default router;