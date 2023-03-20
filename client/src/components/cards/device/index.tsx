import { useEffect, useState } from 'react';
import useAuthToken from '../../../hooks/useAuthToken';
import DeviceData from '../../../types/device-data';
import Message from '../../../types/message';
import OrderData from '../../../types/order-data';
import currencyFormat from '../../../utilities/currency-format';
import Button from '../../button';
import './style.css';

interface Props {
	data: DeviceData;
}

function DeviceCard(props: Props) {
	const authToken = useAuthToken();
	const [orderData, setOrderData] = useState<OrderData>({ receiver: "", items: [{ device: props.data._id!, quantity: 1 }], status: "SAVED" });
	const [label, setLabel] = useState<Message>({ succeed: null, response: "Add to cart" });

	useEffect(() => {
		if (authToken) setOrderData((prev) => ({ ...prev, receiver: authToken.id }));
	}, [authToken]);

	async function addtoCart(): Promise<void> {
		setLabel((prev) => ({ ...prev, response: "Loading" }));
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/orders/create", options);
			await response.json().then((data: Message) => setLabel(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setTimeout(() => setLabel((prev) => ({ ...prev, response: "Add to cart" })), 2000);
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
			<Button type="button" label={label.response!} disabled={props.data.stock === 0} action={addtoCart} primary small />
		</div>
	);
}

export default DeviceCard;