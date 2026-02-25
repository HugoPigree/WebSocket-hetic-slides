// ============================================================
// Leaderboard - Classement des joueurs
// IMPLEMENTATION : liste triee avec scores
// ============================================================

interface LeaderboardProps {
  /** Classement trie par score decroissant */
  rankings: { name: string; score: number }[]
}

/**
 * Composant affichant le classement des joueurs.
 *
 * Ce qu'il faut implementer :
 * - Un titre "Classement" (classe .leaderboard-title)
 * - Une liste ordonnee des joueurs (classe .leaderboard)
 * - Chaque joueur affiche (classe .leaderboard-item) :
 * - Son rang (1, 2, 3...) dans .leaderboard-rank
 * - Son nom dans .leaderboard-name
 * - Son score dans .leaderboard-score
 * - Les 3 premiers ont des styles speciaux via :nth-child (deja dans le CSS)
 *
 * Note : les rankings sont deja tries par score decroissant
 */
function Leaderboard({ rankings }: LeaderboardProps) {
  return (
    <div className="phase-container">
      <h1 className="leaderboard-title">Classement</h1>
      
      <div className="leaderboard">
        {rankings.map((player, index) => (
          <div key={player.name + index} className="leaderboard-item">
            <div className="leaderboard-rank">
              {index + 1}
            </div>
            <div className="leaderboard-name">
              {player.name}
            </div>
            <div className="leaderboard-score">
              {player.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>

      {rankings.length === 0 && (
        <p className="no-players">Aucun joueur n'a participé.</p>
      )}
    </div>
  )
}

export default Leaderboard