import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  colors: z.array(z.string()).min(1, 'At least one color is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  stock: z.record(z.number().min(0, 'Stock cannot be negative')),
  featured: z.boolean().default(false),
  onSale: z.boolean().default(false),
  salePrice: z.number().optional(),
  tags: z.array(z.string()).default([]),
  sku: z.string().min(1, 'SKU is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;