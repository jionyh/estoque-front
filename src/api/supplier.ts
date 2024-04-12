import { baseURL } from "@/config/api";
import { SupplierResponse } from "@/types/supplier";
import { revalidateTag } from "next/cache";

export const create = async (
  searchTerm: string,
  priceMin: string,
  priceMax: string,
  website: string,
) => {
  "use server";
  const res = await fetch(`${baseURL}/supplier/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm, priceMax, priceMin, website }),
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
