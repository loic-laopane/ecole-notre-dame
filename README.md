# 🏫 Ensemble Scolaire Notre-Dame Saint-Louis

Site officiel de l'Ensemble Scolaire NDSL — Mantes-la-Jolie & Bonnières-sur-Seine.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 15 · App Router · TypeScript · Tailwind CSS |
| Backend | Symfony 7 · API Platform 3 · EasyAdmin 4 |
| Auth | OAuth2 (KnpU OAuth2 Bundle) · JWT |
| Base de données | PostgreSQL 16 |
| Infra locale | Docker Compose |
| CI/CD | GitHub Actions |

## Structure

```
ndsl/
├── frontend/          # Next.js 15
├── backend/           # Symfony 7 API
├── docker-compose.yml # Stack complète locale
├── .github/workflows/ # CI/CD
└── docker/nginx/      # Config Nginx
```

## Démarrage rapide

```bash
git clone <REPO_URL>
cd ndsl
cp backend/.env.example backend/.env
docker compose up -d
```

- Frontend : http://localhost:3000
- API : http://localhost:8000/api
- EasyAdmin : http://localhost:8000/admin
- pgAdmin : http://localhost:8081

## Documentation

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
