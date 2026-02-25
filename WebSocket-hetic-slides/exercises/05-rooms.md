# Exercice 5 - Rooms & channels

## Objectif
Ajouter un systeme de rooms au chat pour separer les conversations.

## Walkthrough
1. Cote serveur : creer une `Map<string, Set<WebSocket>>` pour stocker les rooms.
2. Ajouter les types de messages :
   ```ts
   | { type: 'join-room'; room: string }
   | { type: 'leave-room'; room: string }
   ```
3. Quand un client rejoint une room :
   - L'ajouter au `Set` de la room.
   - Broadcaster a la room : `"Alice a rejoint #general"`.
4. Modifier le broadcast de `'chat'` pour n'envoyer qu'aux clients de la room active.
5. Gerer le `'close'` : retirer le client de sa room et annoncer le depart.
6. Cote React : ajouter une sidebar avec :
   - La liste des rooms disponibles.
   - Un bouton/input pour creer une room.
   - Un indicateur visuel de la room active.
7. Au clic sur une room, envoyer `{ type: 'join-room', room: 'nom' }`.

## Checkpoints
- Un message envoye dans `#room-A` n'apparait pas dans `#room-B`.
- Un utilisateur peut switcher de room.
- La liste des rooms se met a jour en temps reel.

## Aide
- Simplification : un client ne peut etre que dans une seule room a la fois.
- Stocker la room active sur le socket : `(ws as any).room = roomName` ou utiliser une `Map<WebSocket, string>`.
- Penser a retirer le client de l'ancienne room avant de le mettre dans la nouvelle.
- Creer une room par defaut `#general` pour les nouveaux arrivants.
