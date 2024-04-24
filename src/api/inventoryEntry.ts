import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { InventoryAllList, InventoryCreate, InventoryCreateResponse, InventoryResponse } from "@/types/inventory";
import { revalidateTag } from "next/cache";

export const create = async (
data:Omit<InventoryCreate,'entryId'>
):Promise<InventoryCreateResponse | ErrorResponse> => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/inventory/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
  revalidateTag("allInventory");
  return await res.json();
};
export const getAll = async (): Promise<InventoryAllList> => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/inventory`, {...options, cache:'no-store'});
  
  return await res.json();
};
export const getInventoryEntries = async(productId: string)=>{
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/inventory/${productId}`, {
    ...options,
    next: { tags: [`inventory/${productId}`] },
  });
  return await res.json();
}

export const remove = async ({productId, quantity}:{productId:number, quantity:number}):Promise<InventoryCreateResponse | ErrorResponse>  => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/inventory/remove`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify({productId, quantity}),
  });
  revalidateTag("allInventory");
  return await res.json();
};