const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', authenticateToken, filesRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

