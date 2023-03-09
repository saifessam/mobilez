import { useState } from 'react';
import Button from '../button';
import Icons from './../../data/icons';
import currencyFormat from '../../utilities/currency-format';
import DeviceData from '../../types/device-data';
import './style.css';

interface Props {
	data: DeviceData;
	setter?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card(props: Props) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	if (isExpanded) return <CardDialog data={props.data} setter={setIsExpanded} />;

	return (
		<div className='card'>
			<div className="card-image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</div>
			<div className="card-details">
				<div className="card-details-text">
					<span>{props.data.color} {props.data.brand} {props.data.model}</span>
					<span>{props.data.ram} RAM - {props.data.rom} ROM</span>
					<span>{currencyFormat(props.data.price!)}</span>
				</div>
				<div className="card-details-actions">
					<Button type="button" label={props.data.stock === 0 ? 'Out of stock' : 'Add to cart'} icon={props.data.stock !== 0 && <Icons.CartIcon />} primary small disabled={props.data.stock === 0} />
					<Button type="button" icon={<Icons.MaximizeIcon />} action={() => setIsExpanded(true)} secondary small />
				</div>
			</div>
		</div>
	);
}

function CardDialog(props: Props) {
	return (
		<div className='card-dialog'>
			<div className="card-image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</div>
			<div className="card-details">
				<div className="card-details-text">
					<span>{props.data.color} {props.data.brand} {props.data.model}</span>
					<span>{currencyFormat(props.data.price!)}</span>
				</div>
				<div className="card-details-extras">
					<span>{props.data.ram} RAM</span>
					<span>{props.data.rom} ROM</span>
					<span style={{ color: props.data.stock! === 0 ? "#d90429" : "#0ead69" }}>{props.data.stock === 0 ? "Out of stock" : "Available"}</span>
					<span style={{ color: props.data.condition! === "Used" ? "#ffffff" : "#0ead69" }}>{props.data.condition}</span>
				</div>
				<div className="card-details-actions">
					<Button type="button" label={props.data.stock === 0 ? 'Out of stock' : 'Add to cart'} icon={props.data.stock !== 0 && <Icons.CartIcon />} primary small disabled={props.data.stock === 0} />
					<Button type="button" label='Close' icon={<Icons.CloseIcon />} action={() => props.setter!(false)} secondary small />
				</div>
			</div>
		</div>
	);
}

export default Card;