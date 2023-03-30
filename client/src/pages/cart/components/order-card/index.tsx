import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthToken from "../../../../hooks/useAuthToken";
import getDevice from "../../../../services/get-device";
import DeviceType from "../../../../types/device";
import Message from "../../../../types/message";
import currencyFormat from "../../../../utilities/currency-format";
import Button from "../../../../components/button";
import './style.css';

interface Props {
	id: string;
	quntity: number;
	price: number;
}

function OrderCard(props: Props) {
	const [device, setDevice] = useState<DeviceType>();
	const [removing, setRemoving] = useState<boolean>(false);
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		getDevice({ id: props.id, setDevice });
		return () => controller.abort();
	}, [props.id]);

	async function removeDevice(): Promise<void> {
		setRemoving(true);
		setTimeout(async () => {
			try {
				const options: RequestInit = { method: "DELETE", headers: { "Content-Type": "application/json" }, body: new Blob([JSON.stringify({ id: props.id, receiver: authToken?.id })]), cache: "default", credentials: "include" };
				const response = await fetch("/orders/remove", options);
				await response.json().then((data: Message) => {
					if (data.succeed) window.location.reload();
				});
			} catch (error) {
				console.error("Request error", error);
			}
		}, 300);
	}

	if (!device) {
		return <div className="order-card">Loading...</div>;
	} else {
		return (
			<div className={removing ? "order-card fade-out" : "order-card"}>
				<Link to={`/devices/${device._id}`} className="order-card-image">
					<img src={`http://localhost:4000/uploads/${device.image}`} alt={device.brand!} loading="lazy" />
				</Link>
				<div className="order-card-details">
					<span>{device.color} {device.brand} {device.model}</span>
					<span>{device.ram} RAM - {device.rom} ROM</span>
					<span>{currencyFormat(props.price)}</span>
					<span>Quntity: {props.quntity}</span>
				</div>
				<div className="order-card-actions">
					<Button type="button" condition="fail" label="Remove" action={removeDevice} />
				</div>
			</div>
		);
	}
}

export default OrderCard;