import { ProductResponse } from "./product";
import { SupplierResponse } from "./supplier";
import { InventoryResponse } from "./inventory";
import { CategoryCreateResponse, CategoryResponse } from "./category";
import { ErrorResponse } from "./error";
import { UnitCreateResponse, UnitResponse } from "./unit";

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
  category: {
    getAll: () => Promise<CategoryResponse>;
    create: (name: string) => Promise<CategoryCreateResponse | ErrorResponse>;
    delete: (
      categoryId: number,
      name: string,
    ) => Promise<CategoryCreateResponse | ErrorResponse>;
    edit: (
      categoryId: number,
      name: string,
    ) => Promise<CategoryCreateResponse | ErrorResponse>;
  };
  unit: {
    getAll: () => Promise<UnitResponse>;
    create: (name: string) => Promise<UnitCreateResponse | ErrorResponse>;
    delete: (
      unitId: number,
      name: string,
    ) => Promise<UnitCreateResponse | ErrorResponse>;
    edit: (
      unitId: number,
      name: string,
    ) => Promise<UnitCreateResponse | ErrorResponse>;
  };
}
