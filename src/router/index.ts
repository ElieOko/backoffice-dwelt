import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthRoutes from './AuthRoutes'
import { MainRoutes } from './MainRoutes'
import { getUser } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    MainRoutes,
    AuthRoutes
  ]
})
// //{
//   name: 'Side Login',
//   path: '/auth/login',
//   component: () => import('@/views/authentication/SideLogin.vue')
// }
router.beforeEach((to, from, next) => {
  //const store = useTestStore()
  if (to.meta.requiresAuth && getUser() == null) {
    next('/auth/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  } else {
    next(); // Permettre l'accès à la page demandée
  }
});
export default router
