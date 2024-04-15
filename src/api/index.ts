import { create as createProduct, getAll as getAllProducts } from "./product";
import {
  create as createSupplier,
  getAll as getAllSuppliers,
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
  product: { getAll: getAllProducts },
  supplier: { getAll: getAllSuppliers },
  inventoryEntry: { getAll: getAllInventoryEntries },
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
