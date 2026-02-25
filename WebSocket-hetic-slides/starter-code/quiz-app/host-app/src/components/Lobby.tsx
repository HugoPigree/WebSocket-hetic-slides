// ============================================================
// Lobby - Salle d'attente avant le quiz
// IMPLEMENTATION : affichage du code et liste des joueurs
// ============================================================

interface LobbyProps {
  /** Code du quiz a afficher pour que les joueurs rejoignent */
  quizCode: string
  /** Liste des noms de joueurs connectes */
  players: string[]
  /** Callback quand le host clique sur "Demarrer" */
  onStart: () => void
}

/**
 * Composant salle d'attente affiche cote host.
 *
 * Ce qu'il faut implementer :
 * - Le code du quiz affiche en grand (classe .quiz-code) avec le label "Code du quiz"
 * - Le nombre de joueurs connectes
 * - La liste des joueurs (puces avec classe .player-chip dans un .player-list)
 * - Un bouton "Demarrer le quiz" (classe .btn-start)
 * desactive s'il n'y a aucun joueur
 *
 * Classes CSS disponibles : .phase-container, .quiz-code-label, .quiz-code,
 * .player-count, .player-list, .player-chip, .btn-start
 */
function Lobby({ quizCode, players, onStart }: LobbyProps) {
  // Logique du cours : on dérive une variable pour la désactivation du bouton
  const hasPlayers = players.length > 0;

  return (
    <div className="phase-container">
      {/* TODO: Label "Code du quiz" avec classe .quiz-code-label */}
      <p className="quiz-code-label">Code du quiz</p>

      {/* TODO: Afficher quizCode avec classe .quiz-code */}
      <h1 className="quiz-code">{quizCode}</h1>

      {/* TODO: Afficher le nombre de joueurs */}
      <p className="player-count">
        {players.length} {players.length <= 1 ? 'joueur connecté' : 'joueurs connectés'}
      </p>

      {/* TODO: Liste des joueurs avec .player-list et .player-chip */}
      <div className="player-list">
        {players.map((name, index) => (
          <span key={index} className="player-chip">
            {name}
          </span>
        ))}
      </div>

      {/* TODO: Bouton Demarrer avec classe .btn-start, desactive si 0 joueurs */}
      <button 
        className="btn-start" 
        onClick={onStart} 
        disabled={!hasPlayers}
      >
        Démarrer le quiz
      </button>
    </div>
  )
}

export default Lobby