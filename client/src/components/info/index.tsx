import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../../hooks/auth-token';
import addToCart from '../../services/add-to-cart';
import DeviceType from '../../types/device';
import Message from '../../types/message';
import OrderType from '../../types/order';
import currencyFormat from '../../utilities/currency-format';
import Button from '../button';
import './style.css';

interface Props {
	data: DeviceType;
}

function Info(props: Props) {
	const authToken = useAuthToken();
	const [orderData, setOrderData] = useState<OrderType>({ receiver: "", items: [{ device: props.data._id!, quantity: 1, price: props.data.price }], status: "SAVED" });
	const [label, setLabel] = useState<Message>({ succeed: null, response: props.data.stock === 0 ? "Out of stock" : "Add to cart" });
	const navigate = useNavigate();

	useEffect(() => {
		if (authToken) setOrderData((prev) => ({ ...prev, receiver: authToken.id }));
	}, [authToken]);

	return (
		<div className='info'>
			<div className="title">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
			</div>
			<div className="image">
				<img src={`http://localhost:4000/uploads/${props.data.image}`} alt={props.data.brand} loading="lazy" />
			</div>
			<div className="sets">
				<div className="set">
					<span>Pice</span>
					<span>{currencyFormat(props.data.price)}</span>
				</div>
				<div className="set">
					<span>RAM</span>
					<span>{props.data.ram}</span>
				</div>
				<div className="set">
					<span>ROM</span>
					<span>{props.data.rom}</span>
				</div>
				<div className="set">
					<span>Condition</span>
					<span>{props.data.condition}</span>
				</div>
			</div>
			<Button type="button" condition={label.succeed === null ? 'primary' : label.succeed ? 'success' : 'fail'} label={label.response!} disabled={props.data.stock === 0} action={() => !authToken ? navigate('/profile', { replace: true }) : addToCart({ setLabel, orderData })} />
		</div>
	);
}

export default Info;