<template>
  <div class="map-page">
    
    <div class="toolbar">
      <div class="date-controls">
        <span>Le <input type="date" v-model="selectedDate" /></span>
        <span>à <input type="time" v-model="selectedTime" /></span>
        <button class="btn-now" @click="setToNow">Maintenant</button>
      </div>
      </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIsismapStore } from '../stores/isismap'
import { defineComponent, h } from 'vue'

const store = useIsismapStore()

// 1. Initialisation avec l'heure réelle
const now = new Date()
// On formate la date en YYYY-MM-DD
const selectedDate = ref(now.toISOString().split('T')[0])
// On formate l'heure en HH:mm
const selectedTime = ref(now.toTimeString().slice(0, 5))

// Fonction pour revenir à l'heure actuelle
const setToNow = () => {
  const current = new Date()
  selectedDate.value = current.toISOString().split('T')[0]
  selectedTime.value = current.toTimeString().slice(0, 5)
}

const getSalle = (id) => store.salles.find(s => s.id === id) || { id, libelle: id }

// 2. Logique de filtrage "Temps Réel"
const getRoomColor = (idSalle) => {
  // On crée un objet Date basé sur ce que l'utilisateur a choisi dans les inputs
  const currentTarget = new Date(`${selectedDate.value}T${selectedTime.value}`)

  // On cherche un créneau qui correspond à la salle ET à l'heure choisie
  const creneau = store.creneaux.find(c => {
    const start = new Date(c.debut)
    const end = new Date(c.fin)
    return c.id_salle === idSalle && currentTarget >= start && currentTarget < end
  })

  if (creneau) {
    const promo = store.promotions.find(p => p.id === creneau.id_prom)
    return promo ? promo.couleur : '#e2e2e2'
  }
  return '#e2e2e2' 
}

const getRoomInfo = (idSalle) => {
  const currentTarget = new Date(`${selectedDate.value}T${selectedTime.value}`)
  const creneau = store.creneaux.find(c => {
    const start = new Date(c.debut)
    const end = new Date(c.fin)
    return c.id_salle === idSalle && currentTarget >= start && currentTarget < end
  })
  return creneau ? creneau.enseignant : null
}

// ... (Le reste du composant RoomBlock et du style reste identique)
</script>

<style scoped>
/* Ajoute juste ce petit style pour le bouton "Maintenant" */
.btn-now {
  margin-left: 10px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
}
.btn-now:hover {
  background-color: var(--color-primary-dark);
}
/* ... rest of styles */
</style>