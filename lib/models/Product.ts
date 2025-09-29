import mongoose, { Types, Document, Schema } from 'mongoose';
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: { [key: string]: number };
  featured: boolean;
  onSale: boolean;
  salePrice?: number;
  tags: string[];
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    stock: { type: Map, of: Number, default: {} },
    featured: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    tags: [String],
    sku: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);