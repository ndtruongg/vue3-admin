import { SCREEN } from '@/router/screen'
import { getAccessToken } from '@/utils/cookie'

export default async function auth(to: any, from: any, next: any) {
  const token = getAccessToken()

  if (to.name === SCREEN.login.name) {
    if (!token) {
      return next()
    }
    return next({ name: SCREEN.home.name })
  }

  if (SCREEN.login.name !== to.name) {
    if (!token) {
      return next({ name: SCREEN.login.name })
    }
  }
  return next()
}
