import { ProductResponse } from "./product";
import { SupplierResponse } from "./supplier";
import { InventoryResponse } from "./inventory";

export interface ApiFunctions {
  product: {
    getAll: () => Promise<ProductResponse>;
  };
  supplier: {
    getAll: () => Promise<SupplierResponse>;
  };
  inventoryEntry: {
    getAll: () => Promise<InventoryResponse>;
  };
}
