import { baseURL, fetchOptions } from "@/config/api";
import { revalidateTag } from "next/cache";
import { getAll } from "./inventoryEntry";
import { cookies } from "next/headers";
import { AuthResponse, UserType } from "@/types/authType";
import { ErrorResponse } from "@/types/error";

export const login = async (data:UserType):Promise<AuthResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/user/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });

  const json =  await res.json();

  console.log('refreshToken recebido', json.data.refreshToken)

  return json
};

export const refreshToken = async ({refreshToken}:{refreshToken:string}) => {
  "use server";

  const res = await fetch(`${baseURL}/user/refresh-token`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken}`
    },
    method: "POST",
  });

  const json =  await res.json();
  return json
};

