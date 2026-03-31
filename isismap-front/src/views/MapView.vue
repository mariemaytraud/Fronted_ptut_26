<template>
  <div class="map-page">
    <div class="toolbar">
      <div class="date-controls">
        <span>Le <input type="date" v-model="selectedDate" /></span>
        <span>à <input type="time" v-model="selectedTime" /></span>
        <button class="btn-now" @click="setToNow">Maintenant</button>
      </div>
      <div class="view-controls">
        <select>
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
              <RoomBlock :salle="getSalle('CHL')" :selectedDate="selectedDate" :selectedTime="selectedTime" class="room-large" />
            </div>
            <div class="main-corridor">
              <div class="row top-row">
                <RoomBlock :salle="getSalle('B110')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B108')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B107')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B104')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B103')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B101')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
              </div>
              <div class="hallway-space"></div>
              <div class="row bottom-row">
                <div class="stairs">Escaliers</div>
                <RoomBlock :salle="getSalle('B109')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B106')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B105')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <div class="wc">WC</div>
                <RoomBlock :salle="getSalle('B102')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
              </div>
            </div>
          </div>
        </div>

        <hr class="floor-divider" />

        <div class="floor">
          <div class="floor-label">RDC</div>
          <div class="architecture-grid">
            <div class="left-wing wing-split">
              <RoomBlock :salle="getSalle('B019')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
              <RoomBlock :salle="getSalle('B019a')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
            </div>
            <div class="main-corridor">
              <div class="row top-row">
                <RoomBlock :salle="getSalle('B017')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B011')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B009')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B007')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('PetitAmphi')" :selectedDate="selectedDate" :selectedTime="selectedTime" class="room-amphi" />
              </div>
              <div class="hallway-space"></div>
              <div class="row bottom-row">
                <RoomBlock :salle="getSalle('B018')" :selectedDate="selectedDate" :selectedTime="selectedTime" class="room-small" />
                <div class="stairs">Escaliers</div>
                <RoomBlock :salle="getSalle('B012')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <RoomBlock :salle="getSalle('B010')" :selectedDate="selectedDate" :selectedTime="selectedTime" />
                <div class="wc">WC</div>
              </div>
            </div>
            <div class="right-wing">
              <RoomBlock :salle="getSalle('GrandAmphi')" :selectedDate="selectedDate" :selectedTime="selectedTime" class="room-xl" />
            </div>
          </div>
        </div>
      </div>

      <div class="legend">
        <div v-for="promo in store.promotions" :key="promo.id" class="legend-item">
          <div class="color-box" :style="{ backgroundColor: promo.couleur }"></div>
          <span>{{ promo.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIsismapStore } from '../stores/isismap'
import RoomBlock from '../components/RoomBlock.vue' // On importe notre super composant !

const store = useIsismapStore()

const now = new Date()
const selectedDate = ref(now.toISOString().split('T')[0])
const selectedTime = ref(now.toTimeString().slice(0, 5))

const setToNow = () => {
  const current = new Date()
  selectedDate.value = current.toISOString().split('T')[0]
  selectedTime.value = current.toTimeString().slice(0, 5)
}

const getSalle = (id) => store.salles.find(s => s.id === id) || { id, libelle: id }
</script>

<style scoped>
.map-page { display: flex; flex-direction: column; gap: 2rem; }
.toolbar { display: flex; justify-content: space-between; background-color: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.btn-now { margin-left: 10px; background-color: var(--color-primary); color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 0.8rem; }
.btn-now:hover { background-color: var(--color-primary-dark); }
.date-controls input, .view-controls select { padding: 0.3rem; margin-left: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }

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

/* Tailles personnalisées pour les blocs */
:deep(.room-large) { height: 100%; min-width: 100px; }
:deep(.room-xl) { height: 100%; min-width: 120px; border-radius: 20px; }
:deep(.room-amphi) { min-width: 90px; border-radius: 10px; }
:deep(.room-small) { min-width: 50px; }

.stairs, .wc { flex: 0.5; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #888; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 5px, #fff 5px, #fff 10px); }

.legend { width: 100px; display: flex; flex-direction: column; gap: 10px; background: white; padding: 1rem; border-radius: 8px; }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: bold; }
.color-box { width: 25px; height: 25px; border-radius: 4px; }
</style>