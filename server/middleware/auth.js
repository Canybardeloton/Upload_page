import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  // Récupérer le token d'authentification
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) { 
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  // Vérifier le token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
    
    // Stocker les informations utilisateur dans la requête
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
}; 