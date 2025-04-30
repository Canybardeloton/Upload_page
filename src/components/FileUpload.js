import React, {useState, useRef, useEffect} from "react"
import "../styles/FileUpload.css"

function UploadFiles(){
	const [files, setFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [uploadStatus, setUploadStatus] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const fileInputRef = useRef(null);

	const FILES_PER_PAGE = 3;
	const totalPages = Math.ceil(files.length / FILES_PER_PAGE);

	const handlePageChange = (page_number) =>{
		setCurrentPage(page_number);
	};

	const displayedFiles = files.slice(
		currentPage * FILES_PER_PAGE,
		(currentPage + 1) * FILES_PER_PAGE
	);

	useEffect(() => {
		if (files.length <= currentPage * FILES_PER_PAGE && currentPage > 0){
			setCurrentPage(Math.max(0, totalPages - 1));
		}
	},[files.length, currentPage, totalPages]);

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
					<h3>Fichiers sélectionnés: ({files.length})</h3>
					<ul>
					  {displayedFiles.map((file, index) => {
						const realIndex = index + currentPage * FILES_PER_PAGE;
						return (
						<li key={realIndex}>
						  {file.name} - {(file.size / 1024).toFixed(2)} KB
						  <button
							type="button"
							className="remove-button"
							onClick={() => removeFile(realIndex)}
						  >
							×
						  </button>
						</li>
						);
					  })}
					</ul>
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
