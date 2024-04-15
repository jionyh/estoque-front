import { baseURL } from "@/config/api";
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
  const res = await fetch(`${baseURL}/supplier/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};
export const getAll = async (): Promise<SupplierResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/supplier`, {
    cache: "no-cache",
    next: { tags: ["allSupplier"] },
  });
  return await res.json();
};
export const deleteSupplier = async (
  data: Supplier,
): Promise<SupplierCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/supplier/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};

export const edit = async (
  data: Supplier,
): Promise<SupplierCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/supplier/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allSupplier");
  return await res.json();
};
