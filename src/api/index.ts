import {
  create as createProduct,
  getAll as getAllProducts,
  deleteProduct,
  edit as editProduct,
} from "./product";
import {
  create as createSupplier,
  getAll as getAllSuppliers,
  deleteSupplier,
  edit as editSupplier,
} from "./supplier";
import {
  create as createInventoryEntry,
  getAll as getAllInventoryEntries,
} from "./inventoryEntry";
import {
  create as createCategory,
  getAll as getAllCategories,
  deleteCategory,
  edit as editCategory,
} from "./category";
import {
  create as createUnit,
  deleteUnit,
  getAll as getAllUnits,
  edit as editUnit,
} from "./unit";
import { ApiFunctions } from "@/types/apiFunctions";

const api: ApiFunctions = {
  product: {
    getAll: getAllProducts,
    create: createProduct,
    delete: deleteProduct,
    edit: editProduct,
  },
  supplier: {
    getAll: getAllSuppliers,
    create: createSupplier,
    delete: deleteSupplier,
    edit: editSupplier,
  },
  inventoryEntry: { getAll: getAllInventoryEntries, create: createInventoryEntry },
  category: {
    create: createCategory,
    getAll: getAllCategories,
    delete: deleteCategory,
    edit: editCategory,
  },
  unit: {
    create: createUnit,
    getAll: getAllUnits,
    delete: deleteUnit,
    edit: editUnit,
  },
};

export default api;
