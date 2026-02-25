# Exercice 8 - Synchronisation d'etat

## Objectif
Permettre aux nouveaux arrivants de voir l'etat actuel du chat (historique + users).

## Walkthrough
1. Cote serveur : maintenir un buffer circulaire des N derniers messages par room (ex: 50).
   ```ts
   const messageHistory = new Map<string, ServerMessage[]>()

   function pushMessage(room: string, msg: ServerMessage) {
     const history = messageHistory.get(room) ?? []
     history.push(msg)
     if (history.length > 50) history.shift()
     messageHistory.set(room, history)
   }
   ```
2. Quand un client rejoint une room, envoyer un message de type `'sync'` :
   ```ts
   { type: 'sync', messages: [...], users: [...] }
   ```
3. Ajouter le type `'sync'` aux `ServerMessage` dans `shared/types.ts`.
4. Cote client : quand on recoit `'sync'`, remplacer l'etat local des messages par le snapshot serveur.
5. Ajouter un separateur visuel dans l'UI : `"--- Messages precedents ---"` / `"--- Nouveaux messages ---"`.
6. Bonus : inclure aussi la liste des users connectes par room dans le sync.

## Checkpoints
- Un nouvel onglet voit les 50 derniers messages immediatement.
- La liste des users est correcte des la connexion.
- Le separateur entre anciens et nouveaux messages est visible.

## Aide
- Pour le buffer circulaire, un simple `Array` avec `push()` + `shift()` quand `length > 50`.
- Ne pas oublier de serialiser les timestamps dans l'historique.
- Cote client, differencier les messages issus du sync (anciens) et les messages recus en live (nouveaux) avec un flag ou un index.
- Si le sync est trop gros, reduire a 20 messages pour le dev.
