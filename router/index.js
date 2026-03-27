import { createRouter, createWebHistory } from 'vue-router'

// On importe nos futures vues (on les créera juste après)
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView // Page d'accueil : Choix du rôle
    },
    {
      path: '/map',
      name: 'map',
      component: MapView // Pages communes : Visualisation des salles
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView // Page d'administration : Statistiques
    }
  ]
})

export default router