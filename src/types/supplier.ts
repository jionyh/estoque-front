export interface Supplier {
  supplierId: number;
  name: string;
  email: string;
  phone: string;
}

export interface SupplierResponse {
  success: boolean;
  data: Supplier[];
}
export interface SupplierCreateResponse {
  success: boolean;
  data: Supplier;
}
