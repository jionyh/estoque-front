"use server";
import { baseURL, fetchOptions } from "@/config/api";
import { CategoryCreateResponse, CategoryResponse } from "@/types/category";
import { ErrorResponse } from "@/types/error";
import { revalidateTag } from "next/cache";

export const create = async (
  name: string,
): Promise<CategoryCreateResponse | ErrorResponse> => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/category/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify({ name }),
  });
  revalidateTag("allCategories");
  return await res.json();
};
export const getAll = async (): Promise<CategoryResponse> => {
  'use server'

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/category`, {
    ...options,
    cache: "no-store",
    next: { tags: ["allCategories"] },
  });
  const json =  await res.json();
  return json
};

export const deleteCategory = async (
  categoryId: number,
  name: string,
): Promise<CategoryCreateResponse | ErrorResponse> => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/category/delete`, {
    ...options,
    method: "DELETE",
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

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/category/edit`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify({ categoryId, name }),
  });
  revalidateTag("allCategories");
  return await res.json();
};
