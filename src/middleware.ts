export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/cadastrar',
    '/',
    '/estoque',
    '/produtos',
    '/profile',
  ],
}