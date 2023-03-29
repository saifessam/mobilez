import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
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

	async function addToCart(): Promise<void> {
		setLabel((prev) => ({ ...prev, response: "Loading" }));
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response: Message = await (await fetch("/orders/create", options)).json();
			setLabel(response);
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setTimeout(() => setLabel({ succeed: null, response: "Add to cart" }), 2000);
		}
	}

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
			<Button type="button" condition={label.succeed === null ? 'primary' : label.succeed ? 'success' : 'fail'} label={label.response!} disabled={props.data.stock === 0} action={!authToken ? () => navigate('/profile', { replace: true }) : addToCart} />
		</div>
	);
}

export default Info;