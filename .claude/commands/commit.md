# Commit en français avec Gitmoji + Conventional Commits

Effectue un commit git en français, au format Conventional Commit préfixé d'un gitmoji. Pousse ensuite la branche.

## Étapes à suivre

### 1. Analyser les changements

Lance `git status` et `git diff` (staged et unstaged) pour comprendre ce qui a changé.

### 2. Vérifier la branche courante

Lance `git branch --show-current`.

**Si la branche est `main` :**
- Détermine un nom de branche court en anglais kebab-case décrivant la feature (ex: `feature/add-etablissement-actif`)
- Crée et bascule sur cette branche : `git checkout -b feature/<nom-feature>`

**Sinon :** reste sur la branche courante.

### 3. Stager les fichiers pertinents

Stage les fichiers modifiés liés à la feature (évite les fichiers sensibles `.env`, credentials, etc.) :
```
git add <fichiers>
```

### 4. Rédiger le message de commit

Le message doit respecter ce format **exact** :

```
<gitmoji> <type>(<scope>): <titre en français>
```

**Règles :**
- `<gitmoji>` : emoji unicode (pas `:code:`) choisi selon le type ci-dessous
- `<type>` : type conventional commit en minuscules
- `<scope>` : périmètre technique court en minuscules (ex: `api`, `admin`, `front`, `entity`, `migration`)
- `<titre>` : phrase courte en français décrivant **la fonctionnalité développée** (pas "fix bug" mais "ajout du champ actif sur les établissements")

**Correspondance gitmoji ↔ type :**

| Type | Gitmoji | Usage |
|------|---------|-------|
| `feat` | ✨ | Nouvelle fonctionnalité |
| `fix` | 🐛 | Correction de bug |
| `refactor` | ♻️ | Refactoring sans changement fonctionnel |
| `style` | 🎨 | CSS, mise en forme, UI |
| `docs` | 📝 | Documentation |
| `chore` | 🔧 | Config, build, dépendances |
| `perf` | ⚡️ | Amélioration de performance |
| `test` | ✅ | Ajout ou modification de tests |
| `migration` | 🗃️ | Migration base de données |
| `ci` | 👷 | CI/CD |
| `remove` | 🔥 | Suppression de code/fichier |
| `security` | 🔒️ | Sécurité |
| `init` | 🎉 | Initialisation |
| `wip` | 🚧 | Travail en cours |

Si plusieurs types s'appliquent, choisis le plus représentatif.

**Exemples de bons messages :**
```
✨ feat(entity): ajout du champ actif sur l'établissement
🗃️ migration(db): ajout de la colonne actif dans la table établissement
🎨 style(admin): toggle switch pour activer/désactiver un établissement
♻️ refactor(api): filtrage des établissements actifs via BooleanFilter
```

### 5. Commiter

```bash
git commit -m "$(cat <<'EOF'
<message ici>
EOF
)"
```

### 6. Pousser

```bash
git push -u origin <branche>
```

Si le push échoue parce que la branche n'existe pas encore en remote, utilise `--set-upstream origin <branche>`.

### 7. Créer la Pull Request si elle n'existe pas

Vérifie si une PR ouverte existe déjà pour la branche courante :

```bash
gh pr view --json number,url 2>/dev/null
```

**Si aucune PR n'existe (commande échoue ou retourne vide) :**

Crée une PR vers `main` avec `gh pr create`. Le titre reprend le message du dernier commit (sans le gitmoji). La description liste les fichiers modifiés et résume les changements en français.

```bash
gh pr create --base main --title "<titre>" --body "$(cat <<'EOF'
## Résumé

<description des changements en français, 2-3 phrases>

## Fichiers modifiés

<liste bullet des fichiers>
EOF
)"
```

**Si une PR existe déjà :** ne rien faire, afficher juste l'URL existante.

### 8. Confirmer

Affiche le résultat de `git log --oneline -3` et l'URL de la PR pour confirmer que tout est en ordre.
