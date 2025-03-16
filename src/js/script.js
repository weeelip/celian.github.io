import { Tache } from './tache.js'
import { Utils } from './utils.js'
import { auth, db } from './firebaseConfig.js' // Import Firebase
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore'

/* global alert, Notification */
let listeTaches = []
let utilisateurId = null // Stocke l'ID utilisateur Firebase

// Fonction pour s'authentifier anonymement
async function authentifierUtilisateur() {
  try {
    const userCredential = await auth.signInAnonymously()
    utilisateurId = userCredential.user.uid
    chargerTaches() // Charger les tâches de Firestore après l'authentification
  } catch (error) {
    console.error("Erreur d'authentification :", error)
  }
}

auth.onAuthStateChanged(user => {
  if (user) {
    utilisateurId = user.uid
    chargerTaches()
  }
})

/*
    * Fonction pour afficher les tâches en fonction du filtre et du tri
*/
async function afficherTaches (filtre = 'toutes') {
  const listeTachesElement = document.getElementById('liste-taches')
  listeTachesElement.innerHTML = ''

  const critereTri = document.getElementById('tri') ? document.getElementById('tri').value : 'date'

  if (critereTri === 'date') {
    listeTaches.sort(Utils.comparerParDate)
  } else if (critereTri === 'priorite') {
    listeTaches.sort(Utils.comparerParPriorite)
  }

  let tachesFiltrees = listeTaches
  if (filtre === 'en_cours') {
    tachesFiltrees = listeTaches.filter(t => t.statut === 'en_cours')
  } else if (filtre === 'terminee') {
    tachesFiltrees = listeTaches.filter(t => t.statut === 'terminee')
  }

  tachesFiltrees.forEach((tache, index) => {
    const li = document.createElement('li')

    if (tache.estTerminee()) {
      li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-success'
    } else if (tache.dateEcheance && new Date(tache.dateEcheance) < new Date()) {
      li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-danger'
    } else {
      li.className = 'list-group-item d-flex justify-content-between align-items-center'
    }

    li.innerHTML = tache.getHtml(index)
    listeTachesElement.appendChild(li)
  })

  mettreAJourProgression()
  verifierEcheances()
}

/*
    * Fonction pour ajouter une tâche à Firestore
*/
async function ajouterTache () {
  const titre = document.getElementById('titre').value.trim()
  const description = document.getElementById('description').value.trim()
  const dateEcheance = document.getElementById('date-echeance').value
  const priorite = document.getElementById('priorite').value

  if (!titre) {
    alert('Le titre est obligatoire !')
    return
  }
  
  try {
    const docRef = await addDoc(collection(db, 'taches'), {
      utilisateurId,
      titre,
      description,
      dateEcheance,
      priorite,
      statut: 'en_cours'
    })
    
    listeTaches.push(new Tache(titre, description, dateEcheance, priorite, docRef.id))
    afficherTaches()
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error)
  }
}

/*
    * Fonction pour charger les tâches depuis Firestore
*/
async function chargerTaches() {
  if (!utilisateurId) return
  listeTaches = []
  
  const q = query(collection(db, 'taches'), where("utilisateurId", "==", utilisateurId))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    const data = doc.data()
    listeTaches.push(new Tache(data.titre, data.description, data.dateEcheance, data.priorite, doc.id, data.statut))
  })
  afficherTaches()
}

/*
    * Fonction pour supprimer une tâche de Firestore
*/
async function supprimerTache (index) {
  const tache = listeTaches[index]
  if (!tache || !tache.id) return
  
  try {
    await deleteDoc(doc(db, 'taches', tache.id))
    listeTaches.splice(index, 1)
    afficherTaches()
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error)
  }
}

/*
    * Fonction pour terminer une tâche
*/
async function terminerTache (index) {
  const tache = listeTaches[index]
  if (!tache || !tache.id) return

  try {
    await updateDoc(doc(db, 'taches', tache.id), {
      statut: 'terminee'
    })
    tache.terminer()
    afficherTaches()
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error)
  }
}

// Vérifier les échéances des tâches
function verifierEcheances () {
  const maintenant = new Date()
  listeTaches.forEach(tache => {
    if (tache.dateEcheance) {
      const dateEcheance = new Date(tache.dateEcheance)
      const tempsRestant = dateEcheance - maintenant

      if (tempsRestant > 0 && tempsRestant <= 24 * 60 * 60 * 1000) {
        if (Notification.permission === 'granted') {
          new Notification(`La tâche "${tache.titre}" approche de son échéance !`)
        }
      }
    }
  })
}

if (Notification.permission !== 'granted') {
  Notification.requestPermission()
}

window.onload = authentifierUtilisateur
window.ajouterTache = ajouterTache
window.terminerTache = terminerTache
window.supprimerTache = supprimerTache
window.afficherTaches = afficherTaches
