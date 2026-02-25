# Exercice 7 - Heartbeat & reconnexion

## Objectif
Detecter les connexions mortes et implementer la reconnexion automatique.

## Walkthrough
1. Cote serveur - Heartbeat :
   - Creer un `setInterval` de 30 secondes qui parcourt `wss.clients`.
   - Pour chaque client, verifier `(ws as any).isAlive`. Si `false`, terminer la connexion avec `ws.terminate()`.
   - Sinon, marquer `isAlive = false` et envoyer un `ws.ping()`.
   - Ecouter `'pong'` sur chaque socket : remettre `isAlive = true`.
2. A la connexion, initialiser `(ws as any).isAlive = true`.
3. Cote client React - Hook `useWebSocket(url)` :
   - Gerer la connexion initiale.
   - Reconnexion automatique avec backoff exponentiel : 1s, 2s, 4s, 8s... max 30s.
   - Exposer un etat : `'connected' | 'connecting' | 'disconnected'`.
   - Reset du backoff quand la connexion reussit.
   ```ts
   function useWebSocket(url: string) {
     const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
     const [messages, setMessages] = useState<ServerMessage[]>([])
     const wsRef = useRef<WebSocket | null>(null)
     // ...
   }
   ```
4. Afficher l'etat de connexion dans l'UI :
   - Pastille verte : connecte.
   - Pastille orange : reconnexion en cours.
   - Pastille rouge : deconnecte.
5. Tester : arreter le serveur (Ctrl+C), verifier que l'UI passe en "reconnecting", relancer le serveur, verifier la reconnexion auto.

## Checkpoints
- Le serveur log les connexions zombies terminees.
- L'UI passe en "reconnecting" quand le serveur s'arrete.
- La reconnexion est automatique quand le serveur revient.
- Le backoff augmente a chaque echec successif.

## Aide
- `ws.ping()` cote Node.js envoie un ping natif WebSocket. Le browser repond automatiquement avec un pong.
- Pour le backoff : `Math.min(1000 * 2 ** attempt, 30000)`.
- Ne pas oublier de `clearInterval` le heartbeat quand le serveur s'arrete.
- Pour tester les zombies : debrancher le wifi sans fermer le navigateur.
