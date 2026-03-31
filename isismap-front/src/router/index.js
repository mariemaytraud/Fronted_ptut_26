// src/router/index.js
// ... (garder les imports identiques)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/map' // On redirige l'accueil directement vers la carte
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    }
  ]
})