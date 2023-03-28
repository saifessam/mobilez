import { Link } from 'react-router-dom';
import DeviceType from '../../../types/device';
import currencyFormat from '../../../utilities/currency-format';
import './style.css';

interface Props {
	data: DeviceType;
}

function DeviceCard(props: Props) {
	return (
		<div className='device-card'>
			<Link to={`/devices/${props.data._id}`} className="device-card-image">
				<img src={require(`C:/Users/saife/Projects/mobilez/server/src/uploads/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</Link>
			<div className="device-card-details">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
				<span>{currencyFormat(props.data.price!)}</span>
			</div>
		</div>
	);
}

export default DeviceCard;