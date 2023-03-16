import { useEffect, useState } from 'react';
import DeviceCard from '../../../components/cards/device';
import Loading from '../../../components/loading';
import Section from "../../../components/section";
import DeviceData from '../../../types/device-data';

function DevicesPage() {
	const [devices, setDevices] = useState<DeviceData[]>();

	useEffect(() => {
		async function getDevices(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch("/devices", options);
				await response.json().then((data) => setDevices(data));
			} catch (error) {
				console.error("Request error", error);
			}
		}

		getDevices();
	}, []);


	if (devices?.length === 0) {
		return <Loading message="Loading..." />;
	} else {
		return (
			<Section alignment="grid">
				{devices ? devices.map((device) => <DeviceCard data={device} key={device._id} />) : undefined}
			</Section>
		);
	}

}

export default DevicesPage;