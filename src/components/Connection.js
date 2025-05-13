import React, {useState, useEffect} from 'react'
import '../styles/Connection.css'
import { useNavigate } from 'react-router-dom';

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
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) =>{
		e.preventDefault();
		setError('');
		setLoading(true);
		
		try {
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			
			const data = await response.json();
			
			if (!response.ok) {
				throw new Error(data.message || 'Erreur de connexion');
			}
			
			// Stocker le token et les infos utilisateur
			localStorage.setItem('userToken', data.token);
			localStorage.setItem('userData', JSON.stringify(data.user));
			
			// Rediriger vers la page d'importation
			navigate('/import');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleLogin} className="auth-form">
			{error && <div className="error-message">{error}</div>}
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
			<button 
				type="submit" 
				className="auth-button primary-button" 
				disabled={loading}
			>
				{loading ? 'Connexion en cours...' : 'Se connecter'}
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
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');
	
	const handleSignup = async (e) => {
	  e.preventDefault();
	  setError('');
	  setSuccess('');
	  setLoading(true);
	  
	  // Vérifier que les mots de passe correspondent
	  if (password !== confirmPassword) {
		setError("Les mots de passe ne correspondent pas");
		setLoading(false);
		return;
	  }
	  
	  try {
		const response = await fetch('http://localhost:5000/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				full_name: fullName,
				email,
				username,
				password
			}),
		});
		
		const data = await response.json();
		
		if (!response.ok) {
			throw new Error(data.message || 'Erreur lors de la création du compte');
		}
		
		setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
		
		// Réinitialiser le formulaire
		setFullName('');
		setEmail('');
		setUsername('');
		setPassword('');
		setConfirmPassword('');
	  } catch (error) {
		setError(error.message);
	  } finally {
		setLoading(false);
	  }
	};

	return (
		<form onSubmit={handleSignup} className="auth-form">
			{error && <div className="error-message">{error}</div>}
			{success && <div className="success-message">{success}</div>}
			
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

			<button 
				type="submit" 
				className="auth-button primary-button"
				disabled={loading}
			>
				{loading ? 'Création en cours...' : 'Créer un compte'}
			</button>
		</form>
	);
}

export default Connection