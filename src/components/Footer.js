import {array} from "../datas/menus"

function Footer(){
	return (<div>
		<About link={array[0].link} />
		<Questionnaire link={array[1].link} />
	</div>)
}

function About(props){
	const link = props.link
	return (<div className="niels-about">
		<a href={link}>About</a>
	</div>)
}

function Questionnaire(props){
	const link = props.link
	return (<div className="niels-questionnaire">
		<a href={link}>Questionnaire</a>
	</div>)
}

export default Footer