const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Tester la connexion
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erreur de connexion à PostgreSQL:', err);
  }
  console.log('Connecté avec succès à PostgreSQL');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
}; 