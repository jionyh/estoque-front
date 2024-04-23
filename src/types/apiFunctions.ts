import {
  ProductCreate,
  ProductCreateResponse,
  ProductResponse,
} from "./product";
import { Supplier, SupplierCreateResponse, SupplierResponse } from "./supplier";
import { InventoryAllList, InventoryCreate, InventoryCreateResponse, InventoryResponse } from "./inventory";
import { CategoryCreateResponse, CategoryResponse } from "./category";
import { ErrorResponse } from "./error";
import { UnitCreateResponse, UnitResponse } from "./unit";

export interface ApiFunctions {
  product: {
    getAll: () => Promise<ProductResponse>;
    create: (
      data: Omit<ProductCreate, "productId">,
    ) => Promise<ProductCreateResponse | ErrorResponse>;
    edit: (
      data: ProductCreate,
    ) => Promise<ProductCreateResponse | ErrorResponse>;
    delete: (
      data: ProductCreate,
    ) => Promise<ProductCreateResponse | ErrorResponse>;
  };
  supplier: {
    getAll: () => Promise<SupplierResponse>;
    create: (
      data: Omit<Supplier, "supplierId">,
    ) => Promise<SupplierCreateResponse | ErrorResponse>;
    delete: (data: Supplier) => Promise<SupplierCreateResponse | ErrorResponse>;
    edit: (data: Supplier) => Promise<SupplierCreateResponse | ErrorResponse>;
  };
  inventoryEntry: {
    get: (productId:string)=>Promise<any>
    getAll: () => Promise<InventoryAllList>;
    create: (data:Omit<InventoryCreate,'entryId'>)=>Promise<InventoryCreateResponse | ErrorResponse>;
    remove: ({productId, quantity}:{productId:number, quantity:number})=>Promise<InventoryCreateResponse | ErrorResponse>;
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
