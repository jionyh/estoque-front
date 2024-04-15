import { baseURL } from "@/config/api";
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
  const res = await fetch(`${baseURL}/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};
export const getAll = async (): Promise<ProductResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/product`, {
    cache: "no-cache",
    next: { tags: ["allProducts"] },
  });
  return await res.json();
};

export const edit = async (
  data: ProductCreate,
): Promise<ProductCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/product/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};

export const deleteProduct = async (
  data: ProductCreate,
): Promise<ProductCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/product/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allProducts");
  return await res.json();
};
