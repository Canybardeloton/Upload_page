import React from 'react'
import '../styles/Avatar.css'

function Avatar({message, messageSecondary, isBottomLeft=false}){
	if (isBottomLeft){
		return (<div className='avatar-bottomleft'>
			<img src={require('../assets/avatar.png')} alt="Niels assistant" />
		</div>)
	}
	return(<div className='avatar-container'>
		<div className='speech-bubble'>
			{/* Si message est un objet avec firstPart et secondPart, on les affiche séparément */}
			{message && typeof message === 'object' && message.firstPart && message.secondPart ? (
				<>
					<p className="primary-message">{message.firstPart}</p>
					<p className="secondary-message">{message.secondPart}</p>
				</>
			) : (
				/* Sinon, on affiche message comme avant */
				<p>{message}</p>
			)}
			{/* Support pour messageSecondary pour la rétrocompatibilité */}
			{messageSecondary && <p className="secondary-message">{messageSecondary}</p>}
		</div>
	</div>)
}

export default Avatar