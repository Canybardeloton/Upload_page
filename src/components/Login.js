import React, {useState} from 'react'

function Login(){
	return (<div>
		<Description />
		<FillUsername />
		<FillPassword />
		<LogInButton />
		<SignUpButton />
	</div>)
}

function Description(){
	const description = "Merci de vous connecter afin de pouvoir importer vos fichiers. Si vous vous connecter pour la premiere fois, merci de creer un compte."
	return (<p className="niels-description">{description}</p>)
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
	const content = "Creer un compte"
	return (<div className='niels-signup-button'>
		<button href="">{content}</button>
	</div>)
}

export default Login