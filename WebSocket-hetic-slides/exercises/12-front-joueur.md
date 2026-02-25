# Exercice 12 - Front Joueur : rejoindre & jouer

## Objectif
Implementer les composants React de l'interface joueur. Les squelettes, le hook WebSocket et le CSS Kahoot-style sont fournis.

## Walkthrough

### Etape 1 — Completer `App.tsx`

Le fichier `player-app/src/App.tsx` contient le routeur de phases. Completez :
- Le `useEffect` qui traite les messages du serveur
- `handleJoin(code, name)` : sauvegarder le nom, envoyer `{ type: 'join', quizCode, name }`
- `handleAnswer(choiceIndex)` : verifier `hasAnswered`, marquer comme repondu, envoyer `{ type: 'answer', questionId, choiceIndex }`

### Etape 2 — Implementer les composants

1. **`JoinScreen.tsx`** : Formulaire avec input code quiz (6 caracteres) + input pseudo + bouton "Rejoindre". Afficher l'erreur si `error` est defini.

2. **`WaitingLobby.tsx`** : Message "En attente du host..." + liste des joueurs connectes.

3. **`AnswerScreen.tsx`** : Afficher la question + 4 boutons de couleur Kahoot (classes `.answer-btn` fournies avec les couleurs Rouge/Bleu/Jaune/Vert). Timer visible. Au clic → appeler `onAnswer(index)`. Desactiver tous les boutons si `hasAnswered` est true.

4. **`FeedbackScreen.tsx`** : Afficher correct (vert + check) ou incorrect (rouge + croix) avec le score gagne. Classes `.feedback.correct` et `.feedback.incorrect` fournies.

5. **`ScoreScreen.tsx`** : Classement general. Mettre en surbrillance la ligne du joueur courant (comparer avec `playerName`).

## Checkpoints
- Le joueur peut rejoindre un quiz avec un code valide.
- Les 4 boutons Kahoot s'affichent avec les bonnes couleurs.
- Les boutons se desactivent apres avoir repondu.
- Le feedback correct/incorrect est immediat.
- Le leaderboard met en avant la position du joueur.

## Aide
- Les couleurs Kahoot sont dans `App.css` : Rouge `#e21b3c`, Bleu `#1368ce`, Jaune `#d89e00`, Vert `#26890c`.
- Desactiver les boutons avec `disabled={hasAnswered}` — le style `.answer-btn:disabled` est deja defini.
- Sur mobile, les boutons ont deja `min-height: 80px` dans le CSS.
- Si le code est invalide, le serveur renvoie `{ type: 'error', message: 'Quiz not found' }`.
