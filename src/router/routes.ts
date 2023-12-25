import { SCREEN } from './screen'

const getView = (path: string) => {
  return () => import(`@/views/${path}.vue`)
}

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: SCREEN.home.name,
        component: getView('Home')
      }
    ]
  }
]
