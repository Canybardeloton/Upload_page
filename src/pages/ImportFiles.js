import React, {useState, useEffect} from "react"
import "../styles/FileUpload.css"
import UploadFiles from "../components/FileUpload"
import Banner from "../components/Banner"


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
		<div>
			<Banner />
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
					Importer des fichiers
				</button>
				<button className={` file-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
				onClick={() => setActiveTab('dashboard')}>
					Tableau de bord
				</button>
			</div>
			<div className={`file-content ${activeTab === 'upload' ? 'upload-active' : 'dashboard-active'}`}>
				{activeTab === 'upload' ? <UploadFiles /> : ''}
			</div>
		</div>
	)
}


export default HandleFiles