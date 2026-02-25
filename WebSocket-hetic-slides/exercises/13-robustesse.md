# Exercice 13 - Robustesse & demo

## Objectif
Gerer les edge cases essentiels et preparer la demo.

## Requis (10 min)

### 1. Double answer
Ignorer la deuxieme reponse d'un meme joueur sur la meme question. Verifier dans `handleAnswer()` que le `playerId` n'est pas deja dans la Map `answers`.

### 2. Code invalide
Si un joueur envoie un `join` avec un code qui n'existe pas, renvoyer `{ type: 'error', message: 'Quiz introuvable' }`. Ne pas crasher.

### 3. Message malformate
Entourer `JSON.parse()` d'un `try/catch` dans le handler de messages du serveur. Ignorer silencieusement les messages invalides.

## Bonus (si le temps le permet)

### 4. Reconnexion mid-quiz
Si un joueur se deconnecte et revient avec le meme pseudo, renvoyer l'etat courant via `{ type: 'sync', phase, data }`. Ne pas supprimer le joueur immediatement (grace period de 30s).

### 5. Host disconnect
Si le host se deconnecte, mettre le quiz en pause. Notifier les joueurs : "Le host s'est deconnecte...". Reprendre quand le host revient.

### 6. Tests croises
Echanger les URLs entre equipes et tester mutuellement.

## Script de demo (3 min)

1. Ouvrir `host-app` → creer un quiz avec 3 questions fun
2. Afficher le code → les autres equipes rejoignent via `player-app`
3. Jouer les 3 questions → resultats live
4. Leaderboard final
5. Objectif : **0 crash, flux fluide**

## Checkpoints
- Le double answer est ignore (pas de crash, pas de score en double).
- Un code invalide renvoie une erreur propre au client.
- La demo tourne en 3 minutes sans accroc.
