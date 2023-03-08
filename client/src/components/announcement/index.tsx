import AnnouncementData from '../../types/announcements-data';
import './styles.css';

interface Props {
	data: AnnouncementData;
}

function Annoncement(props: Props) {
	return (
		<div className='annoncement'>
			<div className="annoncement-image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.title!} loading="lazy" />
			</div>
			<div className="annoncement-content">
				<span>{props.data.title}</span>
				<p>{props.data.content}</p>
			</div>
		</div>
	);
}

export default Annoncement;