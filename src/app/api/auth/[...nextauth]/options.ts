
import api from '@/api'
import { AuthUser } from '@/types/authType'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from "jwt-decode";
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import { redirect } from 'next/navigation';




export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 horas
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email && !credentials?.password) {
          throw new Error('invalid Credentials')
        }
        const { email, password } = credentials
        const response = await api.user.login({email,password})
        if (!response) throw new Error('failed to fetch login')
        if (!response.success) throw new Error(response.data as string)
        return response.data
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }:{token:JWT, user: User | AdapterUser | AuthUser}){
      if (user) {
        const {user:userData, accessToken, refreshToken} = user as AuthUser
        token.user = userData
        token.accessToken = accessToken
        token.refreshToken = refreshToken
        
      }
      return token
    },
    async session({ token, session }) {
      if (token) {
        session.user ={
          name: token.user.name,
          email: token.user.email,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        }
        const decodedToken = jwtDecode(token.accessToken)
        const decodedRefreshToken = jwtDecode(token.accessToken)
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (session && decodedToken.exp! - currentTime < 820) { // 300 segundos = 5 minutos

          try {
            const refreshedSession = await api.user.refreshToken({refreshToken: session.user.refreshToken})
            if(!refreshedSession.success){
              console.log('tentou')
              session.redirect = true
            }

            session.user.accessToken = refreshedSession.data.accessToken
            session.user.refreshToken = refreshedSession.data.refreshToken

          } catch (error) {
            console.error('Erro ao renovar o token de acesso:', error);
          }
        }
      }
      return session;
    }
  },
}