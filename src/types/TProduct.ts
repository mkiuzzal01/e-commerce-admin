import { z } from "zod";

export interface Attribute {
  id: string;
  value: string;
  quantity: number;
}

export interface Variant {
  id: string;
  name: string;
  attributes: Attribute[];
}

export interface SelectedImage {
  _id: string;
  photo: {
    url: string;
  };
  photoName: string;
}

export const attributeSchema = z.object({
  id: z.string(),
  value: z.string().min(1, "Option value is required"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
});

export const variantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Variant type is required"),
  attributes: z
    .array(attributeSchema)
    .min(1, "At least one option is required"),
});

export const productFormSchema = z.object({
  productCode: z.string().min(1, "Product code is required"),
  title: z.string().min(1, "Title is required").max(100),
  subTitle: z.string().min(1, "Subtitle is required").max(200),
  totalQuantity: z.number().min(0, "Quantity must be at least 0"),
  price: z.number().min(0, "Price must be at least 0"),
  discount: z.number().min(0, "Discount must be at least 0").max(100),
  mainCategory: z.string().min(1, "Main category is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  description: z.string().min(1, "Description is required").max(2000),
  status: z.string().min(1, "Status is required"),
  activity: z.string().min(1, "Activity is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
