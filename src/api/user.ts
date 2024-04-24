import { baseURL, fetchOptions } from "@/config/api";

export const login = async ({email,password}:{email:any, password:any}) => {
  "use server";

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/user/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const json =  await res.json();


  return json
};

