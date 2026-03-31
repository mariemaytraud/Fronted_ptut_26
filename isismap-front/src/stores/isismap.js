import { defineStore } from 'pinia'

// --- 1. NOTRE GÉNÉRATEUR DE FAUSSES DONNÉES ---
const genererCreneauxMasse = () => {
  const creneauxGeneres = []
  let idCounter = 1000 // On commence à 1000 pour ne pas écraser nos tests d'aujourd'hui
  
  const profs = ['Mr Singer', 'Mme Champ', 'Mr Djemaa', 'Mr Barreau', 'Mr Ourettes', 'Mme Mula', 'Mr Charrier']
  const promos = ['FIE1', 'FIE2', 'FIE3', 'FIE4', 'FIE5', 'FIA3', 'FIA4']
  
  // On va générer des données du 1er Avril au 31 Mai
  const dateDebut = new Date('2026-04-01T00:00:00')
  const dateFin = new Date('2026-05-31T23:59:59')

  // On boucle sur chaque jour
  for (let d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
    // On ignore les week-ends (0 = Dimanche, 6 = Samedi)
    if (d.getDay() === 0 || d.getDay() === 6) continue

    const dateStr = d.toISOString().split('T')[0] // Format YYYY-MM-DD

    // --- SCÉNARIOS DE TEST POUR LA HEATMAP ---

    // 1. La salle B011 est TOUJOURS blindée (Pour tester le Violet Foncé 100%)
    creneauxGeneres.push({ id: idCounter++, id_salle: 'B011', id_prom: 'FIE1', enseignant: 'Mr Singer', debut: `${dateStr}T08:00:00`, fin: `${dateStr}T12:00:00` })
    creneauxGeneres.push({ id: idCounter++, id_salle: 'B011', id_prom: 'FIE2', enseignant: 'Mme Mula', debut: `${dateStr}T13:30:00`, fin: `${dateStr}T17:30:00` })

    // 2. La salle B108 est modérément occupée (Environ 1 jour sur 2, le matin)
    if (Math.random() > 0.5) {
      creneauxGeneres.push({ id: idCounter++, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ', debut: `${dateStr}T08:00:00`, fin: `${dateStr}T12:00:00` })
    }

    // 3. La salle B105 est presque toujours vide (1 chance sur 10 d'avoir un cours)
    if (Math.random() > 0.9) {
      creneauxGeneres.push({ id: idCounter++, id_salle: 'B105', id_prom: 'FIA4', enseignant: 'Mr Barreau', debut: `${dateStr}T14:00:00`, fin: `${dateStr}T16:00:00` })
    }

    // 4. On remplit aléatoirement les Amphis et quelques autres salles
    ['GrandAmphi', 'PetitAmphi', 'B103', 'B019', 'CHL'].forEach(salle => {
      // 60% de chance d'avoir un cours
      if (Math.random() > 0.4) {
        // Aléatoire : Matin ou Après-midi
        const start = Math.random() > 0.5 ? '08:00:00' : '14:00:00'
        const end = start === '08:00:00' ? '12:00:00' : '18:00:00'
        
        creneauxGeneres.push({
          id: idCounter++,
          id_salle: salle,
          id_prom: promos[Math.floor(Math.random() * promos.length)],
          enseignant: profs[Math.floor(Math.random() * profs.length)],
          debut: `${dateStr}T${start}`,
          fin: `${dateStr}T${end}`
        })
      }
    })
  }

  return creneauxGeneres
}

// --- 2. NOTRE MAGASIN DE DONNÉES PINIA ---
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
      // Nos données fixes pour tester la page "Aujourd'hui" (31 Mars 2026)
      { id: 101, id_salle: 'B011', id_prom: 'FIE1', enseignant: 'Mr Singer', debut: '2026-03-31T14:00:00', fin: '2026-03-31T18:00:00' },
      { id: 102, id_salle: 'B108', id_prom: 'FIE4', enseignant: 'Mme Champ', debut: '2026-03-31T15:30:00', fin: '2026-03-31T17:30:00' },
      { id: 103, id_salle: 'GrandAmphi', id_prom: 'FIE3', enseignant: 'Mr Djemaa', debut: '2026-03-31T13:30:00', fin: '2026-03-31T16:30:00' },
      { id: 104, id_salle: 'B109', id_prom: 'FIE5', enseignant: 'Mr Ourettes', debut: '2026-03-31T08:00:00', fin: '2026-03-31T12:00:00' },
      
      // On fusionne nos données fixes avec les centaines de données générées !
      ...genererCreneauxMasse()
    ]
  })
})