import { baseURL } from "@/config/api";
import { UnitResponse } from "@/types/unit";
import { revalidateTag } from "next/cache";

export const create = async (
  searchTerm: string,
  priceMin: string,
  priceMax: string,
  website: string,
) => {
  "use server";
  const res = await fetch(`${baseURL}/unit/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm, priceMax, priceMin, website }),
  });
  revalidateTag("allUnit");
  return await res.json();
};
export const getAll = async (): Promise<UnitResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/unit`, {
    cache: "no-cache",
    next: { tags: ["allUnit"] },
  });
  return await res.json();
};
