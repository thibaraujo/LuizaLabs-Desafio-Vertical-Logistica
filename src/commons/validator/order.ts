import { z } from 'zod';
import { dateSchema, idSchema, numberSchema, pageSchema, pageSizeSchema, productSchema } from './schemas';

// Funções para retornar os esquemas de validação usando Zod
const OrderValidator = {
  get: z.object({
    query: z.object({
      id: idSchema.optional(),
      page: pageSchema.optional(),
      pageSize: pageSizeSchema.optional(),
      startDate: dateSchema.optional(),
      endDate: dateSchema.optional(),
      order_id: numberSchema.optional(),
      user_id: numberSchema.optional(),
    }).strict(),
  }),

  create: z.object({
    body: z.object({
      order_id: z.string(),
      user_id: z.string(),
      name: z.string(),
      date: z.string(),
      product: productSchema,
      total: z.string().optional(),
    }).strict(),
  }),

  delete: z.object({
    query: z.object({
      id: idSchema,
    }),
  }),

  update: z.object({
    query: z.object({
      id: idSchema,
    }),
    body: z.object({
      order_id: z.number().optional(),
      user_id: z.number().optional(),
      name: z.string().optional(),
      date: z.string().optional(),
      product: productSchema.optional(),
      total: z.number().optional()
    }),
  }),

  activate: z.object({
    query: z.object({
      id: idSchema
    }),
  }),
};

export default OrderValidator;
