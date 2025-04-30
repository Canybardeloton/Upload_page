import './styles/Reset.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HandleFiles from "./pages/ImportFiles"
import Login from './pages/Login'

import { useState, useEffect } from 'react';


function App(){
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
	  const token = localStorage.getItem('userToken');
	  if (token) {
		setIsAuthenticated(true);
	  }
	}, []);

	const handleLogin = () => {
	  setIsAuthenticated(true);
	};
	return (
		<BrowserRouter>
		  <div className="App">
			<Routes>
				<>
					<Route path="/" element={<Login onLogin={handleLogin} />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</>
				<>
				  <Route path="/import" element={<HandleFiles />} />
				  <Route path="*" element={<Navigate to="/import" replace />} />
				</>
			</Routes>
		  </div>
		</BrowserRouter>
	);
}

export default App