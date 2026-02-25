# Exercice 9 - Explorer le starter code

## Objectif
Explorer le starter code fourni et verifier que tout fonctionne.

## Walkthrough

1. **Copier le starter code** dans votre workspace :
   ```bash
   cp -r starter-code/quiz-app .
   cd quiz-app
   ```

2. **Installer les dependances** dans chaque package :
   ```bash
   cd server && npm install && cd ..
   cd host-app && npm install && cd ..
   cd player-app && npm install && cd ..
   ```

3. **Explorer la structure** — identifiez :
   - Les types partages : `packages/shared-types/index.ts`
   - Le squelette serveur : `server/src/QuizRoom.ts` (proprietes + signatures de methodes)
   - Le routing : `server/src/index.ts` (switch sur message.type)
   - Les utilitaires : `server/src/utils.ts` (broadcast, generateCode)
   - Le hook WebSocket : `host-app/src/hooks/useWebSocket.ts`
   - Les composants React : `host-app/src/components/` et `player-app/src/components/`
   - Les styles : `host-app/src/App.css` et `player-app/src/App.css`

4. **Demarrer chaque package** (dans 3 terminaux) :
   ```bash
   # Terminal 1
   cd server && npm run dev
   # Terminal 2
   cd host-app && npm run dev
   # Terminal 3
   cd player-app && npm run dev
   ```

5. **Repartir les roles** dans l'equipe :
   - **Serveur** (1 personne) : implementer les methodes de `QuizRoom.ts` + completer les handlers dans `index.ts`
   - **Front Host** (1 personne) : implementer les composants dans `host-app/src/components/` + completer `App.tsx`
   - **Front Joueur** (1 personne) : implementer les composants dans `player-app/src/components/` + completer `App.tsx`

## Checkpoints
- Les 3 packages demarrent sans erreur (`npm run dev`).
- Les types partages sont importables depuis chaque package.
- Chaque membre de l'equipe sait quel fichier il doit implementer.

## Aide
- Si `npm install` echoue, verifier que Node.js >= 18 est installe.
- Les imports `@shared/*` sont resolus via `tsconfig.json` paths et `vite.config.ts` alias.
- Lire le `README.md` a la racine pour un apercu complet de la structure.
