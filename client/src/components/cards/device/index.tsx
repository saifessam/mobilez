import { Link } from 'react-router-dom';
import DeviceData from '../../../types/device-data';
import currencyFormat from '../../../utilities/currency-format';
import './style.css';

interface Props {
	data: DeviceData;
}

function DeviceCard(props: Props) {
	return (
		<div className='device-card'>
			<Link to={`/devices/${props.data._id}`} className="device-card-image">
				<img src={require(`./../../../assets/images/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</Link>
			<div className="device-card-details">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
				<span>{props.data.ram} RAM - {props.data.rom} ROM</span>
				<span>{currencyFormat(props.data.price!)}</span>
			</div>
		</div>
	);
}

export default DeviceCard;