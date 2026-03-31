<template>
  <div class="map-page">
    
    <div class="toolbar">
      <div class="date-controls">
        <span>Le <input type="date" value="2026-01-20" /></span>
        <span>à <input type="time" value="13:30" /></span>
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
              <RoomBlock :salle="getSalle('CHL')" class="room-large" />
            </div>

            <div class="main-corridor">
              <div class="row top-row">
                <RoomBlock :salle="getSalle('B110')" />
                <RoomBlock :salle="getSalle('B108')" />
                <RoomBlock :salle="getSalle('B107')" />
                <RoomBlock :salle="getSalle('B104')" />
                <RoomBlock :salle="getSalle('B103')" />
                <RoomBlock :salle="getSalle('B101')" />
              </div>
              
              <div class="hallway-space"></div> <div class="row bottom-row">
                <div class="stairs">Escaliers</div>
                <RoomBlock :salle="getSalle('B109')" />
                <RoomBlock :salle="getSalle('B106')" />
                <RoomBlock :salle="getSalle('B105')" />
                <div class="wc">WC</div>
                <RoomBlock :salle="getSalle('B102')" />
              </div>
            </div>

          </div>
        </div>

        <hr class="floor-divider" />

        <div class="floor">
          <div class="floor-label">RDC</div>
          <div class="architecture-grid">
            
            <div class="left-wing wing-split">
              <RoomBlock :salle="getSalle('B019')" />
              <RoomBlock :salle="getSalle('B019a')" />
            </div>

            <div class="main-corridor">
              <div class="row top-row">
                <RoomBlock :salle="getSalle('B017')" />
                <RoomBlock :salle="getSalle('B011')" />
                <RoomBlock :salle="getSalle('B009')" />
                <RoomBlock :salle="getSalle('B007')" />
                <RoomBlock :salle="getSalle('PetitAmphi')" class="room-amphi" />
              </div>
              
              <div class="hallway-space"></div>

              <div class="row bottom-row">
                <RoomBlock :salle="getSalle('B018')" class="room-small" />
                <div class="stairs">Escaliers</div>
                <RoomBlock :salle="getSalle('B012')" />
                <RoomBlock :salle="getSalle('B010')" />
                <div class="wc">WC</div>
                </div>
            </div>

            <div class="right-wing">
              <RoomBlock :salle="getSalle('GrandAmphi')" class="room-xl" />
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
import { useIsismapStore } from '../stores/isismap'
import { defineComponent, h } from 'vue'

const store = useIsismapStore()

// Récupérer les données d'une salle par son ID
const getSalle = (id) => store.salles.find(s => s.id === id) || { id, libelle: id }

// Fonction pour récupérer la couleur selon l'occupation
const getRoomColor = (idSalle) => {
  const creneau = store.creneaux.find(c => c.id_salle === idSalle)
  if (creneau) {
    const promo = store.promotions.find(p => p.id === creneau.id_prom)
    return promo ? promo.couleur : '#e2e2e2'
  }
  return '#e2e2e2' // Gris clair si libre (comme sur la maquette)
}

// Fonction pour récupérer le prof
const getRoomInfo = (idSalle) => {
  const creneau = store.creneaux.find(c => c.id_salle === idSalle)
  return creneau ? creneau.enseignant : null
}

// --- SOUS-COMPOSANT ROOMBLOCK ---
// Pour éviter de répéter le HTML de chaque salle, je crée un mini composant ici
const RoomBlock = defineComponent({
  props: ['salle'],
  setup(props) {
    return () => h('div', {
      class: 'room',
      style: { backgroundColor: getRoomColor(props.salle.id) },
      onClick: () => alert(`Clic sur ${props.salle.libelle}`)
    }, [
      h('span', { class: 'room-name' }, props.salle.libelle),
      getRoomInfo(props.salle.id) ? h('span', { class: 'room-info' }, getRoomInfo(props.salle.id)) : null
    ])
  }
})
</script>

<style scoped>
.map-page { display: flex; flex-direction: column; gap: 2rem; }

.toolbar {
  display: flex; justify-content: space-between;
  background-color: white; padding: 1rem; border-radius: 8px;
}

.map-content { display: flex; gap: 2rem; align-items: flex-start; }
.building-map { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

.floor { display: flex; gap: 1rem; align-items: stretch; }
.floor-label {
  writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);
  font-weight: bold; color: #f26958; font-size: 1.5rem; letter-spacing: 2px;
  text-align: center;
}

.floor-divider { width: 100%; border: 0; border-top: 2px dashed #ccc; margin: 1rem 0; }

/* -- L'architecture spécifique -- */
.architecture-grid {
  display: flex; gap: 15px; width: 100%;
}

.main-corridor {
  display: flex; flex-direction: column; flex: 1; gap: 10px;
}

.row { display: flex; gap: 10px; align-items: stretch; }
.hallway-space { height: 30px; } /* L'espace du couloir central */

.left-wing, .right-wing { display: flex; flex-direction: column; }
.wing-split { justify-content: space-between; gap: 40px; }

/* -- Styles des salles -- */
.room {
  flex: 1; min-height: 80px; min-width: 60px;
  border-radius: 4px; display: flex; flex-direction: column;
  justify-content: center; align-items: center; cursor: pointer;
  color: white; text-align: center; padding: 5px;
  transition: transform 0.1s;
}

/* Salles libres : on met le texte en gris foncé */
.room[style*="rgb(226, 226, 226)"] { color: #555; }

.room:hover { transform: scale(1.05); filter: brightness(1.1); }
.room-name { font-weight: bold; font-size: 1rem; }
.room-info { font-size: 0.75rem; margin-top: 4px; }

/* Dimensions spéciales pour coller à la maquette */
.room-large { height: 100%; min-width: 100px; }
.room-xl { height: 100%; min-width: 120px; border-radius: 20px; } /* Grand Amphi */
.room-amphi { min-width: 90px; border-radius: 10px; }
.room-small { min-width: 50px; }

/* Éléments de décor */
.stairs, .wc {
  flex: 0.5; border: 1px solid #ccc; display: flex;
  align-items: center; justify-content: center;
  font-size: 0.7rem; color: #888; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 5px, #fff 5px, #fff 10px);
}

/* -- Légende -- */
.legend {
  width: 100px; display: flex; flex-direction: column; gap: 10px;
}
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: bold; }
.color-box { width: 25px; height: 25px; border-radius: 4px; }
</style>