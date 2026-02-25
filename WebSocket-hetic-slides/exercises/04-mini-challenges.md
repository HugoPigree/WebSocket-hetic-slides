# Exercice 4 - Mini-challenges

## Objectif
Ajouter des features temps reel au chat : typing indicator, user list, horodatage et notifications.

## Walkthrough

> **Niveaux de difficulte** : les challenges sont classes par difficulte croissante. Commencez par le challenge **Base**, puis passez a **Avance** et **Expert** si le temps le permet. Seul le challenge Base est obligatoire.

### Challenge 1 - Typing indicator [BASE]
1. Cote client : envoyer `{ type: 'typing' }` quand l'utilisateur tape dans l'input.
2. Cote serveur : broadcaster `{ type: 'typing', nick }` a tous les clients sauf l'emetteur.
3. Cote client : afficher `"Alice is typing..."` pendant 2 secondes, puis masquer.
4. Utiliser un `setTimeout` qui se reset a chaque nouveau `'typing'` recu.

### Challenge 2 - User list en temps reel [AVANCE]
1. Cote serveur : maintenir un `Set<string>` des pseudos connectes.
2. A chaque connect/disconnect, envoyer `{ type: 'user-list', users: [...] }` a tous.
3. Cote client : afficher la liste dans une sidebar.

### Challenge 3 - Horodatage + notification son [EXPERT]
1. Ajouter un timestamp ISO a chaque message serveur : `ts: Date.now()`.
2. Cote client : afficher l'heure relative (`"il y a 2s"`, `"il y a 5min"`).
3. Jouer un son quand un message arrive et que l'onglet n'est pas focus (`document.hidden`).
   ```js
   if (document.hidden) {
     new Audio('/notification.mp3').play()
   }
   ```

## Checkpoints
- Le typing indicator s'affiche et disparait apres 2s d'inactivite.
- La liste des users est synchronisee entre tous les clients.
- Les timestamps sont coherents et affiches en relatif.

## Aide
- Pour le son, utiliser `new Audio()` avec un petit MP3 ou un oscillator Web Audio API.
- Pour le timing, `Date.now()` cote serveur garantit la coherence.
- `document.hidden` + l'evenement `visibilitychange` pour detecter le focus.
- Les 3 challenges sont independants, commencer par celui qui vous inspire.
