import { Category } from "./category";
import { Unit } from "./unit";

export interface Product {
  productId: number;
  name: string;
  minStock: number;
  unit: Unit;
  category: Category;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
}
