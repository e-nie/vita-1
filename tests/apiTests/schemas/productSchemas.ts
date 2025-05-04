import {z} from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  is_location_offer: z.boolean(),
  is_rental: z.boolean(),
  in_stock: z.boolean(),
  product_image: z.object({
    id: z.string(),
    by_name: z.string(),
    by_url: z.string().url(),
    source_name: z.string(),
    source_url: z.string().url(),
    file_name: z.string(),
    title: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    parent_id: z.union([z.string(),z.null()]),
  }),
  brand: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
});

export type Product = z.infer<typeof ProductSchema>;
