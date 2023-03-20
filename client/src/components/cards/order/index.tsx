import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeviceData from "../../../types/device-data";
import currencyFormat from "../../../utilities/currency-format";
import './style.css';

interface Props {
	id: string | undefined;
	quntity: number | undefined;
}

function OrderCard(props: Props) {
	const [device, setDevice] = useState<DeviceData>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getOrder(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch(`/devices/${props.id}`, options);
				await response.json().then((data) => setDevice(data));
			} catch (error) {
				console.error("Request error", error);
			}
		}

		getOrder();

		return () => controller.abort();
	}, [props.id]);

	if (!device) {
		return <div className="order-card">Loading...</div>;
	} else {
		return (
			<div className="order-card">
				<Link to={`/devices/${device._id}`} className="order-card-image">
					<img src={require(`./../../../assets/images/${device.image}`)} alt={device.brand!} loading="lazy" />
				</Link>
				<div className="order-card-details">
					<span>{device.color} {device.brand} {device.model}</span>
					<span>{device.ram} RAM - {device.rom} ROM</span>
					<span>{currencyFormat(device.price!)}</span>
					<span>Quntity: {props.quntity}</span>
				</div>
			</div>
		);
	}
}

export default OrderCard;