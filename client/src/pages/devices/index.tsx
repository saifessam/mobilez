import { useState, useEffect } from 'react';
import Card from '../../components/card';
import Loading from '../../components/loading';
import DeviceData from '../../types/device-data';
import Section from "./../../components/section";

function DevicesPage() {
	const [devices, setDevices] = useState<DeviceData[]>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getDevices();
	}, []);

	async function getDevices(): Promise<void> {
		setLoading(true);
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/devices", options);
			await response.json().then((data) => setDevices(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	if (loading) return <Loading message="Loading..." />;

	return (
		<Section alignment="grid">
			{devices ? devices.map((device) => <Card data={device} key={device._id} />) : undefined}
		</Section>
	);
}

export default DevicesPage;