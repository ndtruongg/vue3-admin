import Cookie from 'js-cookie'
import { ACCESS_TOKEN } from '@/constants/common.const'

export const setAccessToken = (token: string) => {
  return Cookie.set(ACCESS_TOKEN, token, {
    expires: 7,
    secure: true
  })
}

export const getAccessToken = () => {
  return Cookie.get(ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  return Cookie.remove(ACCESS_TOKEN)
}
