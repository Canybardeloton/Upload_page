function Footer(){
	return (<div>
		<About />
		<Questionnaire />
	</div>)
}

function About(){
	const link = "www.tryniels.com"
	return (<div className="niels-about">
		<a href={link}>About</a>
	</div>)
}

function Questionnaire(){
	const link = ""
	return (<div className="niels-questionnaire">
		<a href={link}>Questionnaire</a>
	</div>)
}