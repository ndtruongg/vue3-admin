import axios from 'axios'
import type { AxiosInstance } from 'axios'

import router from '@/router'
import { getAccessToken, removeAccessToken } from '@/utils/cookie'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.API_ENDPOINT,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken()

        if (token) {
          config.headers['Accept'] = 'application/json'
          config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response.status === 401) {
          removeAccessToken()
          return router.push('/auth/login')
        }

        if (error.response.status === 404) {
          removeAccessToken()
          return router.push('/not-found')
        }

        if (error.response.status === 500) {
          removeAccessToken()
          return router.push('/internal-error')
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
