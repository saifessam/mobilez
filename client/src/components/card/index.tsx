import { Link } from 'react-router-dom';
import currencyFormat from '../../utilities/currency-format';
import DeviceData from '../../types/device-data';
import './style.css';

interface Props {
	data: DeviceData;
}

function Card(props: Props) {
	return (
		<div className='card'>
			<Link to={`/devices/${props.data._id}`} className="card-image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</Link>
			<div className="card-details">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
				<span>{props.data.ram} RAM - {props.data.rom} ROM</span>
				<span>{currencyFormat(props.data.price!)}</span>
			</div>
		</div>
	);
}

export default Card;