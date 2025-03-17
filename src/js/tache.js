export class Tache {
  constructor (titre = '', description = '', dateEcheance = '', priorite = 'basse', id , statut = 'en_cours') {
    this._titre = titre.trim()
    this._description = description.trim()
    this._dateEcheance = dateEcheance
    this._priorite = ['basse', 'moyenne', 'elevee'].includes(priorite.toLowerCase()) ? priorite.toLowerCase() : 'basse'
    this._statut = statut
    this._id = id
  }

  get titre () {
    return this._titre
  }

  get description () {
    return this._description
  }

  get dateEcheance () {
    return this._dateEcheance
  }

  get priorite () {
    return this._priorite
  }

  get statut () {
    return this._statut
  }

  get id () {
    return this._id
  }

  get couleurBadge () {
    switch (this.priorite) {
      case 'elevee': return 'danger'
      case 'moyenne': return 'warning'
      case 'basse':
      default: return 'primary'
    }
  }

  set titre (value) {
    this._titre = value.trim()
  }

  set description (value) {
    this._description = value.trim()
  }

  set dateEcheance (value) {
    this._dateEcheance = value
  }

  set priorite (value) {
    this._priorite = ['basse', 'moyenne', 'elevee'].includes(value.toLowerCase()) ? value.toLowerCase() : 'basse'
  }

  set statut (value) {
    this._statut = value
  }

  /*
        * Méthode pour terminer une tâche
    */
  terminer () {
    this.statut = 'terminee'
  }

  /*
        * Méthode pour vérifier si une tâche est terminée
    */
  estTerminee () {
    return this.statut === 'terminee'
  }

  /*
    * Méthode pour générer le HTML d'une tâche
    * @param {number} index - L'index de la tâche dans la liste
    */
  getHtml (index) {
    return `
            <div ${this.estTerminee() ? 'class="text-decoration-line-through "' : ''}>
                <strong>${this.titre}</strong> - ${this.description || 'Aucune description'}
                <br>
                <small>
                    Échéance : ${this.dateEcheance || 'Non définie'} | 
                    Priorité : <span class="badge text-bg-${this.couleurBadge}">${this.priorite}</span>
                </small>            
            </div>
            <div>
                ${this.statut !== 'terminee' ? `<button class="btn btn-sm btn-success" onclick="terminerTache(${index})">✔</button>` : ''}
                <button class="btn btn-sm btn-danger" onclick="supprimerTache(${index})">❌</button>
            </div>
        `
  }
}
