import React, {useState, useRef} from "react"
import "../styles/FileUpload.css"

function UploadFiles(){
	const [files, setFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [uploadStatus, setUploadStatus] = useState('');
	const fileInputRef = useRef(null);

	const handleFiles = (fileList) => {
		const newFiles = Array.from(fileList);
		setFiles(prev => [...prev, ...newFiles]);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
			e.dataTransfer.clearData();
		}
	};

	// Gestion du clic sur le bouton
	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	// Gestion de la sélection de fichiers via l'input
	const handleFileInputChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			handleFiles(e.target.files);
		}
	};

	const handleUpload = async () => {
		if (files.length === 0) {
			setUploadStatus('Aucun fichier à envoyer.');
			return;
		}

		setUploadStatus('Chargement en cours...');

		const formData = new FormData();
		files.forEach(file => {
			formData.append('files', file);
		});

		try {
			// Remplacez par votre endpoint API
			const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

			if (response.ok) {
				setUploadStatus('Fichiers importés avec succès!');
				setFiles([]);
			} else {
				setUploadStatus('Erreur lors de l\'importation.');
			}
		} catch (error) {
			setUploadStatus('Erreur de connexion au serveur.');
			console.error(error);
		}
	}

	const removeFile = (index) => {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	};

	const instructions = "Pour charger vos fichiers, drag and drop dans la zone ou bien appuyer sur le bouton central."
	return (<div className="upload-container">
		<div className="upload-instructions">
			<p>{instructions}</p>
		</div>
		<div
			className={`drop-area ${isDragging ? 'active' : ''}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleButtonClick}
		>
			<p>Glissez et déposez vos fichiers ici</p>
			<p>ou</p>
			<button type="button" className="select-button">
				Sélectionner des fichiers
			</button>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileInputChange}
				multiple
				style={{ display: 'none' }}
				/>
				</div>

				{files.length > 0 && (
				  <div className="file-list">
					<h3>Fichiers sélectionnés:</h3>
					<ul>
					  {files.map((file, index) => (
						<li key={index}>
						  {file.name} - {(file.size / 1024).toFixed(2)} KB
						  <button
							type="button"
							className="remove-button"
							onClick={() => removeFile(index)}
						  >
							×
						  </button>
						</li>
					  ))}
					</ul>
					<button
					  type="button"
					  className="upload-button"
					  onClick={handleUpload}
					>
					  Envoyer les fichiers
					</button>
				  </div>
				)}
				{uploadStatus && <p className="status-message">{uploadStatus}</p>}
			  </div>
			);
}

export default UploadFiles
