import { Category } from "./category";
import { Product } from "./product";
import { Supplier } from "./supplier";
import { Unit } from "./unit";

export interface Inventory {
  entryId: number;
  date: Date;
  quantity: number;
  expiryDate: Date | null;
  addedBy: string
  type: 'IN' | 'OUT'
  supplier: string
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

export interface InventoryItem{
  productId: number;
  name: string;
  quantity: number;
  expiryDate: Date | null;
  category: Category
  unit: Unit
  inventoryEntries: Inventory[]
}

export interface InventoryAllList{
  success: boolean;
  data:InventoryItem[]
}
