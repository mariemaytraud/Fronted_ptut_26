<template>
  <div class="map-page">
    
    <div class="toolbar">
      <div class="date-controls" v-if="currentView === 'jour'">
        
        <label class="toggle-realtime">
          <input type="checkbox" v-model="isNowActive" />
          Temps réel
        </label>

        <span>Le <input type="date" v-model="selectedDate" :disabled="isNowActive" /></span>
        <span>à <input type="time" v-model="selectedTime" :disabled="isNowActive" /></span>
      </div>

      <div class="date-controls" v-else>
        <span>Du <input type="date" v-model="dateDebut" /></span>
        <span>au <input type="date" v-model="dateFin" /></span>
      </div>

      <div class="view-controls">
        <select v-model="currentView" @change="onViewChange">
          <option value="jour">Journalier</option>
          <option value="semaine">Hebdomadaire</option>
          <option value="mois">Mensuel</option>
        </select>
      </div>
    </div>

    <div class="map-content">
      
      <div class="building-map">
        
        <div class="floor">
          <div class="floor-label">1ERE ETAGE</div>
          <div class="architecture-grid">
            <div class="left-wing">
              <Salle :salle="getSalle('CHL')" v-bind="salleProps" class="room-large" />
            </div>
            <div class="main-corridor">
              <div class="row top-row">
                <Salle :salle="getSalle('B110')" v-bind="salleProps" />
                <Salle :salle="getSalle('B108')" v-bind="salleProps" />
                <Salle :salle="getSalle('B107')" v-bind="salleProps" />
                <Salle :salle="getSalle('B104')" v-bind="salleProps" />
                <Salle :salle="getSalle('B103')" v-bind="salleProps" />
                <Salle :salle="getSalle('B101')" v-bind="salleProps" />
              </div>
              <div class="hallway-space"></div>
              <div class="row bottom-row">
                <div class="stairs">Escaliers</div>
                <Salle :salle="getSalle('B109')" v-bind="salleProps" />
                <Salle :salle="getSalle('B106')" v-bind="salleProps" />
                <Salle :salle="getSalle('B105')" v-bind="salleProps" />
                <div class="wc">WC</div>
                <Salle :salle="getSalle('B102')" v-bind="salleProps" />
              </div>
            </div>
          </div>
        </div>

        <hr class="floor-divider" />

        <div class="floor">
          <div class="floor-label">RDC</div>
          <div class="architecture-grid">
            <div class="left-wing wing-split">
              <Salle :salle="getSalle('B019')" v-bind="salleProps" />
              <Salle :salle="getSalle('B019a')" v-bind="salleProps" />
            </div>
            <div class="main-corridor">
              <div class="row top-row">
                <Salle :salle="getSalle('B017')" v-bind="salleProps" />
                <Salle :salle="getSalle('B011')" v-bind="salleProps" />
                <Salle :salle="getSalle('B009')" v-bind="salleProps" />
                <Salle :salle="getSalle('B007')" v-bind="salleProps" />
                <Salle :salle="getSalle('PetitAmphi')" v-bind="salleProps" class="room-amphi" />
              </div>
              <div class="hallway-space"></div>
              <div class="row bottom-row">
                <Salle :salle="getSalle('B018')" v-bind="salleProps" class="room-small" />
                <div class="stairs">Escaliers</div>
                <Salle :salle="getSalle('B012')" v-bind="salleProps" />
                <Salle :salle="getSalle('B010')" v-bind="salleProps" />
                <div class="wc">WC</div>
              </div>
            </div>
            <div class="right-wing">
              <Salle :salle="getSalle('GrandAmphi')" v-bind="salleProps" class="room-xl" />
            </div>
          </div>
        </div>

      </div>

      <div class="legend">
        <h3>Légende</h3>
        
        <div v-if="currentView === 'jour'">
          <div v-for="promo in store.promotions" :key="promo.id" class="legend-item">
            <div class="color-box" :style="{ backgroundColor: promo.couleur }"></div>
            <span>{{ promo.id }}</span>
          </div>
        </div>

        <div v-else class="heatmap-legend">
          <div class="legend-item"><div class="color-box" style="background-color: #5e29cc"></div><span>Très occupé</span></div>
          <div class="legend-item"><div class="color-box" style="background-color: #8b5ce3"></div><span>Occupé</span></div>
          <div class="legend-item"><div class="color-box" style="background-color: #b392eb"></div><span>Modéré</span></div>
          <div class="legend-item"><div class="color-box" style="background-color: #d8c8f5"></div><span>Peu occupé</span></div>
          <div class="legend-item"><div class="color-box" style="background-color: #e2e2e2"></div><span>Libre</span></div>
        </div>
      </div>

    </div>

    <ModaleSalle 
      v-if="salleSelectionnee" 
      :salle="salleSelectionnee" 
      @fermer="fermerModale" 
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIsismapStore } from '../stores/isismap'
import Salle from '../components/Salle.vue'
import ModaleSalle from '../components/ModaleSalle.vue' 

