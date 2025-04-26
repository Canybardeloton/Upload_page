import React, {useState, useEffect} from 'react'
import '../styles/Connection.css'

function Connection(){
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
			<Authentication isMobile={isMobile} />
		</div>
	);
}

function Authentication({isMobile}){
	const [activeTab, setActiveTab] = useState("login");

	return(
		<div className='auth-container'>
			<div className='auth-tabs'>
				<button className={` auth-tab ${activeTab === 'login' ? 'active' : ''}`}
				onClick={() => setActiveTab('login')}>
					Connexion
				</button>
				<button className={` auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
				onClick={() => setActiveTab('signup')}>
					Créer un compte
				</button>
			</div>
			<div className={`auth-content ${activeTab === 'login' ? 'login-active' : 'signup-active'}`}>
				{activeTab === 'login' ? <LoginForm /> : <SignupForm />}
			</div>
		</div>
	)
}

function LoginForm(){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) =>{
		e.preventDefault();
		console.log('Tentative de connexion avec:', username);
	};

	return (
		<form onSubmit={handleLogin} className="auth-form">
			<div className='form-group'>
				<label htmlFor="login-username">Identifiant</label>
				<input
					id="login-username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Votre identifiant"
					required
				/>
			</div>
			<div className='form-group'>
				<label htmlFor="login-password">Mot de passe</label>
				<input
					id="login-password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Votre mot de passe"
					required
				/>
			</div>
			<button type="submit" className="auth-button primary-button">
				Se connecter
			</button>
		</form>
	)
}

function SignupForm() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSignup = (e) => {
	  e.preventDefault();
	  if (password !== confirmPassword) {
		alert("Les mots de passe ne correspondent pas");
		return;
	  }
	  console.log('Tentative de création de compte pour:', email);
	  // Ajouter la logique d'inscription ici
	};

	return (
		<form onSubmit={handleSignup} className="auth-form">
			<div className='form-group'>
				<label htmlFor="signup-fullname">Nom complet</label>
				<input
					id="signup-fullname"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					placeholder="Votre nom complet"
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="signup-email">Email</label>
				<input
					id="signup-email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Votre adresse email"
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="signup-username">Identifiant</label>
				<input
					id="signup-username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Choisissez un identifiant"
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="signup-password">Mot de passe</label>
				<input
					id="signup-password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Choisissez un mot de passe"
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor="signup-confirm-password">Confirmez le mot de passe</label>
				<input
					id="signup-confirm-password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirmez votre mot de passe"
					required
				/>
			</div>

			<button type="submit" className="auth-button primary-button">
				Créer un compte
			</button>
		</form>
	);
}

export default Connection