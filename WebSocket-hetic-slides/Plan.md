# Plan — WebSockets (3 jours)

Projet fil rouge : **Live Quiz & Vote** — Livrable final : **Application temps reel complete avec demo live**

Equipes : 2-3 personnes

Ratio : **20 % magistral / 80 % pratique**

Prerequis : TypeScript, React, Node.js, npm/pnpm, bases HTTP

---

## Jour 1 — D'ou vient le temps reel sur le web ?

Objectif de la journee : comprendre l'histoire du web temps reel, pourquoi WebSocket a ete cree, et construire ses premiers echanges bidirectionnels avec TypeScript.

| Bloc | Duree | Format | Contenu | Livrable |
|------|-------|--------|---------|----------|
| 0. Ice-breaker | 10 min | DISCUSSION | "Ou voyez-vous du temps reel au quotidien ?" — tour de table | — |
| 1. Le web avant le temps reel | 20 min | COURS | **Timeline** : pages statiques (1991) → CGI/PHP (1995) → AJAX/XMLHttpRequest (2005) → les hacks temps reel : hidden iframe, Flash XMLSocket, Comet/long-polling, Server-Sent Events. Pourquoi chaque solution avait ses limites (half-duplex, overhead HTTP, firewalls, proxies). Demo visuelle : 1 requete polling = headers + latence vs 1 frame WS = 2 octets. | — |
| 2. Naissance de WebSocket | 15 min | COURS | **2008** : premiere draft. **2011** : RFC 6455 standardise. Le handshake HTTP Upgrade (compatibilite infra existante). Frames, opcodes (text, binary, ping, pong, close). Full-duplex sur une seule connexion TCP. Pourquoi c'etait un game-changer. Support navigateurs (IE10+, 2012 = tous les navigateurs modernes). | — |
| 3. Socket.IO : heros d'hier | 10 min | COURS | **Pourquoi Socket.IO existait** : fallbacks (Flash, long-polling, JSONP polling) pour les vieux navigateurs. Reconnexion auto, rooms, namespaces — tout integre. **Pourquoi on n'en a plus vraiment besoin** : WebSocket natif supporte partout depuis 2012, API browser simple (6 methodes), les CDN/proxies modernes supportent WS nativement, la reconnexion se fait en 10 lignes. Socket.IO = abstraction utile, mais plus une necessite. On apprend le protocole brut d'abord. | — |
| 4. Premier serveur WS : echo | 45 min | DO | Setup projet TS + Node.js. Installer `ws` + `@types/ws`. Echo server type. Client browser avec `WebSocket` natif. Tester envoyer/recevoir. | Serveur echo fonctionnel |
| 5. Chat texte : broadcast | 60 min | DO | Broadcast a tous les clients connectes. Gestion des nicknames. Log connect/disconnect. | Chat multi-clients |
| 6. Structurer les messages | 10 min | COURS | Pourquoi des `string` bruts ne scalent pas. Pattern enveloppe `{ type, payload }`. Discriminated unions en TypeScript pour le type-safety. Schemas partages client/serveur. | — |
| 7. Chat avec protocole type | 60 min | DO | Refactoriser le chat : types partages TS, protocole `{ type, payload }`, front React simple (input + liste de messages + indicateur connexion). | Chat type + UI React |
| 8. Mini-challenges | 45 min | DO | "is typing...", liste des connectes en temps reel, horodatage messages, notification sonore. | Fonctionnalites bonus |
| 9. Debrief + teaser J2 | 5 min | SHOW | Recap, preview J2 : rooms, auth, resilience | — |

**Total magistral : ~60 min (~22%) — Total pratique : ~210 min + 10 min discussion (~78%)**

### Exercices Jour 1

| # | Exercice | Fichier |
|---|----------|---------|
| 00 | Mise en place : monorepo TS + Node | `exercises/00-setup.md` |
| 01 | Echo server + client browser | `exercises/01-echo-server.md` |
| 02 | Chat broadcast multi-clients | `exercises/02-chat-broadcast.md` |
| 03 | Protocole type + UI React | `exercises/03-chat-typed.md` |
| 04 | Mini-challenges (typing, presence, timestamps) | `exercises/04-mini-challenges.md` |

---

## Jour 2 — Patterns de production : rooms, auth, resilience

Objectif de la journee : maitriser les patterns necessaires pour un WebSocket en production — rooms, authentification, heartbeat, reconnexion, synchronisation d'etat.

