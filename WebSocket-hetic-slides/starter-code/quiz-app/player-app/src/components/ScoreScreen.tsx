// ============================================================
// ScoreScreen - Classement avec position du joueur
// IMPLEMENTATION : leaderboard avec mise en surbrillance
// ============================================================

interface ScoreScreenProps {
  /** Classement trie par score decroissant */
  rankings: { name: string; score: number }[]
  /** Nom du joueur actuel (pour le mettre en surbrillance) */
  playerName: string
}

/**
 * Composant affichant le classement avec la position du joueur en surbrillance.
 *
 * Ce qu'il faut implementer :
 * - Un titre "Classement" (classe .leaderboard-title)
 * - La liste ordonnee des joueurs (classe .leaderboard)
 * - Chaque joueur est dans un .leaderboard-item
 * Si c'est le joueur actuel, ajouter aussi la classe .is-me
 * - Afficher pour chaque joueur :
 * - Son rang (1, 2, 3...) dans .leaderboard-rank
 * - Son nom dans .leaderboard-name
 * - Son score dans .leaderboard-score
 *
 * Classes CSS disponibles : .score-screen, .leaderboard-title, .leaderboard,
 * .leaderboard-item, .is-me, .leaderboard-rank, .leaderboard-name, .leaderboard-score
 */
function ScoreScreen({ rankings, playerName }: ScoreScreenProps) {
  return (
    <div className="phase-container score-screen">
      {/* TODO: Titre "Classement" avec .leaderboard-title */}
      <h1 className="leaderboard-title">Classement Final</h1>

      <div className="leaderboard">
        {/* TODO: Pour chaque joueur dans rankings, afficher un .leaderboard-item */}
        {rankings.map((rank, index) => {
          // TODO: Ajouter la classe .is-me si ranking.name === playerName
          const isMe = rank.name === playerName;

          return (
            <div 
              key={`${rank.name}-${index}`} 
              className={`leaderboard-item ${isMe ? 'is-me' : ''}`}
            >
              {/* TODO: Afficher rang, nom et score */}
              <div className="leaderboard-rank">{index + 1}</div>
              <div className="leaderboard-name">
                {rank.name} {isMe && "(Moi)"}
              </div>
              <div className="leaderboard-score">
                {rank.score.toLocaleString()} pts
              </div>
            </div>
          );
        })}
      </div>

      {rankings.length === 0 && (
        <p className="no-data">Aucun score à afficher.</p>
      )}
    </div>
  );
}

export default ScoreScreen;