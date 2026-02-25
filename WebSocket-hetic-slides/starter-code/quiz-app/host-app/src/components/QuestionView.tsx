// ============================================================
// QuestionView - Affichage de la question en cours (cote host)
// IMPLEMENTATION : question, choix, timer, compteur de reponses
// ============================================================

import type { QuizQuestion } from '@shared/index'

interface QuestionViewProps {
  /** La question en cours (sans correctIndex) */
  question: Omit<QuizQuestion, 'correctIndex'>
  /** Index de la question (0-based) */
  index: number
  /** Nombre total de questions */
  total: number
  /** Temps restant en secondes */
  remaining: number
  /** Nombre de joueurs ayant repondu */
  answerCount: number
  /** Nombre total de joueurs */
  totalPlayers: number
}

/**
 * Composant affichant la question en cours sur l'ecran du host.
 *
 * Ce qu'il faut implementer :
 * - En-tete avec "Question X / Y" (classe .question-header)
 * - Le timer en cercle (classes .countdown, .countdown-circle)
 * Ajouter la classe .warning si remaining <= 10, .danger si remaining <= 3
 * - Le texte de la question (classe .question-text)
 * - Les 4 choix dans une grille (classes .choices-grid, .choice-card)
 * - Le compteur de reponses "X / Y reponses" (classe .answer-counter)
 *
 * Note : cote host on affiche les choix mais sans interaction
 * (c'est purement visuel pour projeter au mur)
 */
function QuestionView({ question, index, total, remaining, answerCount, totalPlayers }: QuestionViewProps) {
  
  // Logique du cours : gestion dynamique des classes pour le feedback visuel
  const timerClass = `countdown-circle ${remaining <= 3 ? 'danger' : remaining <= 10 ? 'warning' : ''}`;

  return (
    <div className="phase-container">
      {/* TODO: En-tete "Question {index + 1} / {total}" */}
      <div className="question-header">
        <h2>Question {index + 1} / {total}</h2>
      </div>

      <div className="question-visuals">
        {/* TODO: Timer avec .countdown-circle (+ .warning / .danger selon remaining) */}
        <div className="countdown">
          <div className={timerClass}>
            <span className="time-left">{remaining}</span>
          </div>
        </div>

        {/* TODO: Texte de la question avec .question-text */}
        <h1 className="question-text">{question.text}</h1>
      </div>

      {/* TODO: Grille des 4 choix avec .choices-grid et .choice-card */}
      <div className="choices-grid">
        {question.choices.map((choice, i) => (
          <div key={i} className={`choice-card choice-${i}`}>
            <span className="choice-label">{['▲', '◆', '●', '■'][i]}</span>
            <span className="choice-text">{choice}</span>
          </div>
        ))}
      </div>

      {/* TODO: Compteur "{answerCount} / {totalPlayers} reponses" */}
      <div className="answer-counter">
        <div className="counter-badge">
          <span className="count-now">{answerCount}</span>
          <span className="count-total"> / {totalPlayers} réponses</span>
        </div>
        {/* Barre de progression optionnelle pour le style 3ème année */}
        <div className="progress-bar-container">
            <div 
                className="progress-bar-fill" 
                style={{ width: `${(answerCount / (totalPlayers || 1)) * 100}%` }}
            ></div>
        </div>
      </div>
    </div>
  )
}

export default QuestionView