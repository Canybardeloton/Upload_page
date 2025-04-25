import React, {useState} from 'react'
import "../styles/Body.css"
import "../styles/Avatar.css"
import Avatar from './Avatar'
import { description } from '../datas/instructions'

function Body(){
	return (
		<div className="niels-body">
			<Avatar isBottomLeft={true} />
			{description.map((item, index) => (
				<BubbleDisplay key={index} text={item.text}/>
			))}
			<Connection />
		</div>
	)
}

const BubbleDisplay = (props) =>{
	const message = props.text
	return (<div>
		<Avatar message={message} />
	</div>)
}

function Connection(){
	return (<div className='connection-container'>
		<FillUsername />
		<FillPassword />
		<LogInButton />
		<SignUpButton />
	</div>)
}

function FillUsername(){
	const [value, setValue] = useState('');
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (<div className='niels-username'>
		<input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder='Identifiant'
		/>
	</div>)
}

function FillPassword(){
	const [value, setValue] = useState('');
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (<div className='niels-password'>
		<input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder='Mot de passe'
		/>
	</div>)
}

function LogInButton(){
	const content = "Se connecter"
	return (<div className='niels-login-button'>
		<button href="">{content}</button>
	</div>)
}

function SignUpButton(){
	const content = "Créer un compte"
	return (<div className='niels-signup-button'>
		<button href="">{content}</button>
	</div>)
}

export default Body