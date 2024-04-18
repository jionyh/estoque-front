import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { InventoryCreate, InventoryCreateResponse, InventoryResponse } from "@/types/inventory";
import { revalidateTag } from "next/cache";

export const create = async (
data:Omit<InventoryCreate,'entryId'>
):Promise<InventoryCreateResponse | ErrorResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/inventory/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("allInventory");
  return await res.json();
};
export const getAll = async (): Promise<InventoryResponse> => {
  "use server";
  const res = await fetch(`${baseURL}/inventory`, {
    cache: "no-cache",
    next: { tags: ["allInventory"] },
  });
  return await res.json();
};