const store = useIsismapStore()

const salleSelectionnee = ref(null) 


const ouvrirModale = (salle) => {
  // On bloque l'ouverture si on est en mode "jour" !
  if (currentView.value === 'jour') return; 
  
  salleSelectionnee.value = salle 
}
const fermerModale = () => {
  salleSelectionnee.value = null 
}

// ---- GESTION DES DATES ET VUES ----
const currentView = ref('jour')
const now = new Date()
const selectedDate = ref(now.toISOString().split('T')[0])
const selectedTime = ref(now.toTimeString().slice(0, 5))

const dateDebut = ref(now.toISOString().split('T')[0])
const uneSemainePlusTard = new Date(now)
uneSemainePlusTard.setDate(now.getDate() + 7)
const dateFin = ref(uneSemainePlusTard.toISOString().split('T')[0])

// v-bind regroupe toutes ces propriétés pour les envoyer aux composants <Salle />
const salleProps = computed(() => ({
  currentView: currentView.value,
  selectedDate: selectedDate.value,
  selectedTime: selectedTime.value,
  dateDebut: dateDebut.value,
  dateFin: dateFin.value,
  onClickSalle: ouvrirModale 
}))

import { ref, computed, watch, onUnmounted } from 'vue' // <-- Ajoute watch et onUnmounted ici !
import { useIsismapStore } from '../stores/isismap'
import Salle from '../components/Salle.vue'
import ModaleSalle from '../components/ModaleSalle.vue' 

const store = useIsismapStore()

// ---- GESTION DE LA MODALE ----
const salleSelectionnee = ref(null) 

const ouvrirModale = (salle) => {
  if (currentView.value === 'jour') return; // On bloque le clic en mode jour
  salleSelectionnee.value = salle 
}
const fermerModale = () => {
  salleSelectionnee.value = null 
}

// ---- GESTION DES DATES ET VUES ----
const currentView = ref('jour')

// Nos variables de date/heure
const selectedDate = ref('')
const selectedTime = ref('')

// -- NOUVEAU : Logique du "Temps Réel" --
const isNowActive = ref(true) // Activé par défaut au chargement
let intervalTimer = null // Un minuteur pour rafraîchir l'heure

const updateToNow = () => {
  const current = new Date()
  selectedDate.value = current.toISOString().split('T')[0]
  selectedTime.value = current.toTimeString().slice(0, 5)
}

// "watch" observe la case à cocher. Si elle change, il exécute ce code :
watch(isNowActive, (isActive) => {
  if (isActive) {
    updateToNow() // On met à l'heure tout de suite
    intervalTimer = setInterval(updateToNow, 60000) // Puis on met à jour chaque minute (60000ms)
  } else {
    clearInterval(intervalTimer) // On arrête le minuteur si l'utilisateur décoche
  }
}, { immediate: true }) // immediate:true force l'exécution au chargement de la page !

