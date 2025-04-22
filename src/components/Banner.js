import logo from "../assets/logo.png"
import "../styles/Banner.css"

function Banner(){
	return (<div>
		<Menu />
		<Slogan />
	</div>)
}

function Menu(){
	const array = [
		"About",
		"Questionnaire"
	]
	return (
		<div className="niels-menu">
			<img src={logo} alt="Menu" className="niels-logo" />
			<ul>
				{array.map((option) => (
					<li classname="niels-option">{option}</li>
				))}
			</ul>
		</div>)
}

function Slogan(){
	const slogan = "Niels - l'IA au service des neuropsychologues"
	return (<div className="niels-slogan">
			{slogan}
			</div>)
}

export default Banner