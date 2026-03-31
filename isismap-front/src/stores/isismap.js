import { defineStore } from 'pinia'

export const useIsismapStore = defineStore('isismap', {
  state: () => ({
    salles: [
      { id: 'CHL', libelle: 'CHL' },
      { id: 'B110', libelle: 'B110' }, { id: 'B108', libelle: 'B108' }, { id: 'B107', libelle: 'B107' },
      { id: 'B104', libelle: 'B104' }, { id: 'B103', libelle: 'B103' }, { id: 'B101', libelle: 'B101' },
      { id: 'B109', libelle: 'B109' }, { id: 'B106', libelle: 'B106' }, { id: 'B105', libelle: 'B105' }, 
      { id: 'B102', libelle: 'B102' },
      { id: 'B019', libelle: 'B019' }, { id: 'B019a', libelle: 'B019a' },
      { id: 'B017', libelle: 'B017' }, { id: 'B011', libelle: 'B011' }, { id: 'B009', libelle: 'B009' }, 
      { id: 'B007', libelle: 'B007' }, { id: 'PetitAmphi', libelle: 'Petit Amphi' },
      { id: 'B018', libelle: 'B018' }, { id: 'B012', libelle: 'B012' }, { id: 'B010', libelle: 'B010' },
      { id: 'GrandAmphi', libelle: 'Grand Amphi' }
    ],
    promotions: [
      { id: 'FIE1', libelle: 'FIE1', couleur: '#ac54c7' },
      { id: 'FIE2', libelle: 'FIE2', couleur: '#f26958' },
      { id: 'FIE3', libelle: 'FIE3', couleur: '#f5a028' },
      { id: 'FIE4', libelle: 'FIE4', couleur: '#3a87f1' },
      { id: 'FIE5', libelle: 'FIE5', couleur: '#3cbebe' },
      { id: 'FIA3', libelle: 'FIA3', couleur: '#ff1493' },
      { id: 'FIA4', libelle: 'FIA4', couleur: '#0000ff' },
      { id: 'FIA5', libelle: 'FIA5', couleur: '#32cd32' }
    ],
    creneaux: [
      // --- COURS D'AUJOURD'HUI (31 Mars 2026) POUR LE MODE "JOUR" ---
      { id: 101, id_salle: 'B011', id_prom: 'FIE1', enseignant: 'Mr Singer', debut: '2026-03-31T14:00:00', fin: '2026-03-31T18:00:00' },
      { id: 102, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ', debut: '2026-03-31T15:30:00', fin: '2026-03-31T17:30:00' },
      { id: 103, id_salle: 'GrandAmphi', id_prom: 'FIE3', enseignant: 'Mr Djemaa', debut: '2026-03-31T13:30:00', fin: '2026-03-31T16:30:00' },
      { id: 104, id_salle: 'PetitAmphi', id_prom: 'FIA4', enseignant: 'Mr Barreau', debut: '2026-03-31T16:00:00', fin: '2026-03-31T18:00:00' },
      { id: 105, id_salle: 'B109', id_prom: 'FIE5', enseignant: 'Mr Ourettes', debut: '2026-03-31T08:00:00', fin: '2026-03-31T12:00:00' },

      // --- SIMULATION POUR LA SEMAINE (Du 30 Mars au 3 Avril) POUR LA HEATMAP ---
      
      // B011 : Surchargée (Presque 100% -> Violet très foncé)
      { id: 201, id_salle: 'B011', id_prom: 'FIE1', enseignant: 'Mr Singer', debut: '2026-03-30T08:00:00', fin: '2026-03-30T17:00:00' },
      { id: 202, id_salle: 'B011', id_prom: 'FIE2', enseignant: 'Mme Mula', debut: '2026-04-01T08:00:00', fin: '2026-04-01T17:00:00' },
      { id: 203, id_salle: 'B011', id_prom: 'FIE1', enseignant: 'Mr Singer', debut: '2026-04-02T08:00:00', fin: '2026-04-02T16:00:00' },
      { id: 204, id_salle: 'B011', id_prom: 'FIA3', enseignant: 'Mr Pitearth', debut: '2026-04-03T08:00:00', fin: '2026-04-03T15:00:00' },

      // B108 : Occupation Modérée (~50% -> Violet moyen)
      { id: 301, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ', debut: '2026-03-30T10:00:00', fin: '2026-03-30T12:00:00' },
      { id: 302, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ', debut: '2026-04-01T14:00:00', fin: '2026-04-01T18:00:00' },
      { id: 303, id_salle: 'B108', id_prom: 'FIA5', enseignant: 'Mr Gleyzes', debut: '2026-04-02T08:00:00', fin: '2026-04-02T12:00:00' },

      // B105 : Très peu occupée (~15% -> Violet très clair)
      { id: 401, id_salle: 'B105', id_prom: 'FIE2', enseignant: 'Mme Mula', debut: '2026-04-02T14:00:00', fin: '2026-04-02T16:00:00' },

      // Grand Amphi : Occupation intermédiaire
      { id: 501, id_salle: 'GrandAmphi', id_prom: 'FIE3', enseignant: 'Mr Djemaa', debut: '2026-03-30T08:00:00', fin: '2026-03-30T12:00:00' },
      { id: 502, id_salle: 'GrandAmphi', id_prom: 'FIE1', enseignant: 'Mr Charrier', debut: '2026-04-01T08:00:00', fin: '2026-04-01T12:00:00' },
      { id: 503, id_salle: 'GrandAmphi', id_prom: 'FIA4', enseignant: 'Mr Barreau', debut: '2026-04-03T13:30:00', fin: '2026-04-03T17:30:00' }
    ]
  })
})
