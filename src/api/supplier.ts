import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  Supplier,
  SupplierCreateResponse,
  SupplierResponse,
} from "@/types/supplier";
import { revalidateTag } from "next/cache";

export const create = async (
  data: Omit<Supplier, "supplierId">,
): Promise<SupplierCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/supplier/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};
export const getAll = async (): Promise<SupplierResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/supplier`, {
    ...options,
    cache: "no-store",
    next: { tags: ["allSupplier"] },
  });
  return await res.json();
};
export const deleteSupplier = async (
  data: Supplier,
): Promise<SupplierCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/supplier/delete`, {
    ...options,
    method: "DELETE",
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};

export const edit = async (
  data: Supplier,
): Promise<SupplierCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/supplier/edit`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};
