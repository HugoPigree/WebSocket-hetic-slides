# Exercice 10 - Serveur quiz : logique metier

## Objectif
Implementer la logique de la state machine et les handlers de messages dans le squelette fourni.

## Walkthrough

### Etape 1 — Implementer les methodes de `QuizRoom.ts`

Le fichier `server/src/QuizRoom.ts` contient la classe avec toutes les proprietes et signatures de methodes. Implementez le corps de chaque methode :

1. **`start()`** : Transition `lobby` → `question`. Demarrer le timer avec `setInterval` (1 tick/seconde). Broadcaster la premiere question a tous les joueurs (sans `correctIndex` !).

2. **`nextQuestion()`** : Si c'etait la derniere question → passer en `leaderboard` et broadcaster le classement. Sinon → passer a la question suivante, reinitialiser les reponses, redemarrer le timer.

3. **`handleAnswer(playerId, choiceIndex)`** : Verifier que le joueur n'a pas deja repondu. Stocker la reponse avec `Date.now()`. Calculer le score : `Math.round(1000 * (remaining / timerSec))` si correct, 0 sinon.

4. **`tick()`** : Decrementer le timer. Broadcaster `{ type: 'tick', remaining }`. Si `remaining <= 0`, appeler `timeUp()`.

5. **`timeUp()`** : Arreter le timer. Calculer la distribution des reponses. Passer en phase `results`. Broadcaster les resultats.

6. **`broadcastToAll(msg)`** : Envoyer un message a tous les joueurs + au host. Utiliser la fonction `send()` de `utils.ts`.

### Etape 2 — Completer les handlers dans `index.ts`

Le fichier `server/src/index.ts` a le routing en place. Completez chaque case du switch :

- **`host:create`** : Creer une `QuizRoom`, stocker les questions, sauvegarder la WebSocket du host, ajouter la room a la Map globale. Envoyer le code au host.
- **`host:start`** : Appeler `room.start()`.
- **`host:next`** : Appeler `room.nextQuestion()`.
- **`host:end`** : Terminer le quiz, broadcaster `{ type: 'ended' }`, supprimer la room.
- **`join`** : Verifier que le code existe, ajouter le joueur, broadcaster la liste des joueurs.
- **`answer`** : Appeler `room.handleAnswer()`.

### Etape 3 — Tester

Ouvrir les DevTools Chrome (onglet Network → WS) et tester avec un client WebSocket simple :
```javascript
const ws = new WebSocket('ws://localhost:3001')
ws.onmessage = e => console.log(JSON.parse(e.data))
ws.send(JSON.stringify({ type: 'host:create', title: 'Test', questions: [...] }))
```

## Checkpoints
- Un quiz peut etre cree et possede un code unique de 6 caracteres.
- Les joueurs peuvent rejoindre avec le code.
- Le timer fonctionne et envoie des ticks chaque seconde.
- Les scores sont calcules correctement (rapidite + exactitude).
- Les transitions `lobby → question → results → question/leaderboard → ended` fonctionnent.

## Aide
- Generer le code : la fonction `generateQuizCode()` est deja dans `utils.ts`.
- Stocker le `timerId` pour pouvoir `clearInterval()` lors des transitions.
- Score : `Math.round(1000 * (remaining / timerSec))` pour une reponse correcte, 0 sinon.
- Utiliser `Map<string, QuizRoom>` pour retrouver les rooms par code.
- Ne pas envoyer `correctIndex` aux joueurs pendant la phase `question` !
