import { createRouter, createWebHashHistory } from 'vue-router'
import PageIndex from '../views/PageIndex.vue'
import PageFoo from '../views/PageFoo.vue'
import PageBar from '../views/PageBar.vue'

export const router = createRouter({
  history: createWebHashHistory('06-vue-router/20-UiLink'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: PageIndex,
    },
    {
      path: '/foo',
      name: 'foo',
      component: PageFoo,
    },
    {
      path: '/bar',
      name: 'bar',
      component: PageBar,
    },
  ],
})
