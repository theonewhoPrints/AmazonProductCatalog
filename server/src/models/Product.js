import mongoose from 'mongoose';

// Allow additional dynamic fields. Keep strict: false to accept user-added fields.
const productSchema = new mongoose.Schema(
  {
    "Uniq Id": { type: String, required: true, unique: true },
    "Product Name": { type: String, required: true },
    "Category": { type: String },
    "Upc Ean Code": { type: String },
    "Selling Price": { type: String },
    "Model Number": { type: String },
    "About Product": { type: String },
    "Product Specification": { type: String },
    "Technical Details": { type: String },
    "Shipping Weight": { type: String },
    "Product Dimensions": { type: String },
    "Image": { type: String },
    "Variants": { type: String },
    "Product Url": { type: String },
    "Is Amazon Seller": { type: String }
  },
  { strict: false, timestamps: true }
);


export const Product = mongoose.model('Product', productSchema, 'productcatalog');


