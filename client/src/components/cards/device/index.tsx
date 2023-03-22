import { useEffect, useState } from 'react';
import useAuthToken from '../../../hooks/useAuthToken';
import DeviceType from '../../../types/device';
import Message from '../../../types/message';
import OrderType from '../../../types/order';
import currencyFormat from '../../../utilities/currency-format';
import Button from '../../button';
import './style.css';

interface Props {
	data: DeviceType;
}

function DeviceCard(props: Props) {
	const authToken = useAuthToken();
	const [orderData, setOrderData] = useState<OrderType>({ receiver: "", items: [{ device: props.data._id!, quantity: 1 }], status: "SAVED" });
	const [label, setLabel] = useState<Message>({ succeed: null, response: "Add to cart" });

	useEffect(() => {
		if (authToken) setOrderData((prev) => ({ ...prev, receiver: authToken.id }));
	}, [authToken]);

	async function addToCart(): Promise<void> {
		setLabel((prev) => ({ ...prev, response: "Loading" }));
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/orders/create", options);
			await response.json().then((data: Message) => setLabel(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setTimeout(() => setLabel({ succeed: null, response: "Add to cart" }), 2000);
	}

	return (
		<div className='device-card'>
			<div className="device-card-image">
				<img src={require(`./../../../assets/images/${props.data.image}`)} alt={props.data.brand!} loading="lazy" />
			</div>
			<div className="device-card-details">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
				<span>{props.data.ram} RAM - {props.data.rom} ROM</span>
				<span>{currencyFormat(props.data.price!)}</span>
			</div>
			<Button type="button" condition={label.succeed === null ? 'primary' : label.succeed ? 'success' : 'fail'} label={label.response!} disabled={props.data.stock === 0} action={addToCart} />
		</div>
	);
}

export default DeviceCard;