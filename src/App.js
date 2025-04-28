import './styles/Reset.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Banner from "./components/Banner"
import HandleFiles from "./pages/ImportFiles"
import Body from "./components/Body"
import Connection from './components/Connection'
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
			<Banner />
			<Body />
			<Routes>
			  {isAuthenticated ? (
				<>
					<Route path="/import" element={<HandleFiles />} />
					<Route path="*" element={<Navigate to="/import" replace />} />
				</>
			  ) : (
				<>
				  <Route path="/" element={<Connection onLogin={handleLogin} />} />
				  <Route path="*" element={<Navigate to="/" replace />} />
				</>
			  )}
			</Routes>
		  </div>
		</BrowserRouter>
	);
}

export default App