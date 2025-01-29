import { createRouter, createWebHistory } from 'vue-router'
import inventory from '@/components/inventory/inventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: inventory,
    }
  ],
})

export default router
