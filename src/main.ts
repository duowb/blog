

import autoRoutes from 'pages-generated'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/main.css'
import { ViteSSG } from 'vite-ssg'

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})
console.log("🚀 ~ file: main.ts:19 ~ routes ~ routes:", routes)


export const createApp =  ViteSSG(App, {
  routes,
})


