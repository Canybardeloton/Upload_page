import "../styles/Banner.css"
import {array} from "../datas/menus"

function Banner(){
	return (<div className="niels-banner">
		<div className="niels-menu">
		{array.map((item, index) => (
			<Menu key={index} link={item.link} title={item.title}/>
		))}
		</div>
		<Slogan />
	</div>)
}

function Menu(props){
	const {link, title} = props
	return <a href={link}>{title}</a>
}

function Slogan(){
	const slogan = "Niels - l'IA au service des neuropsychologues"
	return (<a className="niels-slogan" href="www.tryniels.com">{slogan}</a>)
}

export default Banner