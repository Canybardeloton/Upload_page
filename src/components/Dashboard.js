import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const FILES_PER_PAGE = 5;
  const totalPages = Math.ceil(files.length / FILES_PER_PAGE);
  
  const displayedFiles = files.slice(
    currentPage * FILES_PER_PAGE,
    (currentPage + 1) * FILES_PER_PAGE
  );

  const handlePageChange = (page_number) => {
    setCurrentPage(page_number);
  };

  // Charger les fichiers de l'utilisateur
  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Vous devez être connecté pour voir vos fichiers');
      }
      
      const response = await fetch('http://localhost:5000/api/files', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des fichiers');
      }
      
      setFiles(data.files || []);
    } catch (error) {
      setError(error.message);
      console.error('Erreur lors du chargement des fichiers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Supprimer un fichier
  const handleDeleteFile = async (fileId) => {
    setDeleteLoading(fileId);
    
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Vous devez être connecté pour supprimer des fichiers');
      }
      
      const response = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression du fichier');
      }
      
      // Mettre à jour la liste des fichiers
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      setError(error.message);
      console.error('Erreur lors de la suppression du fichier:', error);
    } finally {
      setDeleteLoading(null);
    }
  };
  
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Formatage de la taille de fichier
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Mes fichiers</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-spinner">Chargement...</div>
      ) : files.length === 0 ? (
        <div className="no-files-message">
          <p>Vous n'avez pas encore importé de fichiers.</p>
        </div>
      ) : (
        <>
          <div className="files-table-container">
            <table className="files-table">
              <thead>
                <tr>
                  <th>Nom du fichier</th>
                  <th>Type</th>
                  <th>Taille</th>
                  <th>Date d'import</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedFiles.map(file => (
                  <tr key={file.id}>
                    <td>{file.original_name}</td>
                    <td>{file.file_type}</td>
                    <td>{formatFileSize(file.file_size)}</td>
                    <td>{formatDate(file.upload_date)}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteFile(file.id)}
                        disabled={deleteLoading === file.id}
                      >
                        {deleteLoading === file.id ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`page-button ${currentPage === i ? 'active' : ''}`}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
          
          <button className="refresh-button" onClick={fetchUserFiles} disabled={loading}>
            Rafraîchir la liste
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;