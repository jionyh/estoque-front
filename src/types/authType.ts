export interface UserType{
  email: string
  password: string
}
export interface AuthUser {
  user:UserType,
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  success: true
  data: AuthUser
}