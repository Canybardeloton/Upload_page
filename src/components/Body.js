import "../styles/Body.css"
import "../styles/Avatar.css"
import Avatar from './Avatar'
import { description } from '../datas/instructions'

function Body(){
	return (
		<div className="niels-body">
			<Avatar isBottomLeft={true} />
			{description.map((item, index) => (
				<BubbleDisplay key={index} text={item.text}/>
			))}
		</div>
	)
}

const BubbleDisplay = (props) =>{
	const processMessage = (text) => {
		if (typeof text === 'string') {
			const dotIndex = text.indexOf('. ');
			if (dotIndex !== -1) {
				return {
					firstPart: text.substring(0, dotIndex + 1), // Inclure le point
					secondPart: text.substring(dotIndex + 2) // Commencer après le point et l'espace
				};
			}
		}
		return text; // Retourner tel quel si c'est déjà un objet ou si pas de point trouvé
	};
	return (<div>
		<Avatar message={processMessage(props.text)} />
	</div>)
}

export default Body