import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
// 	fetchUploadedFiles();
//   }, []);

//   const fetchUploadedFiles = async () => {
// 	try {
// 	  // Remplacez par votre endpoint API
// 	  const response = await fetch('/api/user-files', {
// 		headers: {
// 		  'Authorization': `Bearer ${localStorage.getItem('userToken')}`
// 		}
// 	  });

// 	  if (!response.ok) {
// 		throw new Error('Erreur lors de la récupération des fichiers');
// 	  }

// 	  const data = await response.json();
// 	  setUploadedFiles(data);
// 	  setLoading(false);
// 	} catch (err) {
// 	  setError(err.message);
// 	  setLoading(false);
// 	}
//   };

  // Nombre de fichiers par page
  const FILES_PER_PAGE = 4;

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(uploadedFiles.length / FILES_PER_PAGE);

  // Extraire les fichiers à afficher pour la page courante
  const displayedFiles = uploadedFiles.slice(
	currentPage * FILES_PER_PAGE,
	(currentPage + 1) * FILES_PER_PAGE
  );

  // Gérer le changement de page
  const handlePageChange = (pageNumber) => {
	setCurrentPage(pageNumber);
  };

  useEffect(() => {
	// Données simulées pour le développement
	const mockFiles = [
	  {
		id: 1,
		name: 'rapport_patient_1.pdf',
		size: 2048576,
		uploadDate: '2024-05-03T10:30:00'
	  },
	  {
		id: 2,
		name: 'donnees_eeg.csv',
		size: 1024000,
		uploadDate: '2024-05-03T09:15:00'
	  },
	  {
		id: 3,
		name: 'evaluation_cognitive.docx',
		size: 500000,
		uploadDate: '2024-05-02T14:20:00'
	  },
	  {
		id: 4,
		name: 'test_neurologique.pdf',
		size: 3000000,
		uploadDate: '2024-05-01T11:45:00'
	  },
	  {
		id: 5,
		name: 'analyse_irm.dcm',
		size: 5000000,
		uploadDate: '2024-04-30T16:00:00'
	  },
	  {
		id: 6,
		name: 'rapport_eeg.pdf',
		size: 1500000,
		uploadDate: '2024-04-29T13:30:00'
	  },
	  {
		id: 7,
		name: 'questionnaire_patient.pdf',
		size: 800000,
		uploadDate: '2024-04-28T09:20:00'
	  }
	];

	setTimeout(() => {
	  setUploadedFiles(mockFiles);
	  setLoading(false);
	}, 1000);
  }, []);

  const deleteFile = async (fileId) => {
	setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
	// Ajuster la page si nécessaire après suppression
	if (displayedFiles.length === 1 && currentPage > 0) {
	  setCurrentPage(currentPage - 1);
	}
  };

  const downloadFile = async (fileId, fileName) => {
	try {
	  const response = await fetch(`/api/files/${fileId}/download`, {
		headers: {
		  'Authorization': `Bearer ${localStorage.getItem('userToken')}`
		}
	  });

	  if (response.ok) {
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	  } else {
		throw new Error('Erreur lors du téléchargement');
	  }
	} catch (err) {
	  setError(err.message);
	}
  };

  const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
	  day: '2-digit',
	  month: '2-digit',
	  year: 'numeric',
	  hour: '2-digit',
	  minute: '2-digit'
	});
  };

  const formatFileSize = (bytes) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
	return <div className="dashboard-container">Chargement...</div>;
  }

  return (
	<div className="dashboard-container">
	  <h1>Tableau de bord</h1>
	  <p className="dashboard-subtitle">Gérez vos fichiers importés</p>

	  {error && <div className="error-message">{error}</div>}

	  {uploadedFiles.length === 0 ? (
		<div className="no-files">
		  <p>Aucun fichier importé pour le moment.</p>
		  <p>Commencez par importer vos fichiers depuis la page d'importation.</p>
		</div>
	  ) : (
		<div className="files-section">
		  <div className="files-table-container">
			<table className="files-table">
			  <thead>
				<tr>
				  <th>Nom du fichier</th>
				  <th>Taille</th>
				  <th>Date d'importation</th>
				  <th>Actions</th>
				</tr>
			  </thead>
			  <tbody>
				{displayedFiles.map((file) => (
				  <tr key={file.id}>
					<td>{file.name}</td>
					<td>{formatFileSize(file.size)}</td>
					<td>{formatDate(file.uploadDate)}</td>
					<td>
					  <button
						className="action-button download"
						onClick={() => downloadFile(file.id, file.name)}
					  >
						Télécharger
					  </button>
					  <button
						className="action-button delete"
						onClick={() => deleteFile(file.id)}
					  >
						Supprimer
					  </button>
					</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  </div>

		  {/* Pagination avec des ronds si plus de 5 fichiers */}
		  {totalPages > 1 && (
			<div className="pagination">
			  {Array.from({ length: totalPages }, (_, i) => (
				<button
				  key={i}
				  className={`page-dot ${currentPage === i ? 'active' : ''}`}
				  onClick={() => handlePageChange(i)}
				  aria-label={`Page ${i + 1}`}
				/>
			  ))}
			</div>
		  )}

		  <div className="dashboard-stats">
			<div className="stat-card">
			  <h3>Total de fichiers</h3>
			  <p className="stat-value">{uploadedFiles.length}</p>
			</div>
			<div className="stat-card">
			  <h3>Fichiers affichés</h3>
			  <p className="stat-value">{displayedFiles.length} / {FILES_PER_PAGE}</p>
			</div>
			<div className="stat-card">
			  <h3>Espace utilisé</h3>
			  <p className="stat-value">
				{formatFileSize(uploadedFiles.reduce((total, file) => total + file.size, 0))}
			  </p>
			</div>
		  </div>
		</div>
	  )}
	</div>
  );
}

export default Dashboard;