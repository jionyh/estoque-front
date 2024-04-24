"use server";
import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UnitCreateResponse, UnitResponse } from "@/types/unit";
import { revalidateTag } from "next/cache";

export const create = async (
  name: string,
): Promise<UnitCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/unit/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify({ name }),
  });
  revalidateTag("allUnit");
  return await res.json();
};
export const getAll = async (): Promise<UnitResponse> => {
  "user server"
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/unit`, {
    ...options,
    cache: "no-cache",
    next: { tags: ["allUnit"] },
  });
  return await res.json();
};

export const deleteUnit = async (
  unitId: number,
  name: string,
): Promise<UnitCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/unit/delete`, {
    ...options,
    method: "DELETE",
    body: JSON.stringify({ unitId, name }),
  });
  revalidateTag("allUnit");
  return await res.json();
};

export const edit = async (
  unitId: number,
  name: string,
): Promise<UnitCreateResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/unit/edit`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify({ unitId, name }),
  });
  revalidateTag("allUnit");
  return await res.json();
};
