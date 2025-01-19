import mongoose from 'mongoose';
import { z } from 'zod';

export const idSchema = z.custom<mongoose.Types.ObjectId>();

export const pageSchema = z.coerce.number().min(1);

export const pageSizeSchema = z.coerce.number().min(-1);

export const productSchema = z.object({
  product_id: z.coerce.number(),
  value: z.coerce.number(),
});

export const totalSchema = z.coerce.number();