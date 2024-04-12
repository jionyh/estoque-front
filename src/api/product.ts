import { baseURL } from "@/config/api";
import { ProductResponse } from "@/types/product";
import { revalidateTag } from "next/cache";

export const create = async (
  searchTerm: string,
  priceMin: string,
  priceMax: string,
  website: string,
) => {
  "use server";
  const res = await fetch(`${baseURL}/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm, priceMax, priceMin, website }),
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
