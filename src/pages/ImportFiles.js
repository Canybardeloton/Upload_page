import React, {useState, useEffect} from "react"
import "../styles/ImportFiles.css"
import UploadFiles from "../components/FileUpload"


//Composant à avoir : 2 onglets de tableau de bord et d'import de fichiers

function HandleFiles(){
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='connection-container'>
			<MainBoard isMobile={isMobile} />
		</div>
	);
}

function MainBoard({isMobile}){
	const [activeTab, setActiveTab] = useState("upload");

	return(
		<div className='file-container'>
			<div className='file-tabs'>
				<button className={` file-tab ${activeTab === 'upload' ? 'active' : ''}`}
				onClick={() => setActiveTab('upload')}>
					Connexion
				</button>
				<button className={` file-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
				onClick={() => setActiveTab('dashboard')}>
					Créer un compte
				</button>
			</div>
			<div className={`file-content ${activeTab === 'upload' ? 'upload-active' : 'dashboard-active'}`}>
				{activeTab === 'login' ? <UploadFiles /> : <Dashboard />}
			</div>
		</div>
	)
}


export default HandleFiles