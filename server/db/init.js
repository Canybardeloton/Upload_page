import { pool } from './index';

// Fonction pour créer les tables
async function initDatabase() {
  try {
    // Table des utilisateurs
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table des fichiers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS files (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_size INTEGER NOT NULL,
        file_type VARCHAR(100),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables créées avec succès');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la création des tables:', error);
    process.exit(1);
  }
}
initDatabase(); 