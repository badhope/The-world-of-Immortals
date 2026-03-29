import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/new-game',
    name: 'NewGame',
    component: () => import('@/views/NewGame.vue')
  },
  {
    path: '/load-game',
    name: 'LoadGame',
    component: () => import('@/views/LoadGame.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue'),
    children: [
      {
        path: '',
        name: 'GameMain',
        component: () => import('@/views/game/Main.vue')
      },
      {
        path: 'explore',
        name: 'Explore',
        component: () => import('@/views/game/Explore.vue')
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: () => import('@/views/game/Inventory.vue')
      },
      {
        path: 'crafting',
        name: 'Crafting',
        component: () => import('@/views/game/Crafting.vue')
      },
      {
        path: 'buildings',
        name: 'Buildings',
        component: () => import('@/views/game/Buildings.vue')
      },
      {
        path: 'cultivation',
        name: 'Cultivation',
        component: () => import('@/views/game/Cultivation.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/game/Settings.vue')
      }
    ]
  },
  {
    path: '/settings',
    name: 'SettingsMenu',
    component: () => import('@/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
