const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Route d'inscription
router.post('/signup', async (req, res) => {
  try {
    const { username, email, full_name, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const userCheck = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Nom d\'utilisateur ou email déjà utilisé' });
    }
    
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insérer le nouvel utilisateur
    const result = await db.query(
      'INSERT INTO users (username, email, full_name, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name',
      [username, email, full_name, hashedPassword]
    );
    
    // Créer le token JWT
    const token = jwt.sign(
      { id: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: result.rows[0],
      token
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    
    const user = result.rows[0];
    
    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    
    // Créer le token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      },
      token
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router; 