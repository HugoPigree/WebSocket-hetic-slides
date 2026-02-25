# Exercice 6 - Authentification WebSocket (JWT)

## Objectif
Securiser la connexion WebSocket avec un token JWT.

## Walkthrough
1. Installer `jsonwebtoken` et `@types/jsonwebtoken` dans le serveur.
2. Creer un serveur HTTP avec `http.createServer()`.
3. Ajouter un endpoint `POST /login` qui :
   - Recoit `{ username, password }` en JSON.
   - Verifie contre une liste hardcodee (ex: `alice/pass1`, `bob/pass2`).
   - Retourne un JWT signe avec un secret (`jwt.sign({ username }, SECRET, { expiresIn: '1h' })`).
4. Attacher le `WebSocketServer` au serveur HTTP : `new WebSocketServer({ server })`.
5. Dans le handler `'connection'`, extraire le token du query param :
   ```ts
   const url = new URL(req.url!, `http://${req.headers.host}`)
   const token = url.searchParams.get('token')
   ```
6. Verifier le token avec `jwt.verify()`. Si invalide, fermer la connexion avec `ws.close(4001, 'Unauthorized')`.
7. Stocker le username verifie sur le socket : `(ws as any).username = decoded.username`.
8. Le nickname n'est plus auto-declare, il vient du JWT.
9. Cote client React : appeler `/login`, stocker le token, se connecter en WS avec `ws://localhost:8080?token=xxx`.

## Checkpoints
- Sans token, la connexion WS est refusee (code 4001).
- Le username affiche dans le chat correspond au JWT.
- Un token expire est rejete.

## Aide
- Le secret JWT peut etre hardcode pour le TP : `const SECRET = 'mon-secret-ws-tp'`.
- Ne pas oublier de lancer le serveur HTTP et WS sur le meme port : `server.listen(8080)`.
- Pour tester sans front, utiliser `curl -X POST http://localhost:8080/login -H "Content-Type: application/json" -d '{"username":"alice","password":"pass1"}'`.
- Gerer le CORS si le front est sur un port different (Vite = 5173).
