import { Product } from "./product";
import { Supplier } from "./supplier";

export interface Inventory {
  entryId: number;
  date: Date;
  quantity: number;
  expiryDate: Date | null;
  product: Omit<Product, 'unit' | 'category'>
  supplier: Omit<Supplier, 'phone' | 'email'>
}

export interface InventoryResponse {
  success: boolean;
  data: Inventory[];
}

export interface InventoryCreateResponse {
  success: boolean;
  data: Inventory;
}

export interface InventoryCreate {
  entryId: number
  productId: number
  quantity: number
  expiryDate: string | null;
  supplierId: number
}
