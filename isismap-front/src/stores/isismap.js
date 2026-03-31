import { defineStore } from 'pinia'

export const useIsismapStore = defineStore('isismap', {
  state: () => ({
    // Toutes les salles de la maquette
    salles: [
      // 1er Étage
      { id: 'CHL', libelle: 'CHL' },
      { id: 'B110', libelle: 'B110' }, { id: 'B108', libelle: 'B108' }, { id: 'B107', libelle: 'B107' },
      { id: 'B104', libelle: 'B104' }, { id: 'B103', libelle: 'B103' }, { id: 'B101', libelle: 'B101' },
      { id: 'B109', libelle: 'B109' }, { id: 'B106', libelle: 'B106' }, { id: 'B105', libelle: 'B105' }, 
      { id: 'B102', libelle: 'B102' },
      
      // RDC
      { id: 'B019', libelle: 'B019' }, { id: 'B019a', libelle: 'B019a' },
      { id: 'B017', libelle: 'B017' }, { id: 'B011', libelle: 'B011' }, { id: 'B009', libelle: 'B009' }, 
      { id: 'B007', libelle: 'B007' }, { id: 'PetitAmphi', libelle: 'Petit Amphi' },
      { id: 'B018', libelle: 'B018' }, { id: 'B012', libelle: 'B012' }, { id: 'B010', libelle: 'B010' },
      { id: 'GrandAmphi', libelle: 'Grand Amphi' }
    ],
    promotions: [
      { id: 'FIE1', libelle: 'FIE1', couleur: '#ac54c7' }, // Violet maquette
      { id: 'FIE2', libelle: 'FIE2', couleur: '#f26958' }, // Corail maquette
      { id: 'FIE3', libelle: 'FIE3', couleur: '#f5a028' }, // Jaune maquette
      { id: 'FIE4', libelle: 'FIE4', couleur: '#3a87f1' }, // Bleu maquette
      { id: 'FIE5', libelle: 'FIE5', couleur: '#3cbebe' }, // Turquoise maquette
      { id: 'FIA3', libelle: 'FIA3', couleur: '#ff1493' }, // Rose fluo
      { id: 'FIA4', libelle: 'FIA4', couleur: '#0000ff' }, // Bleu foncé
      { id: 'FIA5', libelle: 'FIA5', couleur: '#32cd32' }  // Vert
    ],
    // Quelques créneaux pour voir si ça marche (basés sur ta maquette)
    creneaux: [
      { id: 1, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ' },
      { id: 2, id_salle: 'B103', id_prom: 'FIE1', enseignant: 'Mr Charrier' },
      { id: 3, id_salle: 'B109', id_prom: 'FIE5', enseignant: 'Mr Ourettes' },
      { id: 4, id_salle: 'B106', id_prom: 'FIE3', enseignant: 'Mr Gleyzes' },
      { id: 5, id_salle: 'B102', id_prom: 'FIA5', enseignant: 'Mr Barreau' },
      { id: 6, id_salle: 'B011', id_prom: 'FIA4', enseignant: 'Mr Singer' },
      { id: 7, id_salle: 'B007', id_prom: 'FIE2', enseignant: 'Mme Mula' },
      { id: 8, id_salle: 'B010', id_prom: 'FIA3', enseignant: 'Mr Pitearth' }
    ]
  })
})