// On nettoie le minuteur si on quitte la page (bonne pratique)
onUnmounted(() => {
  clearInterval(intervalTimer)
})
// ----------------------------------------

const dateDebut = ref(new Date().toISOString().split('T')[0])
const uneSemainePlusTard = new Date()
uneSemainePlusTard.setDate(uneSemainePlusTard.getDate() + 7)
const dateFin = ref(uneSemainePlusTard.toISOString().split('T')[0])

const salleProps = computed(() => ({
  currentView: currentView.value,
  selectedDate: selectedDate.value,
  selectedTime: selectedTime.value,
  dateDebut: dateDebut.value,
  dateFin: dateFin.value,
  onClickSalle: ouvrirModale 
}))

const onViewChange = () => {
  const start = new Date(dateDebut.value)
  if (currentView.value === 'semaine') {
    start.setDate(start.getDate() + 7)
  } else if (currentView.value === 'mois') {
    start.setMonth(start.getMonth() + 1)
  }
  dateFin.value = start.toISOString().split('T')[0]
}

const getSalle = (id) => store.salles.find(s => s.id === id) || { id, libelle: id }
const onViewChange = () => {
  const start = new Date(dateDebut.value)
  if (currentView.value === 'semaine') {
    start.setDate(start.getDate() + 7)
  } else if (currentView.value === 'mois') {
    start.setMonth(start.getMonth() + 1)
  }
  dateFin.value = start.toISOString().split('T')[0]
}

const getSalle = (id) => store.salles.find(s => s.id === id) || { id, libelle: id }
</script>

<style scoped>
.map-page { display: flex; flex-direction: column; gap: 2rem; }
.toolbar { display: flex; justify-content: space-between; background-color: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
/* Supprime .btn-now et .btn-now:hover, et ajoute ça à la place : */
.toggle-realtime {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: var(--color-primary);
  cursor: pointer;
  margin-right: 15px;
  background: rgba(124, 80, 220, 0.1); /* Petit fond violet clair */
  padding: 5px 10px;
  border-radius: 6px;
}

.toggle-realtime input {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

/* Style quand on décoche le Temps réel (les inputs redeviennent normaux) */
.date-controls input { 
  padding: 0.3rem; 
  margin-left: 0.5rem; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
}

/* Style quand le Temps réel est coché (on grise les inputs) */
.date-controls input:disabled {
  background-color: #f5f5f5;
  color: #999;
  border-color: #e0e0e0;
  cursor: not-allowed;
}.date-controls input, .view-controls select { padding: 0.3rem; margin-left: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }

.map-content { display: flex; gap: 2rem; align-items: flex-start; }
.building-map { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

.floor { display: flex; gap: 1rem; align-items: stretch; }
.floor-label { writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); font-weight: bold; color: #f26958; font-size: 1.5rem; letter-spacing: 2px; text-align: center; }
.floor-divider { width: 100%; border: 0; border-top: 2px dashed #ccc; margin: 1rem 0; }

.architecture-grid { display: flex; gap: 15px; width: 100%; }
.main-corridor { display: flex; flex-direction: column; flex: 1; gap: 10px; }
.row { display: flex; gap: 10px; align-items: stretch; }
.hallway-space { height: 30px; }

.left-wing, .right-wing { display: flex; flex-direction: column; }
.wing-split { justify-content: space-between; gap: 40px; }

:deep(.room-large) { height: 100%; min-width: 100px; }
:deep(.room-xl) { height: 100%; min-width: 120px; border-radius: 20px; }
:deep(.room-amphi) { min-width: 90px; border-radius: 10px; }
:deep(.room-small) { min-width: 50px; }

.stairs, .wc { flex: 0.5; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #888; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 5px, #fff 5px, #fff 10px); }

.legend { min-width: 150px; display: flex; flex-direction: column; gap: 10px; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.legend h3 { margin-top: 0; margin-bottom: 15px; color: var(--color-primary-dark); font-size: 1.1rem;}
.legend-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 0.9rem; font-weight: bold; }
.color-box { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); }
</style>