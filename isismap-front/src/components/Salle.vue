<template>
  <div class="room" :style="{ backgroundColor: roomColor }" @click="onClick">
    <span class="room-name">{{ salle.libelle }}</span>
    <span class="room-info" v-if="roomInfo">{{ roomInfo }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIsismapStore } from '../stores/isismap'

const props = defineProps({
  salle: Object,
  selectedDate: String,
  selectedTime: String
})

const store = useIsismapStore()

const onClick = () => {
  alert(`Bientôt, le détail de la salle ${props.salle.libelle} s'ouvrira ici !`)
}

// Cherche s'il y a un cours en ce moment précis
const activeCreneau = computed(() => {
  if (!props.selectedDate || !props.selectedTime) return null;
  const currentTarget = new Date(`${props.selectedDate}T${props.selectedTime}`)
  
  return store.creneaux.find(c => {
    if(!c.debut || !c.fin) return false;
    const start = new Date(c.debut)
    const end = new Date(c.fin)
    return c.id_salle === props.salle.id && currentTarget >= start && currentTarget < end
  })
})

// Attribue la couleur
const roomColor = computed(() => {
  if (activeCreneau.value) {
    const promo = store.promotions.find(p => p.id === activeCreneau.value.id_prom)
    return promo ? promo.couleur : '#e2e2e2'
  }
  return '#e2e2e2' // Libre = gris clair
})

// Affiche le nom du prof
const roomInfo = computed(() => {
  return activeCreneau.value ? activeCreneau.value.enseignant : null
})
</script>

<style scoped>
.room {
  flex: 1; min-height: 80px; min-width: 60px;
  border-radius: 4px; display: flex; flex-direction: column;
  justify-content: center; align-items: center; cursor: pointer;
  color: white; text-align: center; padding: 5px;
  transition: transform 0.1s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
/* Si la salle est libre (grise), on met le texte en foncé */
.room[style*="rgb(226, 226, 226)"], .room[style*="#e2e2e2"] { color: #555; }
.room:hover { transform: scale(1.05); filter: brightness(1.1); }
.room-name { font-weight: bold; font-size: 1rem; }
.room-info { font-size: 0.75rem; margin-top: 4px; }
</style>