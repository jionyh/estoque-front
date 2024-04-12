import { Product } from "./product";
import { Supplier } from "./supplier";

export interface Inventory {
  entryId: number;
  date: Date;
  quantity: number;
  expiryDate: Date | null;
  product: Product;
  supplier: Supplier;
}

export interface InventoryResponse {
  success: boolean;
  data: Inventory[];
}
