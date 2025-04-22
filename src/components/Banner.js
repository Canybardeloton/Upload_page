import logo from "../assets/logo.png"
import "../styles/Banner.css"
import {array} from "../datas/menus"
import React, {useState, useEffect, useCallback} from 'react'

function Banner(){
	return (<div className="niels-banner">
		<Menu />
		<Slogan />
	</div>)
}

function Menu(){
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev)
	}, []);

	useEffect(() => {
		const handleEsc = (event) =>{
			if (event.key === 'Escape') {
				toggleOpen()
			}
		}
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		}
	}, [toggleOpen]);

	return (
		<div className="niels-menu">
			<button className="niels-button-menu" onClick={toggleOpen} useEffect>
				<img src={logo} alt="Menu" className="niels-logo" />
				<div className="niels-menu-line"></div>
				<div className="niels-menu-line"></div>
				<div className="niels-menu-line"></div>
			</button>
			{isOpen && (
			<div className="niels-menu-options">
				<ul>
					{array.map((option, index) => (
						<li key={option.name}> <a href={option.link}>{option.name}</a></li>
					))}
				</ul>
			</div>
			)}
		</div>
	)
}

function Slogan(){
	const slogan = "Niels - l'IA au service des neuropsychologues"
	return (<h2 className="niels-slogan">{slogan}</h2>)
}

export default Banner