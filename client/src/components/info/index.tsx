import { useEffect, useState } from 'react';
import useAuthToken from '../../hooks/useAuthToken';
import DeviceData from '../../types/device-data';
import Message from '../../types/message';
import OrderType from '../../types/order-data';
import currencyFormat from '../../utilities/currency-format';
import Button from '../button';
import NumberInput from '../inputs/number';
import { ReactComponent as CartIcon } from './../../assets/svgs/icons/cart.svg';
import './style.css';

interface Props {
	data: DeviceData;
}

function Info(props: Props) {
	const authToken = useAuthToken();
	const [orderData, setOrderData] = useState<OrderType>({ receiver: undefined, items: [{ device: props.data._id, quantity: 1 }], status: "SAVED" });
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });

	useEffect(() => {
		if (authToken) setOrderData((prev) => ({ ...prev, receiver: authToken.id }));
	}, [authToken]);

	async function addtoCart(): Promise<void> {
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/orders/create", options);
			await response.json().then((data: Message) => alert(data.response));
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return (
		<div className='info'>
			<div className="info-image">
				<img src={require(`./../../assets/images/${props.data.image}`)} alt={props.data.brand} loading="lazy" />
			</div>
			<div className="info-details">
				<div className="header">
					<span>{props.data.color} {props.data.brand} {props.data.model}</span>
					<span>{currencyFormat(props.data.price)}</span>
				</div>
				<div className="body">
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
					<div className="set">
						<span>Stock</span>
						<span style={{ color: props.data.stock === 0 ? "#d90429" : "#0ead69" }}>{props.data.stock === 0 ? "Out of stock" : "Available"}</span>
					</div>
				</div>
				<div className="footer">
					<NumberInput label="Quantity" name="quantity" setter={setOrderData} />
					<Button type="button" label={'Add to cart'} icon={<CartIcon />} disabled={props.data.stock === 0} action={addtoCart} primary small />
				</div>
			</div>
		</div>
	);
}

export default Info;