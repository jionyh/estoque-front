import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'


async function getTokens() {
  try {
    const res = await getServerSession(authOptions);
    if (!res || !res.user.accessToken || !res.user.refreshToken) return '';
    return `accessToken=${res.user.accessToken}; refreshToken=${res.user.refreshToken}`;
  } catch (e) {
    return '';
  }
}

export const fetchOptions = async () => {
  return {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': await getTokens(),
    },
  } as RequestInit;
};

export const baseURL = "http://localhost:3001";
//export const baseURL = "https://estoqueapi.jiony.dev";



