# Exercice 11 - Front Host : creation & pilotage

## Objectif
Implementer les composants React du dashboard host. Les squelettes de composants, le hook WebSocket et le CSS sont fournis.

## Walkthrough

### Etape 1 — Completer `App.tsx`

Le fichier `host-app/src/App.tsx` contient le routeur de phases et les handlers. Completez :
- Le `useEffect` qui traite les messages du serveur (switch sur `lastMessage.type`)
- Les handlers `handleCreateQuiz`, `handleStart`, `handleNext`
- Chaque handler doit appeler `sendMessage()` avec le bon type de message

### Etape 2 — Implementer les composants

Chaque composant a ses props typees et des commentaires TODO. Implementez le JSX :

1. **`CreateQuiz.tsx`** : Formulaire avec titre du quiz + ajout dynamique de questions (texte, 4 choix, index de la bonne reponse, duree timer). Bouton "Creer" qui appelle `onSubmit`.

2. **`Lobby.tsx`** : Afficher le code du quiz en grand (classe CSS `.quiz-code` fournie). Liste des joueurs connectes. Bouton "Demarrer".

3. **`QuestionView.tsx`** : Question en cours + choix + timer countdown + compteur de reponses ("8/12 ont repondu").

4. **`Results.tsx`** : Barres animees montrant la distribution des reponses (classe `.result-bar` avec transition CSS fournie). Mettre `style={{ width: \`\${pct}%\` }}` pour animer. Bonne reponse en vert. Bouton "Suivant".

5. **`Leaderboard.tsx`** : Classement trie par score decroissant (classes `.leaderboard-*` fournies).

### Astuce pour les barres animees

Le CSS `.result-bar` a deja `transition: width 0.8s ease`. Pour l'animation :
1. Render initial avec `width: 0`
2. Apres un court `setTimeout(50ms)`, mettre a jour le state avec les vrais pourcentages
3. La transition CSS fait le reste

## Checkpoints
- Le code du quiz est affiche en grand et lisible.
- Les joueurs apparaissent en temps reel dans le lobby.
- Les barres de resultats s'animent (transition CSS).
- Le leaderboard est trie par score decroissant.
- La navigation entre ecrans suit la state machine du serveur.

## Aide
- Les classes CSS sont documentees dans `App.css`. Consulter le fichier pour voir les styles disponibles.
- Le hook `useWebSocket` retourne `{ status, sendMessage, lastMessage }`.
- Gerer les ecrans avec la variable `phase` dans `App.tsx` — elle suit la state machine du serveur.
- Pour le formulaire de creation, utiliser un state `questions: QuizQuestion[]` et ajouter/supprimer dynamiquement.
