export interface AuthUser {
  name: string
  email: string
  accessToken: string
  refreshToken: string
}

export interface AuthLogin {
  success: boolean
  user: AuthUser
}