# Grille d'evaluation — Projet Live Quiz

## Bareme (total : 100 points)

| Critere | Points | Details |
|---------|--------|---------|
| **Fonctionnement global** | 30 | Le quiz est jouable de bout en bout : creation, join, questions, scores, leaderboard |
| **State machine serveur** | 20 | Transitions correctes (lobby → question → results → leaderboard → ended), timer fonctionnel, calcul des scores |
| **Interface Host** | 15 | Tous les ecrans presents (creation, lobby, question, resultats, leaderboard), affichage des barres de resultats, UX coherente |
| **Interface Joueur** | 15 | Join fonctionnel, boutons Kahoot-style, feedback correct/incorrect, desactivation apres reponse |
| **Robustesse** | 10 | Double answer ignore, code invalide gere proprement, pas de crash sur messages invalides |
| **Qualite du code** | 5 | TypeScript strict respecte, types partages utilises, code lisible et organise |
| **Demo live** | 5 | Presentation fluide, quiz jouable en live par les autres equipes, pas de crash |

## Niveaux

| Note | Niveau | Description |
|------|--------|-------------|
| 90-100 | **Excellent** | Tout fonctionne parfaitement, robuste, code propre, demo impeccable |
| 70-89 | **Bien** | Fonctionnel avec quelques bugs mineurs ou ecrans incomplets, demo OK |
| 50-69 | **Suffisant** | Quiz jouable mais edge cases non geres, UI incomplete ou peu soignee |
| < 50 | **Insuffisant** | Quiz non fonctionnel ou fonctionnalites majeures manquantes |

## Bonus (hors bareme, jusqu'a +10 points)

| Bonus | Points |
|-------|--------|
| Reconnexion mid-quiz fonctionnelle | +4 |
| Animations et polish UI supplementaires | +3 |
| Features supplementaires (spectateur, themes, son, etc.) | +3 |

## Modalites

- **Travail en equipe** (2-3 personnes)
- **Evaluation** : demo live de 3 minutes + revue du code
- **Rendu** : repository Git ou archive du projet
