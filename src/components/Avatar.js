import React from 'react'
import '../styles/Avatar.css'

function Avatar({message}){
	return(<div className='avatar-container'>
		<div className='avatar'>
			<img src={require('../assets/avatar.png')} alt="Niels assistant" />
		</div>
		<div className='speech-bubble'>
			<p>{message}</p>
		</div>
	</div>)
}

export default Avatar