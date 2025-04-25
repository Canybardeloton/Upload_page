import React from 'react'
import '../styles/Avatar.css'

function Avatar({message, isBottomLeft=false}){
	if (isBottomLeft){
		return (<div className='avatar-bottomleft'>
			<img src={require('../assets/avatar.png')} alt="Niels assistant" />
		</div>)
	}
	return(<div className='avatar-container'>
		<div className='speech-bubble'>
			<p>{message}</p>
		</div>
	</div>)
}

export default Avatar