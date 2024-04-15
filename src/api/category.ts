"use server";
import { baseURL } from "@/config/api";
import { CategoryCreateResponse, CategoryResponse } from "@/types/category";
import { ErrorResponse } from "@/types/error";
import { revalidateTag } from "next/cache";

export const create = async (
  name: string,
): Promise<CategoryCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  revalidateTag("allCategories");
  return await res.json();
};
export const getAll = async (): Promise<CategoryResponse> => {
  const res = await fetch(`${baseURL}/category`, {
    cache: "no-cache",
    next: { tags: ["allCategories"] },
  });
  return await res.json();
};

export const deleteCategory = async (
  categoryId: number,
  name: string,
): Promise<CategoryCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/category/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId, name }),
  });
  revalidateTag("allCategories");
  return await res.json();
};

export const edit = async (
  categoryId: number,
  name: string,
): Promise<CategoryCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/category/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId, name }),
  });
  revalidateTag("allCategories");
  return await res.json();
};