| Bloc | Duree | Format | Contenu | Livrable |
|------|-------|--------|---------|----------|
| 0. Rappel J1 | 5 min | SHOW | Schema recap : client ↔ serveur ↔ broadcast, protocole type | — |
| 1. Rooms & channels | 15 min | COURS | Concept de rooms. `Map<roomId, Set<WebSocket>>`. Routing cible vs broadcast global. Pattern join/leave. | — |
| 2. Chat multi-rooms | 60 min | DO | Creer/rejoindre des rooms. Broadcast cible par room. UI React avec sidebar de rooms + switch. | Chat multi-rooms |
| 3. Authentification & securite | 15 min | COURS | Ou mettre le token ? (query param vs premier message vs `Sec-WebSocket-Protocol`). Validation cote serveur. Origin check. Rate limiting basique. Pourquoi pas de headers custom dans le handshake browser. | — |
| 4. Ajouter l'auth | 45 min | DO | Endpoint HTTP `/login` → JWT. Connexion WS avec token. Serveur valide et attache `userId` au socket. Username verifie (plus de "self-declared nickname"). | Auth fonctionnelle |
| 5. Heartbeat & reconnexion | 10 min | COURS | Ping/pong natif du protocole WS. Detection zombie connections cote serveur (interval + timeout). Reconnexion client : `setTimeout` avec backoff exponentiel. Hook React `useWebSocket` avec reconnect integre. | — |
| 6. Chat resilient | 45 min | DO | Ping/pong serveur. Hook `useWebSocket` avec auto-reconnect + backoff. Indicateur UI (connected/reconnecting/disconnected). Test : couper le serveur, relancer, verifier la reprise. | Chat resilient |
| 7. Sync d'etat & late joiners | 10 min | COURS | Probleme : un client rejoint apres le debut → il a rate des messages. Solutions : snapshot full state a la connexion, historique borne (last N messages), cache serveur. Diff vs full state. | — |
| 8. State sync en pratique | 45 min | DO | Serveur garde un buffer des N derniers messages par room. Envoyer `{ type: "sync", messages: [...] }` a la connexion. Late joiner voit l'historique. Liste des users presents par room. | State sync |
| 9. Debrief + briefing J3 | 10 min | SHOW | Recap patterns. Presentation du projet Live Quiz. | — |

**Total magistral : ~65 min (~25%) — Total pratique : ~195 min (~75%)**

### Exercices Jour 2

| # | Exercice | Fichier |
|---|----------|---------|
| 05 | Rooms & channels | `exercises/05-rooms.md` |
| 06 | Authentification WebSocket (JWT) | `exercises/06-auth.md` |
| 07 | Heartbeat, reconnexion & hook React | `exercises/07-heartbeat-reconnect.md` |
| 08 | Synchronisation d'etat & late join | `exercises/08-state-sync.md` |

---

## Jour 3 — Projet : Live Quiz & Vote en temps reel

Objectif de la journee : construire une application temps reel complete en equipe, en reutilisant tous les patterns des jours 1 et 2. Demo live en fin de journee.

### Le projet : Live Quiz & Vote

Un systeme de quiz/sondage en temps reel (type Kahoot) :
- **Host** : cree un quiz, lance les questions une par une, voit les resultats live
- **Joueurs** : rejoignent via un code, repondent aux questions, voient le leaderboard
- **Spectateurs** : voient les resultats en temps reel (votes, graphiques)

Ce projet mobilise : rooms (1 par quiz), auth (host vs joueur), messages types TS, state sync (late joiners), reconnexion, broadcast cible.

| Bloc | Duree | Format | Contenu | Livrable |
|------|-------|--------|---------|----------|
| 0. Briefing projet | 15 min | SHOW | Cahier des charges, architecture cible, protocole de messages, repartition equipe | Equipes formees |
| 1. Setup (starter code) | 10 min | DO | Explorer le starter code fourni (`starter-code/quiz-app/`). Comprendre la structure monorepo, les types partages, les squelettes de composants et de classes. | Projet compris et lance |
| 2. Serveur quiz | 60 min | DO | State machine du quiz (lobby → question → resultats → leaderboard → fin). Gestion rooms. Timer par question. Calcul scores. Le squelette `QuizRoom` (proprietes + signatures) est fourni. | Serveur fonctionnel |
| 3. Front Host | 50 min | DO | Interface React : creer un quiz (titre + questions), lancer une session, afficher les resultats en live (barres animees), passer a la question suivante, leaderboard final. Les squelettes de composants + CSS sont fournis. | Dashboard host |
| 4. Front Joueur | 50 min | DO | Interface React : ecran de join (code quiz + pseudo), attente lobby, repondre (4 boutons couleur), feedback correct/incorrect, score perso. Les squelettes de composants + CSS sont fournis. | Interface joueur |
| 5. Scaling & quand utiliser quoi | 15 min | COURS | Scaling horizontal WS (sticky sessions, Redis pub/sub pour multi-process). Quand choisir WS vs SSE vs polling. Alternatives modernes : Liveblocks, Partykit, Supabase Realtime. Socket.IO reste pertinent quand... (namespaces, binary, fallback corporate proxies). | — |
| 6. Robustesse (bonus) | 10 min | DO | Double answer + code invalide sont requis. Le reste (reconnexion mid-quiz, late join spectateur, host disconnect) est bonus. | Application robuste |
| 7. Demo live | 20 min | PRESENTATION | Chaque equipe fait une demo live — les autres equipes jouent ! Vote de la meilleure app. | Demo fonctionnelle |

**Total magistral : ~30 min (~13%) — Total pratique : ~180 min + 20 min demo (~87%)**

### Exercices Jour 3

