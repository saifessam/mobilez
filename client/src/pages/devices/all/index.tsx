import { useEffect, useState } from 'react';
import DeviceCard from '../../../components/cards/device';
import Loading from '../../../components/loading';
import Section from "../../../components/section";
import DeviceType from '../../../types/device';

function DevicesPage() {
	const [devices, setDevices] = useState<DeviceType[]>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getDevices(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response: DeviceType[] = await (await fetch("/devices", options)).json();
				setDevices(response);
			} catch (error) {
				console.error("Request error", error);
			}
		}

		getDevices();

		return () => controller.abort();
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