import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  ProductCreate,
  ProductCreateResponse,
  ProductResponse,
} from "@/types/product";
import { revalidateTag } from "next/cache";

export const create = async (
  data: Omit<ProductCreate, "productId">,
): Promise<ProductCreateResponse | ErrorResponse> => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/product/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};
export const getAll = async (): Promise<ProductResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/product`, {
    ...options,
    cache: "no-store",
    next: { tags: ["allProducts"] },
  });
  return await res.json();
};

export const edit = async (
  data: ProductCreate,
): Promise<ProductCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/product/edit`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};

export const deleteProduct = async (
  data: ProductCreate,
): Promise<ProductCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/product/delete`, {
    ...options,
    method: "DELETE",
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};
