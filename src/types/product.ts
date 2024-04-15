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

export interface ProductCreateResponse {
  success: true;
  data: Product;
}

export interface ProductCreate {
  productId: number;
  name: string;
  unitId: number;
  categoryId: number;
  minStock: number;
}
