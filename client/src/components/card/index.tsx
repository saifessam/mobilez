import { useState } from 'react';
import Button from '../button';
import Icons from './../../data/icons';
import currencyFormat from '../../utilities/currencyFormat';
import './style.css';

interface Props {
	data?: any;
}

function Card(props: Props) {
	const [isFavorite, setIsFavorite] = useState(false);
	const imagePath: string = `${props.data.type}/${props.data.brand}/${props.data.color}/${props.data.image}`;

	return (
		<div className='card'>
			<div className="card-image">
				<img src={require(`./../../assets/images/devices/${imagePath.toLowerCase()}`)} alt={props.data.name} loading="lazy" />
			</div>
			<div className="card-details">
				<div className="card-details-text">
					<span>{props.data.color} {props.data.brand} {props.data.model}</span>
					<span>{props.data.ram}GB RAM - {props.data.rom}GB ROM</span>
					<span>{currencyFormat(props.data.price)}</span>
				</div>
				<div className="card-details-actions">
					<Button type="button" label={props.data.stock === 0 ? 'Out of stock' : 'Add to cart'} icon={props.data.stock !== 0 && <Icons.CartIcon />} primary small disabled={props.data.stock === 0} />
					<Button type="button" icon={isFavorite ? <Icons.HeartFilledIcon /> : <Icons.HeartIcon />} action={() => setIsFavorite((prev) => !prev)} secondary small />
				</div>
			</div>
		</div>
	);
}

export default Card;