export class Utils {
  /*
        * Méthode pour comparer deux tâches par date d'échéance
        @param {Tache} a - La première tâche
        @param {Tache} b - La deuxième tâche
    */
  static comparerParDate (a, b) {
    return new Date(a.dateEcheance) - new Date(b.dateEcheance)
  }

  /*
        * Méthode pour comparer deux tâches par priorité
        @param {Tache} a - La première tâche
        @param {Tache} b - La deuxième tâche
    */
  static comparerParPriorite (a, b) {
    const ordre = { basse: 1, moyenne: 2, elevee: 3 }
    return ordre[b.priorite] - ordre[a.priorite]
  }
}