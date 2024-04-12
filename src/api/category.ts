import { baseURL } from "@/config/api";
import { CategoryResponse } from "@/types/category";
import { revalidateTag } from "next/cache";

export const create = async (
  searchTerm: string,
  priceMin: string,
  priceMax: string,
  website: string,
) => {
  "use server";
  const res = await fetch(`${baseURL}/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm, priceMax, priceMin, website }),
  });
  revalidateTag("allCategories");
  return await res.json();
};
export const getAll = async (): Promise<CategoryResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/category`, {
    cache: "no-cache",
    next: { tags: ["allCategories"] },
  });
  return await res.json();
};
