import { defineStore } from 'pinia'

export const useIsismapStore = defineStore('isismap', {
  state: () => ({
    // Nos fausses salles
    salles: [
      { id: 'B108', libelle: 'B108' },
      { id: 'B103', libelle: 'B103' },
      { id: 'B011', libelle: 'B011' }
    ],
    // Nos fausses promotions (avec les couleurs de ta charte)
    promotions: [
      { id: 'FIE1', libelle: 'FIE1', couleur: '#7c50de' },
      { id: 'FIE2', libelle: 'FIE2', couleur: '#e7343e' },
      { id: 'FIE3', libelle: 'FIE3', couleur: '#f9a12c' },
      { id: 'FIE4', libelle: 'FIE4', couleur: '#3a87f1' }
    ],
    // Quelques créneaux bidons pour tester la heatmap et l'affichage journalier
    creneaux: [
      { 
        id: 1, 
        id_salle: 'B108', 
        id_prom: 'FIE4', 
        enseignant: 'Mme Champ', 
        debut: '2026-01-20T08:15:00', 
        fin: '2026-01-20T10:15:00' 
      },
      { 
        id: 2, 
        id_salle: 'B011', 
        id_prom: 'FIE1', 
        enseignant: 'Mr Singer', 
        debut: '2026-01-20T10:30:00', 
        fin: '2026-01-20T12:30:00' 
      }
    ]
  }),
  actions: {
    // Plus tard, on mettra ici la fonction pour aller chercher les vraies données via l'API
    async fetchRealData() {
      // await axios.get('/api/creneaux') ...
    }
  }
})