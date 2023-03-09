import { useEffect, useState } from 'react';
import useAuthToken from '../../hooks/useAuthToken';
import DeviceData from '../../types/device-data';
import Message from '../../types/message';
import OrderType from '../../types/order-data';
import currencyFormat from '../../utilities/currency-format';
import Button from '../button';
import './style.css';

interface Props {
	data: DeviceData;
}

function Info(props: Props) {
	const authToken = useAuthToken();
	const [orderData, setOrderData] = useState<OrderType>({ receiver: undefined, items: [{ device: props.data._id, quantity: 1 }], status: "SAVED" });
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });


	useEffect(() => {
		if (authToken) setOrderData((prev) => ({ ...prev, receiver: authToken.id }));
	}, [authToken]);

	async function addtoCart(): Promise<void> {
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/orders/create", options);
			await response.json().then((data: Message) => setMessage(data));
		} catch (error) {
			console.error("Request error", error);
		}
		window.scrollTo(0, 0);
		setLoading(false);
	}

	return (
		<div className='info'>
			{message.succeed !== null && message.response !== null ? <span className={message.succeed ? "success" : "fail"}>{message.response}</span> : undefined}
			<div className="image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.brand} loading="lazy" />
			</div>
			<div className="title">
				<span>{props.data.color} {props.data.brand} {props.data.model}</span>
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
			<Button type="button" label={loading ? 'Loading' : 'Add to cart'} disabled={props.data.stock === 0} action={addtoCart} primary />
		</div>
	);
}

export default Info;