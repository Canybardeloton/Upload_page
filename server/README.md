# Serveur d'Upload de Fichiers

Un serveur Node.js avec Express et PostgreSQL pour gérer l'authentification des utilisateurs et l'upload de fichiers.

## Prérequis

- Node.js (v14+)
- PostgreSQL installé et en cours d'exécution
- npm ou yarn

## Installation

1. Cloner ce dépôt
2. Installer les dépendances :
   ```
   cd server
   npm install
   ```

3. Configurer les variables d'environnement :
   - Créer un fichier `.env` à la racine du dossier server
   - Utiliser `.env.example` comme modèle
   - Ajuster les paramètres de connexion à PostgreSQL et autres variables

4. Créer la base de données dans PostgreSQL :
   ```sql
   CREATE DATABASE upload_db;
   ```

5. Initialiser les tables de la base de données :
   ```
   npm run init-db
   ```

## Utilisation

### En développement
```
npm run dev
```

### En production
```
npm start
```

## Structure des API

### Authentification
- `POST /api/auth/signup` : Inscription d'un utilisateur
- `POST /api/auth/login` : Connexion d'un utilisateur

### Gestion des fichiers
- `POST /api/files/upload` : Télécharger des fichiers
- `GET /api/files` : Récupérer la liste des fichiers de l'utilisateur
- `DELETE /api/files/:id` : Supprimer un fichier

## Sécurité
- Authentification JWT
- Hashage des mots de passe avec bcrypt
- Limite de taille des fichiers uploadés 