| # | Exercice | Fichier |
|---|----------|---------|
| 09 | Setup projet + types partages | `exercises/09-projet-setup.md` |
| 10 | Serveur quiz : state machine + rooms | `exercises/10-serveur-quiz.md` |
| 11 | Front Host : creation & pilotage | `exercises/11-front-host.md` |
| 12 | Front Joueur : rejoindre & jouer | `exercises/12-front-joueur.md` |
| 13 | Robustesse & polish final | `exercises/13-robustesse.md` |

---

## Recapitulatif des competences

| Jour | Competences acquises |
|------|---------------------|
| J1 | Histoire web temps reel, protocole WS (RFC 6455), API browser, serveur Node/TS `ws`, broadcast, messages types, React + WS |
| J2 | Rooms/channels, auth JWT sur WS, heartbeat ping/pong, reconnexion backoff, hook `useWebSocket`, state sync |
| J3 | Architecture projet complet, state machine, UI temps reel React, scaling, alternatives modernes, demo |

## Stack technique

- **Serveur** : Node.js + TypeScript + `ws`
- **Client** : React + TypeScript (Vite)
- **Types partages** : package `shared-types` dans le monorepo
- **Auth** : JWT simple (jsonwebtoken)
- **Pas de Socket.IO** — on utilise le protocole natif, Socket.IO est couvert en magistral pour le contexte historique et les cas d'usage restants

## Architecture cible (Jour 3)

```
quiz-app/
├── packages/
│   └── shared-types/        # Types TS partages (messages, enums)
├── server/                   # Node.js + ws + JWT
├── host-app/                 # React (Vite) — interface animateur
└── player-app/               # React (Vite) — interface joueur
```

```
     ┌──────────────┐
     │  Serveur WS  │
     │  Node.js/TS  │
     │              │
     │  Quiz State  │
     │  Machine     │
     │  Rooms Map   │
     │  JWT Auth    │
     └──┬───┬───┬───┘
        │   │   │
   ┌────┘   │   └─────┐
   ▼        ▼         ▼
┌───────┐ ┌────────┐ ┌────────┐
│ Host  │ │ Player │ │ Player │
│ React │ │ React  │ │ React  │
└───────┘ └────────┘ └────────┘
```

## Starter code (Jour 3)

Un starter code complet est fourni aux etudiants (`starter-code/quiz-app/`). Il contient :
- **Complet** : types partages, package.json, tsconfig, vite.config, hook `useWebSocket`, CSS, utilitaires serveur
- **Squelette** : classe `QuizRoom` (proprietes + signatures de methodes), composants React (props typees + structure), routing serveur
- **A implementer** : logique metier (state machine, handlers de messages, JSX des composants, data flow)

Les etudiants se concentrent sur la logique metier, pas sur la configuration.

## Protocole de messages (draft — types TS)

```typescript
// shared-types/messages.ts

// Client → Serveur
type ClientMessage =
  | { type: "join"; quizCode: string; name: string }
  | { type: "answer"; questionId: number; choiceIndex: number }
  | { type: "host:create"; title: string; questions: QuizQuestion[] }
  | { type: "host:start" }
  | { type: "host:next" }
  | { type: "host:end" }

// Serveur → Client
type ServerMessage =
  | { type: "joined"; players: string[] }
  | { type: "question"; id: number; text: string; choices: string[]; timerSec: number }
  | { type: "tick"; remaining: number }
  | { type: "results"; id: number; distribution: number[]; correctIndex: number }
  | { type: "leaderboard"; scores: { name: string; score: number }[] }
  | { type: "ended" }
  | { type: "error"; message: string }
  | { type: "sync"; state: QuizState }

// Quiz lifecycle
type QuizPhase = "lobby" | "question" | "results" | "leaderboard" | "ended"
```

## Evaluation

Grille d'evaluation du projet : voir `evaluations/grille-projet.md`

Le projet est evalue sur 100 points selon 7 criteres ponderes :
- Fonctionnement global (30 pts)
- State machine serveur (20 pts)
- UI Host (15 pts)
- UI Joueur (15 pts)
- Robustesse (10 pts)
- Qualite du code (5 pts)
- Demo live (5 pts)
- Bonus : reconnexion, animations, features extra (+10 pts)

## Timeline historique (support magistral J1)

```
1991  HTML — pages statiques
1995  CGI / PHP — pages dynamiques serveur
1999  XMLHttpRequest (IE5) — premier pas vers l'asynchrone
2005  AJAX popularise (Gmail, Google Maps) — le web "moderne"
2006  Comet / long-polling — hacks pour le push serveur
2008  WebSocket draft — enfin un vrai protocole bidirectionnel
2010  Socket.IO v0.6 — abstraction + fallbacks (Flash, JSONP, long-polling)
2011  RFC 6455 — WebSocket standardise
2012  Support complet navigateurs (IE10+) — plus besoin de fallbacks
2015  HTTP/2 — multiplexage, mais toujours request/response
2020  WebTransport (draft) — UDP-based, futur du temps reel ?
2024  WebSocket supporte partout : CDN, proxies, cloud — Socket.IO optionnel
```
