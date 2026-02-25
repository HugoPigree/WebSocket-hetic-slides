// ============================================================
// JoinScreen - Formulaire pour rejoindre un quiz
// IMPLEMENTATION : champs code et nom, bouton rejoindre
// ============================================================

import { useState } from 'react'

interface JoinScreenProps {
  /** Callback appele quand le joueur soumet le formulaire */
  onJoin: (code: string, name: string) => void
  /** Message d'erreur optionnel (ex: "Code invalide") */
  error?: string
}

/**
 * Composant formulaire pour rejoindre un quiz existant.
 *
 * Ce qu'il faut implementer :
 * - Un champ pour le code du quiz (6 caracteres, majuscules)
 * avec la classe .code-input pour le style monospace
 * - Un champ pour le pseudo du joueur
 * - Un bouton "Rejoindre" (classe .btn-primary)
 * - Afficher le message d'erreur s'il existe (classe .error-message)
 * - Valider que les deux champs ne sont pas vides avant d'appeler onJoin
 *
 * Classes CSS disponibles : .join-form, .form-group, .code-input,
 * .error-message, .btn-primary
 */
function JoinScreen({ onJoin, error }: JoinScreenProps) {
  // TODO: State pour le code du quiz
  const [code, setCode] = useState('')
  // TODO: State pour le pseudo
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Valider que les champs ne sont pas vides
    if (!code.trim() || !name.trim()) {
      return // On pourrait aussi afficher une alerte locale
    }

    // TODO: Appeler onJoin(code.toUpperCase(), name)
    onJoin(code.toUpperCase().trim(), name.trim())
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <h1>Rejoindre un Quiz</h1>
      
      {/* TODO: Afficher l'erreur si elle existe */}
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="quizCode">Code du Quiz</label>
        {/* TODO: Champ code du quiz avec classe .code-input */}
        <input
          id="quizCode"
          type="text"
          className="code-input"
          placeholder="CODE"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerName">Ton Pseudo</label>
        {/* TODO: Champ pseudo */}
        <input
          id="playerName"
          type="text"
          placeholder="TON PSEUDO INCROYABLE ICI"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* TODO: Bouton Rejoindre */}
      <button type="submit" className="btn-primary">
        Rejoindre
      </button>
    </form>
  )
}

export default JoinScreen