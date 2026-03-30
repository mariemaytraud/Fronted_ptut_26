<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">
        <h1>ISIS<span>MAP</span></h1>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/map" class="nav-link">Carte</router-link>
        <router-link to="/stats" class="nav-link">Statistiques</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); /* Petite ombre légère sous le header */
}

.logo h1 {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 1.5rem;
}

.logo span {
  color: var(--color-primary);
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

/* Style quand on survole un lien ou quand on est sur la page active */
.nav-link:hover, .router-link-active {
  background-color: var(--color-primary);
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>