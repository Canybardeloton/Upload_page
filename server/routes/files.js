const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');

// Configuration de stockage des fichiers avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(__dirname, '../uploads', req.user.id.toString());
    
    // Créer le dossier utilisateur s'il n'existe pas
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Filtrer les types de fichiers si nécessaire
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Route pour télécharger des fichiers
router.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const uploadedFiles = [];
    
    // Insérer les informations de fichiers dans la base de données
    for (const file of req.files) {
      const result = await db.query(
        `INSERT INTO files (
          filename, original_name, file_path, file_size, file_type, user_id
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          file.filename,
          file.originalname,
          file.path,
          file.size,
          file.mimetype,
          req.user.id
        ]
      );
      
      uploadedFiles.push(result.rows[0]);
    }
    
    res.status(201).json({
      message: 'Fichiers téléchargés avec succès',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement des fichiers:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour récupérer la liste des fichiers de l'utilisateur
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM files WHERE user_id = $1 ORDER BY upload_date DESC',
      [req.user.id]
    );
    
    res.status(200).json({
      message: 'Fichiers récupérés avec succès',
      files: result.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour supprimer un fichier
router.delete('/:id', async (req, res) => {
  try {
    // Vérifier que le fichier appartient à l'utilisateur
    const fileCheck = await db.query(
      'SELECT * FROM files WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    
    if (fileCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }
    
    const file = fileCheck.rows[0];
    
    // Supprimer le fichier physique
    fs.unlinkSync(file.file_path);
    
    // Supprimer l'entrée de la base de données
    await db.query(
      'DELETE FROM files WHERE id = $1',
      [req.params.id]
    );
    
    res.status(200).json({ message: 'Fichier supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router; 