"use server";
import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UnitCreateResponse, UnitResponse } from "@/types/unit";
import { revalidateTag } from "next/cache";

export const create = async (
  name: string,
): Promise<UnitCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/unit/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  revalidateTag("allUnit");
  return await res.json();
};
export const getAll = async (): Promise<UnitResponse> => {
  const res = await fetch(`${baseURL}/unit`, {
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
  const res = await fetch(`${baseURL}/unit/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
  const res = await fetch(`${baseURL}/unit/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ unitId, name }),
  });
  revalidateTag("allUnit");
  return await res.json();
};
